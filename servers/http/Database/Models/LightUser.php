<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class LightUser extends Model
{

    protected $table = 'users';

    protected $hidden = [
        'email',
        'password',
        'department',
        'mobile_number',
        'push_subscription',
        'photo_profile',
        'chats',
        'created_at',
        'updated_at',
        'pin',
        'verified',
        'id'
    ];
}
