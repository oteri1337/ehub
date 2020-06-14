<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class ChatUser extends Model
{

    protected $table = "chat_user";

    protected $fillable = [
        'chat_id',
        'user_id',
        'recvr_id'
    ];

    public function recvr()
    {
        return $this->belongsTo(LightUser::class, "recvr_id");
    }

    public function messages()
    {
        return $this->hasMany(Message::class, "chat_id", "chat_id");
    }
}
