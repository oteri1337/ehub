<?php

namespace Server\Controllers;

use Server\Library\Controllers\AuthController;
use Server\Database\Models\LightUser;
use Server\Database\Models\User;

class UsersController extends AuthController
{


    public function __construct()
    {
        parent::__construct();
        $this->model = new User;
        $this->authKey = 'user';
        $this->searchBy = 'first_name';
        // $this->eagerRead = ['chats.messages'];
    }

    public function createRules($body)
    {
        $email = $body['email'] ?? '';
        $password = $body['password'] ?? '';
        $confirm_password = $body['password_confirmation'] ?? '';
        $first_name = $body['first_name'] ?? '';
        $last_name = $body['last_name'] ?? '';
        $department = $body['department'] ?? '';

        return [
            'password' => [$password, 'required|min(8)'],
            'email' => [$email, 'required|emailAlreadyExists'],
            'password confirmation' => [$confirm_password, 'required|matches(password)'],
            'first name' => [$first_name, 'required'],
            'last name' => [$last_name, 'required'],
            'department' => [$department, 'required']
        ];
    }

    public function createBody($body)
    {

        $body['email'] = strtolower($body['email']);
        $body['password'] = sha1($body['password']);

        // $this->data['message'] = "Successful, please check your email for verification link.";
        return $this->filter($body, ['email', 'password', 'push_subscription', 'first_name', 'last_name', 'department']);
    }

    public function updateRules($body)
    {
        $first_name = $body['first_name'] ?? '';
        $last_name = $body['last_name'] ?? '';
        $dob = $body['dob'] ?? '';
        $country = $body['country'] ?? '';
        $street_address = $body['street_address'] ?? '';
        $currency = $body['currency'] ?? '';


        return [
            'first name' => [$first_name, 'required'],
            'last name' => [$last_name, 'required'],
            'date of birth' => [$dob, 'required'],
            'country' => [$country, 'required'],
            'address' => [$street_address, 'required'],
            'currency' => [$currency, 'required'],
        ];
    }

    public function updateBody($body, $row)
    {
        return $this->filter($body, ['first_name', 'last_name', 'dob', 'country', 'street_address', 'currency', 'mobile_number']);
    }

    // public function loadPivots($row)
    // {
    //     foreach ($row->chats as $chat) {
    //         $chat->recvr = LightUser::where('id', $chat->pivot->recvr_id)->first();
    //     }
    // }
}
