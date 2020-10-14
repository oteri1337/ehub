<?php

sleep(5);
// date_default_timezone_set("America/Jamaica");


// session_start();

define("PDF_DIR", __DIR__ . DIRECTORY_SEPARATOR . "uploads" . DIRECTORY_SEPARATOR . "pdfs" . DIRECTORY_SEPARATOR);

define("IMAGE_DIR", __DIR__ . DIRECTORY_SEPARATOR . "uploads" . DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR);

require_once('../vendor/autoload.php');

$dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . "/../");

$dotenv->load();

require_once('../servers/http/app.php');

$app->run();
