<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{

    protected $fillable = [
        'slug',
        'title',
        'data',
    ];

    public function comments()
    {
        return $this->hasMany(Eventcomment::class)->orderBy('created_at', 'DESC');
    }

    public function getCreatedAtAttribute($row)
    {
        $dateTimeInstance = new \DateTime($row);
        return $dateTimeInstance->format('M d h:i A');
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

        return "/api/events/" . $this->id .  "?page=" . $next_page_url;
    }
}
