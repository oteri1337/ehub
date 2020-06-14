<?php

namespace Server\Library\Controllers;

use Server\Database\Models\Session;

class AuthController extends NewApiController
{
    protected $authKey;



    // Basic Auth

    public function signIn($request, $response)
    {

        $body = $request->getParsedBody();

        $email = $body['email'] ?? '';
        $password = $body['password'] ?? '';

        $rules = [
            'email' => [$email, 'required|email'],
            'password' => [$password, 'required']
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] =  $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $password = $this->encryptPassword($password);
        $row = $this->model->where('email', $email)->where('password', $password)->with($this->eagerRead)->first();

        if (!$row) {
            $this->data['errors'] =  ['invalid email or password'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        // $row = $this->relationships($row);

        $_SESSION[$this->authKey]['id'] = $row->id;

        $key = time();
        $expires = time() + 30 * 24 * 60 * 60;
        $key = sha1($key);
        Session::create(['key' => $key, 'value' => $row->id, 'expires' => $expires]);
        $this->data['cookie'] = $key;
        setcookie($this->authKey, $key, $expires, "/");

        $this->data['data'] = $row;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function status($request, $response)
    {
        //$hasSession = isset($_SESSION[$this->authKey]['id']);
        $cookie = $_COOKIE[$this->authKey] ?? false;

        if (!$cookie) {
            $this->data['data'] = false;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $session = Session::where("key", $cookie)->first();

        if (!$session) {
            $this->data['data'] = false;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $id = $session->value;

        $row = $this->model->where('id', $id)->with($this->eagerRead)->first();

        if (!$row) {
            $this->data['data'] = false;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }
        // $row = $this->relationships($row);

        $this->data['data'] = $row;

        $this->data['cookie'] = $_COOKIE[$this->authKey] ?? "";

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function signOut($request, $response)
    {

        $key = $_COOKIE[$this->authKey] ?? false;

        if ($key) {
            $session = Session::where('key', $key)->first();
            $session->delete();

            $expires = time() - 1;
            setcookie($this->authKey, $key, $expires, "/");
        }

        // expire cookie
        $this->data['cookie'] = "";

        unset($_SESSION[$this->authKey]);
        // session_destroy();

        // update csrf token in database

        $this->data['data'] = false;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function encryptPassword($password)
    {
        return sha1($password);
    }

    // Tokens 

    public function tokenForDeviceVerify($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute('user');

        $email = $body['email'] ?? '';
        $mobile_number = $body['mobile_number'] ?? '';

        if ($mobile_number != '') {

            $row = $this->model->where('mobile_number', $mobile_number)->where('id', '!=', $user->id)->exists();
            if ($row) {
                $this->data['errors'] = ['mobile number already in use'];
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }

            $rules = ['mobile number' => [$mobile_number, 'number']];
        } else {
            $rules = ['email' => [$email, 'email']];
        }

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();
        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }


        $pin = rand(11111, 99999);

        if ($mobile_number != '') {
            $user->update(['pin' => $pin, 'mobile_number' => $mobile_number]);
        } else {
            $user->update(['pin' => $pin]);
        }

        $message = "Your verification PIN is " . $pin;

        if ($mobile_number != '') {
            $sent = $this->sender->sendSms([$mobile_number], $message);

            if (!$sent) {
                $this->data['errors'] = ['Failed to send PIN. Make sure your mobile number is in international format or click below to get PIN via email'];
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }
        } else {
            $sent = $this->sender->sendEmail([$user->email], $message, "Verification Pin");

            if (!$sent) {
                $this->data['errors'] = ['Failed to send PIN. contact ' . getenv("MAIL_USERNAME")];
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }
        }


        $this->data['message'] = 'PIN sent.';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function tokenForPasswordUpdate($request, $response)
    {
        $body = $request->getParsedBody();

        $email = $body['email'] ?? '';

        $rules = [
            'email' => [$email, 'required|email'],
        ];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $this->model->where('email', $email);

        if (!$row->exists()) {
            $this->data['errors'] = ['email not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $row->first();

        $token = rand(0, 999999);

        $row->update([
            'password_token' => $token
        ]);

        $data = ['title' => 'Password Reset Password', 'content' => 'Your password token is' . $token];

        $body = $this->renderer->render('email.html', $data);

        $sent = $this->sender->sendEmail([$row->email], $body, "Reset Password");

        if (!$sent) {
            $this->data['errors'] = ['Failed to send token, please contact ' . getenv("MAIL_USERNAME") . ' or try again later.'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $this->data['message'] = 'Password reset token sent successfully';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function tokenForEmailUpdate($request, $response)
    {
        $row = $request->getAttribute('user');

        $token = rand(0, 999999);

        $row->update([
            'email_token' => $token
        ]);


        $data = ['title' => 'Email Token', 'content' => ' Your email token is ' . $row->email_token];

        $body = $this->renderer->render('email.html', $data);

        $sent = $this->sender->sendEmail([$row->email], $body, "Email Update");

        if (!$sent) {
            $this->data['errors'] = ['Failed to send token, please contact ' . getenv("MAIL_USERNAME") . ' or try again later.'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $this->data['message'] = 'Email update link sent successfully, please check your mail box.';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }



    //  Verification

    public function verifyDevice($request, $response)
    {
        $body = $request->getParsedBody();
        $email = $body['email'] ?? '';
        $pin = $body["pin"] ?? "";

        $row = $this->model->where('email', $email)->first();

        if (!$row) {
            $this->data['errors'] = ['Verification Failed'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        if ($pin != $row->pin) {
            $this->data['errors'] = ['Incorrect PIN'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row->update([
            'device_verified' => 1,
            'pin' => rand(11111, 99999)
        ]);

        // $_SESSION[$this->authKey]['id'] = $row->id;

        $row = $this->model->where('email', $email)->first();
        $row = $this->relationships($row);
        $this->data['data'] = $row;
        $this->data['message'] = 'Verification Successful';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function userVerifyId($request, $response)
    {

        $user = $request->getAttribute('user');

        $front_name = $_FILES['front']['name'] ?? '';
        $front_size = $_FILES['front']['size'] ?? 0;

        $back_name = $_FILES['back']['name'] ?? '';
        $back_size = $_FILES['back']['size'] ?? 0;

        $rules = [
            'front view' => [$front_name, 'required|imageformat'],
            'front view' => [$front_size, 'imagesize'],
            'back view' => [$back_name, 'required|imageformat'],
            'back view' => [$back_size, 'imagesize'],
        ];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();
        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $back = $this->uploadImage($_FILES['back']);
        $front = $this->uploadImage($_FILES['front']);

        $user->update([
            'photo_back_view' => $back,
            'photo_front_view' => $front,
        ]);

        $user = $this->model->where('id', $user->id)->first();
        $user = $this->relationships($user);

        $this->data['data'] = $user;
        $this->data['message'] = "Upload Successful. Your identification card is currently being reviewed, if successful your account will be approved within 24 hours.";

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function adminVerifyId($request, $response)
    {

        // Body Validation
        $body = $request->getParsedBody();
        $id = $body['id'] ?? '';
        $action = $body['action'] ?? '';

        $rules = [
            'id' => [$id, 'required'],
            'action' => [$action, 'required']
        ];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();
        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        // Database Validation
        $row = $this->model->where('id', $id);
        if ($row->exists() === false) {
            $this->data['errors'] = ['not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        // Processing
        $row->first()->update(['identity_verified' => $action]);
        $row = $this->model->where('id', $id)->first();
        $row = $this->relationships($row);

        // send approved mail
        $url = getenv("APP_URL");



        $data = ['title' => 'Account Activated', 'url' => $url, 'content' => '        
            <p>Your account has been activated, Click on this <a href="' . $url . 'signin.html">link</a> to login </p>
        '];

        if ($action == 2) {
            $data = ['title' => 'Account Approval Declined', 'url' => $url, 'content' => '        
            <p>Your account has been declined, Follow this <a href="' . $url . 'user/verifyidentity.html">link</a> to re-upload your valid government issued Identification Card.</p>
        '];
        }

        $body = $this->renderer->render('email.html', $data);

        $this->sender->sendEmail([$row->email], $body, "Account Status");

        $this->data['data'] = $row;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }






    // Updates

    public function updatePassword($request, $response)
    {
        $body = $request->getParsedBody();

        $email = $body['email'] ?? '';
        $token = $body['password_token'] ?? '';
        $password = $body['new_password'] ?? '';
        $confirm_password = $body['confirm_new_password'] ?? '';

        $rules = [
            'email' => [$email, 'required'],
            'token' => [$token, 'required'],
            'password' => [$password, 'required|min(7)'],
            'password confirmation' => [$confirm_password, 'required|matches(password)'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $this->model->where('email', $email)->where('password_token', $token);

        if (!$row->exists()) {
            $this->data['errors'] =  ['invalid/expired token'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $row->first();

        $row->update([
            'password' => $password,
            'password_token' => rand(0, 999999)
        ]);

        $row = $this->relationships($row);

        $this->data['data'] = $row;
        $this->data['message'] = "Password Updated Successfully";
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateEmail($request, $response)
    {
        $user = $request->getAttribute("user");
        $body = $request->getParsedBody();

        $token = $body['email_token'] ?? '';
        $email = $body['new_email'] ?? '';
        $email_confirmation = $body['confirm_new_email'] ?? '';

        $rules = [
            'token' => [$token, 'required'],
            'email' => [$email, 'required|email'],
            'confirmation' => [$email_confirmation, 'required|email|matches(email)'],
        ];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();
        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $user->update([
            'email' => $email,
            'email_verified' => 0
        ]);

        $id = $_SESSION[$this->authKey]['id'];
        $user = $this->model->where('id', $id)->first();
        $user = $this->relationships($user);

        $this->data['data'] = $user;

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updatePhone($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute('user');

        $phone_number = $body['phone_number'] ?? '';

        $rules = [
            'new phone number' => [$phone_number, 'required|number'],
        ];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $user->update([
            'phone_number' => $phone_number
        ]);

        $id = $_SESSION[$this->authKey]['id'];
        $user = $this->model->where('id', $id)->first();
        $user = $this->relationships($user);

        $this->data['data'] = $user;
        $this->data['message'] = 'Phone Number Updated Successfully';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateAddress($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute('user');

        $street_address = $body['street_address'] ?? '';
        $city = $body['city'] ?? '';
        $state = $body['state'] ?? '';
        $post_code = $body['post_code'] ?? '';
        $country = $body['country'] ?? '';

        $rules = [
            'street address' => [$street_address, 'required'],
            'city' => [$city, 'required'],
            'state' => [$state, 'required'],
            'post code' => [$post_code, 'required'],
            'country' => [$country, 'required']
        ];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $body = $this->filter($body, [
            'street_address',
            'city',
            'state',
            'post_code',
            'country'
        ]);

        $user->update($body);

        $id = $_SESSION[$this->authKey]['id'];
        $user = $this->model->where('id', $id)->first();
        $user = $this->relationships($user);

        $this->data['data'] = $user;
        $this->data['message'] = 'Update Successful';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updatePhoto($request, $response)
    {

        $user = $request->getAttribute('user');

        $photo = $_FILES['photo']['name'] ?? '';

        $rules = [
            'photo' => [$photo, 'required|imageformat'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $photo = $this->uploadImage($_FILES['photo']);

        $user->update([
            'photo_profile' => $photo,
        ]);

        $user = $this->model->where('id', $user->id)->first();
        $user = $this->relationships($user);

        $this->data['data'] = $user;
        $this->data['message'] = "Photo Updated";

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function sendPush($request, $response)
    {
        $body = $request->getParsedBody();
        $subject = $body['subject'] ?? "";
        $content = $body['body'] ?? "";
        $user_id = $body['user_id'] ?? "";

        $rules = [
            'subject' => [$subject, 'required'],
            'user_id' => [$user_id, 'required'],
            'body' => [$content, 'required'],
        ];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }


        $user = $this->model->where('id', $user_id)->first();

        if (!$user) {
            $this->data['errors'] = ['not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $sent = $this->sender->sendPush([$user->push_subscription], $content, $subject);

        if ($sent) {
            $this->data['message'] = "Sent";

            $response->getBody()->write(json_encode($this->data));

            return $response->withHeader('Content-Type', 'application/json');
        }

        $this->data['errors'] = ["Failed To Send"];

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function sendEmail($request, $response)
    {
        $body = $request->getParsedBody();
        $subject = $body['subject'] ?? "";
        $content = $body['body'] ?? "";
        $user_id = $body['user_id'] ?? "";

        $rules = [
            'subject' => [$subject, 'required'],
            'user_id' => [$user_id, 'required'],
            'body' => [$content, 'required'],
        ];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }


        $user = $this->model->where('id', $user_id)->first();

        if (!$user) {
            $this->data['errors'] = ['not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $sent = $this->sender->sendEmail([$user->email], $content, $subject);

        if ($sent) {
            $this->data['message'] = "Sent";

            $response->getBody()->write(json_encode($this->data));

            return $response->withHeader('Content-Type', 'application/json');
        }

        $this->data['errors'] = ["Failed To Send"];

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
