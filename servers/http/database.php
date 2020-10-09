<?php


use Server\Database\Connection;

use Server\Database\Models\User;
use Server\Database\Models\Chatmessage;
use Server\Database\Models\Topiccomment;

use Server\Controllers\Observers\UserObserver;
use Server\Controllers\Observers\ChatmessageObserver;
use Server\Controllers\Observers\TopiccommentObserver;

new Connection;

User::observe(new UserObserver);
Chatmessage::observe(new ChatmessageObserver);
Topiccomment::observe(new TopiccommentObserver);
