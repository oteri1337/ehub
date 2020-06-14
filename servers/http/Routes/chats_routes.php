<?php

use Server\Controllers\ChatsController;

$app->post('/api/chats', ChatsController::class . ':create')->add($user_logged_in);

$app->get('/api/chats', ChatsController::class . ':list')->add($user_logged_in);

$app->post('/api/chats/message', ChatsController::class . ':message')->add($user_logged_in);

$app->get('/api/chats/{attr}', ChatsController::class . ':read')->add($user_logged_in);





$app->delete('/api/chats', ChatsController::class . ':delete')->add($admin_logged_in);
