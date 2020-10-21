<?php

use Server\Controllers\PdfparentgroupsController;

$app->get('/api/pdfparentgroups', PdfparentgroupsController::class . ':list');

$app->post('/api/pdfparentgroups', PdfparentgroupsController::class . ':create')->add($admin_logged_in);

$app->patch('/api/pdfparentgroups', PdfparentgroupsController::class . ':update')->add($admin_logged_in);

$app->patch('/api/pdfparentgroups/sync', PdfparentgroupsController::class . ':sync')->add($admin_logged_in);

$app->delete('/api/pdfparentgroups', PdfparentgroupsController::class . ':delete')->add($admin_logged_in);

$app->post('/api/pdfparentgroups/search', PdfparentgroupsController::class . ':search');

$app->get('/api/pdfparentgroups/{attr}', PdfparentgroupsController::class . ':read');
