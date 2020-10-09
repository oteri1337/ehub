<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{

    protected $fillable = [
        'slug',
        'title',
        'data',
        'image',
        'type',
        'date'
    ];


    public function comments()
    {
        return $this->hasMany(Eventcomment::class)->orderBy('created_at', 'DESC');
    }

    public function users()
    {
        return $this->belongsToMany(UserLight::class, 'event_user', null, "user_id");
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

    public function getTimestampAttribute()
    {
        if (strlen($this->date)) {
            return strtotime($this->date);
        }

        return "";
    }
}
