<?php

use Server\Controllers\AdminsController;

$app->get('/api/admins/auth/status', AdminsController::class.':status'); 

$app->post('/api/admins/auth/signin', AdminsController::class.':signin'); 

$app->get('/api/admins/auth/signout', AdminsController::class.':signout'); 


$app->post('/api/admins/auth/password/token', AdminsController::class.':tokenForPasswordUpdate'); 

$app->patch('/api/admins/auth/password/update', AdminsController::class.':updatePassword');


// $app->post('/api/admins/auth/email/token', AdminsController::class.':emailToken')->add($admin_logged_in);

// $app->post('/api/admins/auth/email/verify', AdminsController::class.':verifyEmail')->add($admin_logged_in);

// $app->post('/api/admins/auth/email/update', AdminsController::class.':emailToken');

