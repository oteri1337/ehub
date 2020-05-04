<?php

use Server\Controllers\NewsController;

$app->get('/api/news', NewsController::class . ':list');

$app->post('/api/news', NewsController::class . ':create')->add($admin_logged_in);

$app->delete('/api/news', NewsController::class . ':delete')->add($admin_logged_in);

$app->post('/api/news/search', NewsController::class . ':search');

$app->get('/api/news/{attr}', NewsController::class . ':read');
