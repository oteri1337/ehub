<?php

use Server\Controllers\UsersController;

// Auth

$app->get('/api/users/auth/status', UsersController::class . ':status');

$app->post('/api/users/auth/signin', UsersController::class . ':signin');

$app->get('/api/users/auth/signout', UsersController::class . ':signout')->add($user_logged_in);


// Updates

$app->patch('/api/users/auth/profile', UsersController::class . ':updateProfile')->add($user_logged_in);

$app->patch('/api/users/auth/password', UsersController::class . ':updatePassword')->add($user_logged_in);

$app->post('/api/users/auth/photo', UsersController::class . ':updatePhoto')->add($user_logged_in);


// Tokens

$app->post('/api/users/auth/token/device/verify', UsersController::class . ':tokenForDeviceVerify')->add($user_logged_in);

$app->post('/api/users/auth/token/password/update', UsersController::class . ':tokenForPasswordUpdate');

$app->get('/api/users/auth/token/email/update', UsersController::class . ':tokenForEmailUpdate')->add($user_logged_in);


// Users Verification

$app->post('/api/users/auth/verify/device', UsersController::class . ':verifyDevice')->add($user_logged_in);

$app->post('/api/users/auth/verify/id', UsersController::class . ':userVerifyId')->add($user_logged_in);

$app->patch('/api/users/auth/verify/id', UsersController::class . ':adminVerifyId');
