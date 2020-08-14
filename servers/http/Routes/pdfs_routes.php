<?php

use Server\Controllers\PdfsController;

$app->get('/api/pdfs', PdfsController::class . ':list');

$app->post('/api/pdfs', PdfsController::class . ':create')->add($admin_logged_in);

$app->delete('/api/pdfs', PdfsController::class . ':delete')->add($admin_logged_in);

$app->patch('/api/pdfs', PdfsController::class . ':update')->add($admin_logged_in);

$app->post('/api/pdfs/image', PdfsController::class . ':updateImage')->add($admin_logged_in);

$app->post('/api/pdfs/file', PdfsController::class . ':updateFile')->add($admin_logged_in);

$app->patch('/api/pdfs/sync', PdfsController::class . ':syncGroups')->add($admin_logged_in);

$app->get('/api/pdfs/search/{attr}', PdfsController::class . ':search');

$app->get('/api/pdfs/{attr}', PdfsController::class . ':read');
