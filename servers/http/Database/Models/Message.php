<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{

    protected $fillable = [
        'chat_id',
        'user_id',
        'sender_id',
        'data',
    ];

    // public function user()
    // {
    //     return $this->belongsTo(LightUser::class);
    // }

    public function getCreatedAtAttribute($row)
    {
        $dateTimeInstance = new \DateTime($row);
        return $dateTimeInstance->format('M d h:i A');
    }

    // public function getSenderNameAttribute()
    // {
    //     $sender = User::where('id', $this->sender_id)->first();

    //     return $sender->first_name . " " . $sender->last_name;
    // }
}
