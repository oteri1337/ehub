<?php

use Monolog\Handler\StreamHandler;
use Monolog\Logger as Monolog;

$customErrorHandler = function ($request, $exception, $displayErrorDetails, $logErrors, $logErrorDetails, $logger = null) use ($app) {
    $payload = ['errors' => [$exception->getMessage()], 'data' => [], 'message' => ''];
    $response = $app->getResponseFactory()->createResponse();
    $response->getBody()->write(json_encode($payload, JSON_UNESCAPED_UNICODE));
    return $response;
};

$logger = new Monolog('name');
define("LOG_FILE", __DIR__  . "../../Logs.txt");
$logger->pushHandler(new StreamHandler(LOG_FILE, Monolog::WARNING));

$errorMiddleware = $app->addErrorMiddleware(true, true, true, $logger);
$errorMiddleware->setDefaultErrorHandler($customErrorHandler);
