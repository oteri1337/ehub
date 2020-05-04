<?php

namespace Server\Controllers;

use Server\Library\Controllers\AuthController;
use Server\Database\Models\Admin;

class AdminsController extends AuthController 
{
    public function __construct($container) {
        parent::__construct($container);
        $this->model = new Admin;
        $this->authKey = 'admin';
    }

}

