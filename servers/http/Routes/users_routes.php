<?php

use Server\Controllers\UsersController;

// Users API

$app->post('/api/users', UsersController::class . ':create');

$app->get('/api/users', UsersController::class . ':list');

$app->get('/api/users/search/{attr}', UsersController::class . ':search');

$app->get('/api/users/{attr}', UsersController::class . ':read');
