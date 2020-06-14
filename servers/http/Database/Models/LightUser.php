<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class LightUser extends Model
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
        'id'
    ];
}
