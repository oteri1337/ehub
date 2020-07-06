<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{

    protected $fillable = [
        'icon',
        'slug',
        'title',
        'color',
        'content',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(LightUser::class);
    }

    public function comments()
    {
        return $this->hasMany(Topiccomment::class)->orderBy('created_at', 'DESC');
    }

    // public function getCommentsAttribute()
    // {
    //     return 1;
    // }

    // public function getCommentsAtribute()
    // {
    //     return "msksm";
    // }

    public function getCreatedAtAttribute($row)
    {
        $dateTimeInstance = new \DateTime($row);
        return $dateTimeInstance->format('M d h:i A');
    }
}
