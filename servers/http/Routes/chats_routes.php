<?php

use Server\Controllers\ChatsController;

// messages api

$app->post('/api/chats/messages', ChatsController::class . ':message')->add($user_logged_in);


// chats api

$app->post('/api/chats', ChatsController::class . ':create')->add($user_logged_in);

$app->get('/api/chats', ChatsController::class . ':list')->add($user_logged_in);

$app->get('/api/chats/{attr}', ChatsController::class . ':read')->add($user_logged_in);
