<?php


use Server\Database\Connection;

use Server\Database\Models\User;
use Server\Database\Models\Chatmessage;

use Server\Controllers\Observers\UserObserver;
use Server\Controllers\Observers\ChatmessageObserver;

new Connection;

User::observe(new UserObserver);
Chatmessage::observe(new ChatmessageObserver);
