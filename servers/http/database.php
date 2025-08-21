<?php


use Server\Database\Connection;

use Server\Database\Models\User;
use Server\Database\Models\Chatmessage;
use Server\Database\Models\Topiccomment;
use Server\Database\Models\Eventcomment;

use Server\Controllers\Observers\UserObserver;
use Server\Controllers\Observers\ChatmessageObserver;
use Server\Controllers\Observers\TopiccommentObserver;
use Server\Controllers\Observers\EventcommentObserver;

new Connection;

User::observe(new UserObserver);
Chatmessage::observe(new ChatmessageObserver);
Topiccomment::observe(new TopiccommentObserver);
Eventcomment::observe(new EventcommentObserver);
