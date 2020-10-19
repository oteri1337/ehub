<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Topiccomment extends Model
{

    protected $fillable = [
        'type',
        'data',
        'date',
        'user_id',
        'topic_id'
    ];

    public function user()
    {
        return $this->belongsTo(UserLight::class);
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function getCreatedAtAttribute($row)
    {

        if ($this->date) {
            return $this->date;
        }

        $dateTimeInstance = new \DateTime($row);
        return $dateTimeInstance->format('M d h:i A');
    }
}
