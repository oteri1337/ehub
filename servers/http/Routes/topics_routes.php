<?php

use Server\Controllers\TopicsController;

$app->get('/api/topics', TopicsController::class . ':list');

$app->post('/api/topics', TopicsController::class . ':create')->add($user_logged_in);

$app->delete('/api/topics', TopicsController::class . ':delete');

$app->post('/api/topics/comment', TopicsController::class . ':comment')->add($user_logged_in);

$app->post('/api/topics/comment/image', TopicsController::class . ':imageComment')->add($user_logged_in);

$app->get('/api/topics/search/{attr}', TopicsController::class . ':search');

$app->get('/api/topics/{attr}', TopicsController::class . ':read');

$app->patch('/api/topics/{attr}', TopicsController::class . ':update')->add($user_logged_in);

$app->patch('/api/topics/{attr}/comment', TopicsController::class . ':updateComment')->add($user_logged_in);

$app->delete('/api/topics/{attr}/comment', TopicsController::class . ':deleteComment')->add($user_logged_in);
