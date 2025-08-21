<?php

use Server\Controllers\AdminsController;

$app->get('/api/admins/auth/status', AdminsController::class . ':status');

$app->post('/api/admins/auth/signin', AdminsController::class . ':signin');

$app->get('/api/admins/auth/signout', AdminsController::class . ':signout');


// Updates

$app->post('/api/admins/auth/photo', AdminsController::class . ':updatePhoto')->add($user_logged_in);

$app->patch('/api/admins/auth/email', AdminsController::class . ':updateEmail')->add($user_logged_in);

$app->patch('/api/admins/auth/profile', AdminsController::class . ':updateProfile')->add($user_logged_in);

$app->patch('/api/admins/auth/password', AdminsController::class . ':updatePassword')->add($user_logged_in);


// Tokens

$app->get('/api/admins/auth/token/email', AdminsController::class . ':tokenForNewEmail')->add($user_logged_in);

$app->post('/api/admins/auth/token/password/update', AdminsController::class . ':tokenForPasswordUpdate');
