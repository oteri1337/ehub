<?php

namespace Server\Controllers\Observers;

use Server\Library\Controllers\ServicesController;

class UserObserver extends ServicesController
{

    public function created($user)
    {
        $_SESSION['user']['id'] = $user->id;

        $pin = rand(11111, 99999);

        $message = "Your verification PIN is " . $pin;

        // $this->sender->sendEmail([$user->email], $message, "Verification Pin");
    }
}
