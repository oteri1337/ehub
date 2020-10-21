<?php

use Server\Controllers\PdfgroupsController;

$app->get('/api/pdfgroups', PdfgroupsController::class . ':list');

$app->post('/api/pdfgroups', PdfgroupsController::class . ':create')->add($admin_logged_in);

$app->patch('/api/pdfgroups', PdfgroupsController::class . ':update')->add($admin_logged_in);

$app->delete('/api/pdfgroups', PdfgroupsController::class . ':delete')->add($admin_logged_in);

$app->post('/api/pdfgroups/search', PdfgroupsController::class . ':search');

$app->get('/api/pdfgroups/{attr}', PdfgroupsController::class . ':read');
