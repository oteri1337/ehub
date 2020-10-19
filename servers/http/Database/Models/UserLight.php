<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class UserLight extends Model
{

    protected $table = 'users';

    protected $hidden = [
        'hidden',
        'password',
        'phone_number',
        'push_subscription',
        'created_at',
        'updated_at',
        'pin',
        'verified',
        'topics_count',
        'nse_number',
        'token',
        'next_page_url',
        'expo_push_token',
        'web_push_token'
    ];
}
