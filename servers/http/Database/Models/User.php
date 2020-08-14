<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{


    protected $fillable = [
        'pin',
        'bio',
        'link',
        'email',
        'verified',
        'password',
        'last_name',
        'first_name',
        'department',
        'phone_number',
        'web_push_token',
        'expo_push_token',
        'photo_profile',
    ];

    protected $hidden = [
        'password'
    ];

    public function topics()
    {
        return $this->hasMany(Topic::class)->orderBy('created_at', 'DESC');
    }

    public function getNextPageUrlAttribute($data)
    {

        if ($data) {
            return $data;
        }

        $count = count($this->topics);

        if ($count === 0 || $count < 12) {
            return null;
        }

        $page = $_GET['page'] ?? 1;

        $next_page_url = $page + 1;

        return "/api/users/" . $this->id .  "?page=" . $next_page_url;
    }
}
