<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Chatmessage extends Model
{

    protected $fillable = [
        'data',
        'date',
        'type',
        'chat_id',
        'user_id',
        'recvr_id',
    ];

    public function getCreatedAtAttribute($row)
    {
        if ($this->date) {
            return $this->date;
        }

        $dateTimeInstance = new \DateTime($row);
        return $dateTimeInstance->format('M d h:i A');
    }
}
