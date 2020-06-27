<?php

use Server\Controllers\EventsController;

$app->get('/api/events', EventsController::class . ':list');

$app->post('/api/events', EventsController::class . ':create')->add($admin_logged_in);

$app->delete('/api/events', EventsController::class . ':delete')->add($admin_logged_in);

$app->post('/api/events/search', EventsController::class . ':search');

$app->get('/api/events/{attr}', EventsController::class . ':read');
