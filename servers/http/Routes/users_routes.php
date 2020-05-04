<?php

use Server\Controllers\UsersController;

// Users API

$app->post('/api/users', UsersController::class . ':create');

$app->get('/api/users/{attr}', UsersController::class . ':read');

$app->delete('/api/users', UsersController::class . ':delete')->add($admin_logged_in);

$app->get('/api/users', UsersController::class . ':list')->add($admin_logged_in);

$app->post('/api/users/search', UsersController::class . ':search')->add($admin_logged_in);



$app->post('/api/users/send/email', UsersController::class . ':sendEmail')->add($admin_logged_in);

$app->post('/api/users/send/push', UsersController::class . ':sendPush')->add($admin_logged_in);
