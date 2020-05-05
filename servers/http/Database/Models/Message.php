<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{

    protected $fillable = [
        'user_id',
        'sender_id',
        'message',
    ];

    // public function getSenderNameAttribute()
    // {
    //     $sender = User::where('id', $this->sender_id)->first();

    //     return $sender->first_name . " " . $sender->last_name;
    // }
}
