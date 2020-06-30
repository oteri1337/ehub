<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Eventcomment extends Model
{

    protected $fillable = [
        'message',
        'user_id',
        'event_id'
    ];

    public function user()
    {
        return $this->belongsTo(LightUser::class);
    }

    public function getCreatedAtAttribute($row)
    {
        $dateTimeInstance = new \DateTime($row);
        return $dateTimeInstance->format('M d h:i A');
    }
}
