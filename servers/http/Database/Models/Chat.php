<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{

    protected $fillable = [
        'user_id',
        'chat_id',
        'message',
    ];

    public function getRecvrIdAttribute($id)
    {
        $recvr = User::where('id', $id)->first();

        return $recvr->first_name . " " . $recvr->last_name;
    }

    public function getMessagesAttribute()
    {
        return Message::where('chat_id', $this->chat_id)->get();
    }
}
