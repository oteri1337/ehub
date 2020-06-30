<?php

use Server\Controllers\TopicsController;

$app->get('/api/topics', TopicsController::class . ':list');

$app->post('/api/topics', TopicsController::class . ':create')->add($user_logged_in);

$app->post('/api/topics/comment', TopicsController::class . ':comment')->add($user_logged_in);

$app->delete('/api/topics', TopicsController::class . ':delete')->add($admin_logged_in);

$app->get('/api/topics/search/{attr}', TopicsController::class . ':search');

$app->get('/api/topics/{attr}', TopicsController::class . ':read');
