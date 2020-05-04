<?php

use PHPUnit\Framework\TestCase;
use Server\Library\Controllers\ServicesController;

class ServicesControllerTest extends TestCase

{

    public $controller;

    public function __construct()
    {
        parent::__construct();
        $this->controller = new ServicesController;
    }

    public function test_that_services_controller_has_validator()
    {
        $exists = property_exists($this->controller, 'validator');
        $this->assertSame(true, $exists);
    }

    public function test_that_services_controller_has_renderer()
    {
        $exists = property_exists($this->controller, 'renderer');
        $this->assertSame(true, $exists);
    }

    public function test_that_services_controller_has_sender()
    {
        $exists = property_exists($this->controller, 'sender');
        $this->assertSame(true, $exists);
    }

    public function test_that_services_controller_has_logger()
    {
        $exists = property_exists($this->controller, 'logger');
        $this->assertSame(true, $exists);
    }
}
