<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{

    protected $fillable = [
        'data',
        'icon',
        'slug',
        'title',
        'color',
        'user_id',
        'comments_count',
        'allow_comments'
    ];

    public function user()
    {
        return $this->belongsTo(UserLight::class);
    }

    public function comments()
    {
        return $this->hasMany(Topiccomment::class)->orderBy('created_at', 'DESC');
    }

    public function users()
    {
        return $this->belongsToMany(UserLight::class, 'topic_user', null, "user_id");
    }

    public function getNextPageUrlAttribute($data)
    {

        if ($data) {
            return $data;
        }

        $count = count($this->comments);

        if ($count === 0 || $count < 12) {
            return null;
        }

        $page = $_GET['page'] ?? 1;

        $next_page_url = $page + 1;

        return "/api/topics/" . $this->id .  "?page=" . $next_page_url;
    }

    public function getCreatedAtAttribute($row)
    {
        $dateTimeInstance = new \DateTime($row);
        return $dateTimeInstance->format('M d h:i A');
    }
}
