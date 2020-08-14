<?php

use Server\Controllers\UsersController;

// Auth

$app->get('/api/users/auth/status', UsersController::class . ':status');

$app->post('/api/users/auth/signin', UsersController::class . ':signin');

$app->get('/api/users/auth/signout', UsersController::class . ':signout')->add($user_logged_in);


// Updates

$app->post('/api/users/auth/photo', UsersController::class . ':updatePhoto')->add($user_logged_in);

$app->patch('/api/users/auth/email', UsersController::class . ':updateEmail')->add($user_logged_in);

$app->patch('/api/users/auth/pushtoken', UsersController::class . ':updatePushtoken')->add($user_logged_in);

$app->patch('/api/users/auth/profile', UsersController::class . ':updateProfile')->add($user_logged_in);

$app->patch('/api/users/auth/password', UsersController::class . ':updatePassword')->add($user_logged_in);


// Tokens

$app->get('/api/users/auth/token/email', UsersController::class . ':tokenForNewEmail')->add($user_logged_in);

$app->post('/api/users/auth/token/password/update', UsersController::class . ':tokenForPasswordUpdate');
