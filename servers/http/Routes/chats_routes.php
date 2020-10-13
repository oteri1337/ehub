<?php

use Server\Controllers\ChatsController;

// messages api

$app->post('/api/chats/{attr}', ChatsController::class . ':message')->add($user_logged_in);


// chats api

$app->get('/api/chats', ChatsController::class . ':list')->add($user_logged_in);

$app->post('/api/chats', ChatsController::class . ':create')->add($user_logged_in);

$app->patch('/api/chats', ChatsController::class . ':update')->add($user_logged_in);

$app->get('/api/chats/{attr}', ChatsController::class . ':read')->add($user_logged_in);
