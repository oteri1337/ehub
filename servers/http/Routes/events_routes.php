<?php

use Server\Controllers\EventsController;

$app->get('/api/events', EventsController::class . ':list');

$app->post('/api/events', EventsController::class . ':create')->add($admin_logged_in);

$app->delete('/api/events', EventsController::class . ':delete')->add($admin_logged_in);

$app->post('/api/events/search', EventsController::class . ':search');

$app->post('/api/events/comment', EventsController::class . ':comment')->add($user_logged_in);

$app->post('/api/events/comment/image', EventsController::class . ':imageComment')->add($user_logged_in);

$app->get('/api/events/{attr}', EventsController::class . ':read');

$app->patch('/api/events/{attr}/comment', EventsController::class . ':updateComment')->add($user_logged_in);

$app->delete('/api/events/{attr}/comment', EventsController::class . ':deleteComment')->add($user_logged_in);
