<?php

namespace Server\Library\Middlewares;

use GuzzleHttp\Psr7\Response;
use Server\Database\Models\Admin;
use Server\Database\Models\Session;


class AdminLoggedIn
{


    public function __invoke($request, $handler)
    {
        // $id = $_SESSION['admin']['id'] ?? false;
        $cookie = $_COOKIE['admin'] ?? false;


        if (!$cookie) {
            $response = new Response;
            $response->getBody()->write(json_encode(['errors' => ['no cookie, please sign in']]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
            return;
        }

        $id = Session::where("key",$cookie)->first()->value;
        $user = Admin::where('id', $id)->first();

        if (!$user) {
            $response = new Response;
            $response->getBody()->write(json_encode(['errors' => ['please sign in']]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        }

        $request = $request->withAttribute('user', $user);

        $response = $handler->handle($request);

        return $response;
    }
}
