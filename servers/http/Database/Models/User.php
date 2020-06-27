<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{


    protected $fillable = [
        'pin',
        'bio',
        'link',
        'email',
        'verified',
        'password',
        'last_name',
        'first_name',
        'department',
        'phone_number',
        'photo_profile',
        'push_subscription',
    ];

    protected $hidden = [
        'password'
    ];

    public function chats()
    {
        return $this->belongsToMany(Chat::class)->withPivot('recvr_id');
    }
}
