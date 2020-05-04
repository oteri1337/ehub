<?php

use Slim\Factory\AppFactory;

$app = AppFactory::create();

$app->addBodyParsingMiddleware();

// $container = $app->getContainer();

// cors middleware
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Credentials', 'true')
        ->withHeader('Access-Control-Allow-Origin', 'https://localhost:19006')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

require_once("errors.php");
require_once("database.php");

$app->get("/getdataurl/{attr}", function ($request, $response) {
    $file_name = $request->getAttribute("attr");

    $file_location = PDF_DIR . $file_name;

    $file = fread(fopen($file_location, "r"), filesize($file_location));

    echo "data:application/pdf;base64," . base64_encode($file);

    return $response;
});

require_once("routes.php");
require_once('Routes/cms_routes.php');
