<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{


    protected $fillable = [
        'email',
        'password',
        'first_name',
        'last_name',
        'department',
        'mobile_number',
        'push_subscription',
        'photo_profile'
    ];

    protected $hidden = [
        'password'
    ];

    public function chats()
    {
        return $this->belongsToMany(Chat::class)->withPivot('recvr_id');
    }
}
