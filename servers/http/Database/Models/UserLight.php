<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class UserLight extends Model
{

    protected $table = 'users';

    protected $hidden = [
        'link',
        'bio',
        'email',
        'password',
        'department',
        'phone_number',
        'push_subscription',
        'created_at',
        'updated_at',
        'pin',
        'verified',
        'topics_count',
        'nse_number',
        'next_page_url'
    ];
}
