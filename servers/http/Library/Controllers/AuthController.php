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


    // Updates

    public function updatePassword($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute("user");

        $password = $body['password'] ?? '';
        $new_password = $body['new_password'] ?? '';
        $new_password_confirmation = $body['new_password_confirm'] ?? '';

        $rules = [
            'Password' => [$password, 'required'],
            'New_password' => [$new_password, 'required|min(7)'],
            'New password confirmation' => [$new_password_confirmation, 'required|matches(New_password)'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $password = $this->encryptPassword($password);
        $row = $this->model->where('id', $user->id)->where('password', $password)->first();

        if (!$row) {
            $this->data['errors'] =  ['incorrect password'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $new_password = $this->encryptPassword($new_password);
        $row->update(['password' => $new_password]);

        $this->data['message'] = "Password Updated Successfully";

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateProfile($request, $response)
    {
        $body = $request->getParsedBody();

        $user = $request->getAttribute("user");

        $filtered = $this->filter($body, ["link", "department", "phone_number", "bio"]);

        $user->update($filtered);

        $row = $this->model->where('id', $user->id)->first();

        $this->data['data'] = $row;

        $this->data['message'] = "Profile Updated";

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updatePhoto($request, $response)
    {

        $user = $request->getAttribute('user');

        $photo = $_FILES['photo']['name'] ?? '';

        if ($_FILES['photo']['size'] === 0) {
            $this->data['errors'] = ['Photo Rejected'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

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



    // Tokens 

    public function tokenForNewEmail($request, $response)
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

    public function tokenForNewPassword($request, $response)
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

    public function tokenForVerification($request, $response)
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

    public function verifyVerificationToken($request, $response)
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


    // Resets

    public function setNewEmail($request, $response)
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

    public function setNewPassword($request, $response)
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


    // Notifications

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
