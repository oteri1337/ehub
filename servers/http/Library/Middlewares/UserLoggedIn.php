<?php

namespace Server\Library\Middlewares;

use GuzzleHttp\Psr7\Response;
use Server\Database\Models\User;
use Server\Database\Models\Session;

class UserLoggedIn
{

    public function __invoke($request, $handler)
    {

        // $id = $_SESSION['user']['id'] ?? false;
        $cookie = $_COOKIE['user'] ?? false;

        if (!$cookie) {
            $response = new Response;
            $response->getBody()->write(json_encode(['errors' => ['please sign out then sign in']]));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $session = Session::where("key", $cookie)->first();

        if (!$session) {
            $response = new Response;
            $response->getBody()->write(json_encode(['errors' => ['please sign out then sign in']]));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $user = User::where('id', $session->value)->first();

        if (!$user) {
            $response = new Response;
            $response->getBody()->write(json_encode(['errors' => ['please sign out then sign in']]));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $request = $request->withAttribute('user', $user);

        $response = $handler->handle($request);

        return $response;
    }
}
