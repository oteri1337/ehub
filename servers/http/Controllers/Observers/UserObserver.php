<?php

namespace Server\Controllers\Observers;

use Server\Database\Models\Session;
use Server\Library\Controllers\ServicesController;

class UserObserver extends ServicesController
{

    public function created($row)
    {

        $_SESSION["user"]['id'] = $row->id;

        $key = time();

        $key = sha1($key);

        $expires = time() + 30 * 24 * 60 * 60;

        Session::create(['key' => $key, 'value' => $row->id, 'expires' => $expires]);

        setcookie("user", $key, $expires, "/");

        // $this->data['cookie'] = $key;

        // $_SESSION['user']['id'] = $user->id;

        // $pin = rand(11111, 99999);

        // $message = "Your verification PIN is " . $pin;

        // $this->sender->sendEmail([$user->email], $message, "Verification Pin");
    }
}
