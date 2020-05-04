<?php

use PHPUnit\Framework\TestCase;
use Server\Library\Controllers\AuthController;

use Server\Database\Connection;
use Server\Database\Models\User;

use GuzzleHttp\Psr7\ServerRequest;
use GuzzleHttp\Psr7\Response;


class AuthControllerTest extends TestCase

{

    public $controller;

    public function __construct()
    {
        parent::__construct();
        new Connection;
        $this->controller = new AuthController(new User);
    }

    public function test_that_auth_controller_can_signin()
    {
        $body = ['email' => 'test@gmail.com', 'password' => 'testpassword'];
        User::create($body);

        $request = new ServerRequest('POST', "/");
        $request = $request->withParsedBody($body);

        $response = $this->controller->signIn($request, new Response);
        $this->assertSame(200, $response->getStatusCode());


        User::where("email", $body['email'])->where('password', $body['password'])->delete();
        // var_dump($_SESSION);

        // $data = Test::where('test', $time)->first()->toArray();
        // $this->assertSame((string) $time, $data['test']);
    }
}
