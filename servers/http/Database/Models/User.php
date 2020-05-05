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
    ];

    protected $hidden = [
        'password'
    ];

    public function getChatsAttribute()
    {
        return Chat::where('user_id', $this->id)->get();
    }

    public static function relationships($row)
    {
        return $row;
    }
}
