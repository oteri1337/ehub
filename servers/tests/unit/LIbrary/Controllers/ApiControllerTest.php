<?php

use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\TestCase;
use Server\Database\Connection;
use Server\Database\Models\Test;
use GuzzleHttp\Psr7\ServerRequest;
use Server\Library\Controllers\ApiController;

class ApiControllerTest extends TestCase

{

    public $controller;

    public function __construct()
    {
        parent::__construct();

        new Connection;

        $this->controller = new ApiController(new Test, "id", "test");
    }

    public function test_that_api_controller_can_create()
    {
        $time = time();
        $body = ['test' => $time];
        $request = new ServerRequest('POST', "/");
        $request = $request->withParsedBody($body);

        $response = $this->controller->create($request, new Response);
        $this->assertSame(200, $response->getStatusCode());

        $data = Test::where('test', $time)->first()->toArray();
        $this->assertSame((string) $time, $data['test']);
    }

    public function test_that_api_controller_can_read()
    {
        $time = time();

        $body = ['test' => $time];

        $row = Test::create($body)->toArray();

        $request = new ServerRequest('GET', "/");

        $request = $request->withAttribute("attr", $row['id']);

        $response = $this->controller->read($request, new Response);

        $this->assertSame(200, $response->getStatusCode());

        $data = json_decode($response->getBody());

        $this->assertSame((string) $time, $data->data->test);
    }

    public function test_that_api_controller_can_update()
    {
        $time = time();
        $body = ['test' => $time];
        $row = Test::create($body)->toArray();
        $row['test'] = "updated";

        $request = new ServerRequest('PATCH', "/");
        $request = $request->withParsedBody($row);
        $response = $this->controller->update($request, new Response);
        $this->assertSame(200, $response->getStatusCode());

        $data = json_decode($response->getBody());
        $this->assertSame($row['test'], $data->data->test);
    }

    public function test_that_api_controller_can_delete()
    {
        $time = time();
        $body = ['test' => $time];
        $row = Test::create($body)->toArray();

        $request = new ServerRequest("DELETE", "/");
        $request = $request->withParsedBody($row);
        $response = $this->controller->delete($request, new Response);
        $this->assertSame(200, $response->getStatusCode());

        $exists = Test::where('id', $row['id'])->exists();
        $this->assertSame(false, $exists);
    }

    public function test_that_api_controller_can_search()
    {
        $data = "search data";
        $body = ['test' => $data];
        Test::create($body)->toArray();

        $request = new ServerRequest('POST', "/");
        $request = $request->withParsedBody(['search' => $data]);

        $response = $this->controller->search($request, new Response);
        $this->assertSame(200, $response->getStatusCode());

        $json = json_decode($response->getBody());
        $searched = $json->data->data[0]->test;
        $this->assertSame($data, $searched);
    }

    public function test_that_api_controller_can_list()
    {
        $expected = Test::all()->count();

        if ($expected > $this->controller->perPage) {
            $expected = $this->controller->perPage;
        }

        $request = new ServerRequest('GET', "/");
        $response = $this->controller->list($request, new Response);
        $this->assertSame(200, $response->getStatusCode());

        $json = json_decode($response->getBody());
        $this->assertSame($expected, count($json->data->data));
    }
}
