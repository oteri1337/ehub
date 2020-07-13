<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Topiccomment extends Model
{

    protected $fillable = [
        'type',
        'data',
        'user_id',
        'topic_id'
    ];

    public function user()
    {
        return $this->belongsTo(LightUser::class);
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function getCreatedAtAttribute($row)
    {
        $dateTimeInstance = new \DateTime($row);
        return $dateTimeInstance->format('M d h:i A');
    }
}
