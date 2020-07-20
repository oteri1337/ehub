<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Eventcomment extends Model
{

    protected $fillable = [
        'data',
        'type',
        'user_id',
        'event_id'
    ];

    public function user()
    {
        return $this->belongsTo(UserLight::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function getCreatedAtAttribute($row)
    {
        $dateTimeInstance = new \DateTime($row);
        return $dateTimeInstance->format('M d h:i A');
    }
}
