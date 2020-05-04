<?php

namespace Server\Library\Controllers;

use Server\Library\Services\Validator;
use Server\Library\Services\Renderer;
use Server\Library\Services\Sender;
use Server\Library\Services\Logger;

class ServicesController
{

    public $validator;

    public $renderer;

    public $sender;

    public $logger;

    public function __construct()
    {
        $this->validator = new Validator;

        $this->renderer = new Renderer;

        $this->sender = new Sender;

        $this->logger = new Logger;
    }
}
