<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{

    protected $fillable = [
        'user_id',
        'recvr_id',
        'title',
    ];

    public function messages()
    {
        return $this->hasMany(Message::class)->orderBy('created_at', 'ASC');
    }
}
