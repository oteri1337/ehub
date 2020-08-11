<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Chatmessage extends Model
{

    protected $fillable = [
        'data',
        'type',
        'chat_id',
        'user_id',
        'sender_id',
    ];

    public function getCreatedAtAttribute($row)
    {
        $dateTimeInstance = new \DateTime($row);
        return $dateTimeInstance->format('M d h:i A');
    }
}