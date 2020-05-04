<?php

use Server\Controllers\CmsController;

$app->post('/api/cms/contact', CmsController::class . ':contact');

// $app->post('/api/subscribe', CmsController::class . ':subscribe');

$app->get('/[{path:.*}]', CmsController::class . ':renderApp');
