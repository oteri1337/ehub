<?php

use Server\Controllers\TopicsController;


// users api

$app->post('/api/topics/users', TopicsController::class . ':addUser')->add($user_logged_in);

$app->delete('/api/topics/users', TopicsController::class . ':deleteUser')->add($user_logged_in);


// comments api

$app->post('/api/topics/{attr}', TopicsController::class . ':comment')->add($user_logged_in);

$app->patch('/api/topics/comments', TopicsController::class . ':updateComment')->add($user_logged_in);

$app->delete('/api/topics/comments', TopicsController::class . ':deleteComment')->add($user_logged_in);


// topics api

$app->get('/api/topics', TopicsController::class . ':list');

$app->post('/api/topics', TopicsController::class . ':create')->add($user_logged_in);

$app->patch('/api/topics', TopicsController::class . ':update');

$app->delete('/api/topics', TopicsController::class . ':delete')->add($user_logged_in);

$app->get('/api/topics/search/{attr}', TopicsController::class . ':search');

$app->get('/api/topics/{attr}', TopicsController::class . ':read');
