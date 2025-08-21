<?php

use Server\Controllers\EventsController;

// users api

$app->post('/api/events/users', EventsController::class . ':addUser')->add($user_logged_in);

$app->delete('/api/events/users', EventsController::class . ':deleteUser')->add($user_logged_in);

// comments api

$app->post('/api/events/comments', EventsController::class . ':comment')->add($user_logged_in);

$app->patch('/api/events/comments', EventsController::class . ':updateComment')->add($user_logged_in);

$app->delete('/api/events/comments', EventsController::class . ':deleteComment')->add($user_logged_in);


// events api

$app->get('/api/events', EventsController::class . ':list');

$app->post('/api/events', EventsController::class . ':create')->add($admin_logged_in);

$app->patch('/api/events', EventsController::class . ':update')->add($admin_logged_in);

$app->delete('/api/events', EventsController::class . ':delete')->add($admin_logged_in);

$app->post('/api/events/image', EventsController::class . ':updateImage')->add($admin_logged_in);

$app->get('/api/events/search/{attr}', EventsController::class . ':search');

$app->get('/api/events/{attr}', EventsController::class . ':read');
