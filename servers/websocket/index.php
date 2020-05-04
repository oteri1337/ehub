<?php

require("../../vendor/autoload.php");

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

use Ratchet\WebSocket\WsServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;

use Server\Database\Models\User;

class App implements MessageComponentInterface
{
    // public $clients = [];
    public $users = [];

    public function onOpen(ConnectionInterface $client)
    {
        // $this->clients[$client->resourceId] = $client;
    }

    public function onClose(ConnectionInterface $client)
    {
        // unset($this->clients[$client->resourceId]);
    }

    public function onError(ConnectionInterface $client, Exception $error)
    {
        // var_dump($error->getMessage());
    }

    public function onMessage(ConnectionInterface $client, $message)
    {
        $user = User::where('id', $message)->first();
        if ($user) {
            $client->data = $user;
            $this->users[$client->resourceId] = $client;
        }
    }
}



$app = new App;
$wsServer = new WsServer($app);
$httpServer = new HttpServer($wsServer);
$IoServer = IoServer::factory($httpServer, 8080);

$IoServer->loop->addPeriodicTimer(5, function () use ($app) {

    foreach ($app->users as $user) {
        $data = json_encode(['id' => $user->data->id, 'mining_balance_btc' => $user->data->mining_balance_btc, 'mining_balance_eth' => $user->data->mining_balance_eth]);
        $user->send($data);
    }
});

bootUpEloquent();
$IoServer->run();
