<?php

use Server\Controllers\PdfsController;

$app->get('/api/pdfs', PdfsController::class . ':list');

$app->post('/api/pdfs', PdfsController::class . ':create')->add($admin_logged_in);

$app->delete('/api/pdfs', PdfsController::class . ':delete')->add($admin_logged_in);

$app->post('/api/pdfs/search', PdfsController::class . ':search');

$app->patch('/api/pdfs/sync', PdfsController::class . ':syncGroups')->add($admin_logged_in);

$app->get('/api/pdfs/{attr}', PdfsController::class . ':read');
