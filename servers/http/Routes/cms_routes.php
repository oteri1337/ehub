<?php

use Server\Controllers\CmsController;

$app->get('/[{path:.*}]', CmsController::class . ':renderApp');
