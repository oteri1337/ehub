<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{

    protected $fillable = [
        'slug',
        'title',
        'content',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function getCreatedAtAttribute($row)
    {
        $dateTimeInstance = new \DateTime($row);
        return $dateTimeInstance->format('M d h:i A');
    }
}
