<?php

use Server\Library\Middlewares\UserLoggedIn;
use Server\Library\Middlewares\AdminLoggedIn;

$admin_logged_in = new AdminLoggedIn;
$user_logged_in = new UserLoggedIn;

require_once('Routes/users_auth_routes.php');
require_once('Routes/admins_auth_routes.php');

require_once('Routes/pdfparentgroups_routes.php');
require_once('Routes/pdfgroups_routes.php');
require_once('Routes/topics_routes.php');
require_once('Routes/events_routes.php');
require_once('Routes/users_routes.php');
require_once('Routes/chats_routes.php');
require_once('Routes/pdfs_routes.php');
