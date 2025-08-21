<?php

namespace Server\Library\Controllers;

use Server\Database\Models\Session;

class AuthController extends NewApiController
{
    protected $authKey;


    // Basic Auth

    private function encryptPassword($password)
    {
        return sha1($password);
    }

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

        $errors = $this->validator->errors;

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

        $row = $this->lazyLoadRelationships($row);

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

        $row = $this->lazyLoadRelationships($row);

        $this->data['data'] = $row;

        $this->data['cookie'] = $_COOKIE[$this->authKey] ?? "";

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function signOut($request, $response)
    {

        $user = $request->getAttribute("user");

        $user->update(['expo_push_token' => '']);

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


    // Updates

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

        $errors = $this->validator->errors;

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
        $user = $this->lazyLoadRelationships($user);

        $this->data['data'] = $user;
        $this->data['message'] = "Photo Updated";

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateEmail($request, $response)
    {
        $user = $request->getAttribute("user");

        $body = $request->getParsedBody();

        $pin = $body['pin'] ?? '';

        $email = $body['email'] ?? '';

        $rules = [
            'pin' => [$pin, 'required'],
            'email' => [$email, 'required|email'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors;

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $this->model->where('email', $user->email)->where('pin', $pin)->first();

        if (!$row) {
            $this->data['errors'] = ['Invalid Pin'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $pin = rand(0, 999999);

        $row->update(['email' => $email, 'pin' => $pin, 'verified' => 0]);

        $row = $this->model->where('id', $row->id)->first();

        $this->data['data'] = $row;

        $this->data['message'] = "Email Upadted";

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateProfile($request, $response)
    {
        $body = $request->getParsedBody();

        $user = $request->getAttribute("user");

        $filtered = $this->filter($body, ["link", "department", "phone_number", "bio", "first_name", "last_name", "nse_number", "photo_profile", 'hidden']);

        $user->update($filtered);

        $row = $this->model->where('id', $user->id)->first();

        $this->data['data'] = $row;

        // $this->data['message'] = "Profile Updated";

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

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

        $errors = $this->validator->errors;

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

    public function updatePushtoken($request, $response)
    {
        $body = $request->getParsedBody();

        $user = $request->getAttribute("user");

        $filtered = $this->filter($body, ["expo_push_token", "web_push_token"]);

        $user->update($filtered);

        $row = $this->model->where('id', $user->id)->first();

        $this->data['data'] = $row;

        $this->data['message'] = "Profile Updated";

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }


    // Tokens 

    public function getToken($request, $response)
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

        $row = $this->model->where('email', $email)->first();

        if (!$row) {
            $this->data['errors'] = ['email not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $token = rand(11111, 99999);

        $row->update(['token' => $token]);

        $data = 'Your verification token is ' . $token;

        $sent = $this->sender->sendEmail([$row->email], $data, "Token");

        if (!$sent) {
            $this->data['errors'] = ['Failed to send token, please contact ' . getenv("MAIL_USERNAME") . ' or try again later.'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $this->data['message'] = 'Token Sent.';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function verifyToken($request, $response)
    {
        $user = $request->getAttribute("user");
        $body = $request->getParsedBody();

        $token = $body['token'] ?? '';

        $rules = ['token' => [$token, 'required|number']];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();
        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $user = $this->model->where('email', $user->email)->where('token', $token)->first();

        if (!$user) {
            $this->data['errors'] = ['invalid token'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $user->update(['verified' => 1, 'token' => rand(11111, 99999)]);
        $user = $this->model->where('email', $user->email)->first();
        $user = $this->lazyLoadRelationships($user);
        $this->data['data'] = $user;

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function resetPassword($request, $response)
    {
        $body = $request->getParsedBody();

        $email = $body['email'] ?? '';
        $token = $body['token'] ?? '';
        $new_password = $body['new_password'] ?? '';
        $new_password_confirmation = $body['new_password_confirmation'] ?? '';

        $rules = [
            'email' => [$email, 'required|email'],
            'token' => [$token, 'required|number'],
            'new_password' => [$new_password, 'required'],
            'new password confirmation' => [$new_password_confirmation, 'required|matches(new_password)']
        ];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();
        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }



        $row = $this->model->where('email', $email)->where('token', $token)->first();

        if (!$row) {
            $this->data['errors'] = ['Invalid Token'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $password = $this->encryptPassword($new_password);

        $row->update(['password' => $password, 'token' => rand(11111, 99999)]);

        $this->data['message'] = 'Password Reset Successful';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
