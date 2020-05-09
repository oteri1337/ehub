<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{

    protected $fillable = [
        'slug',
        'title',
        'content',
        'user_id'
    ];

    public function getUserIdAttribute($row)
    {
        $user = User::where("id", $row)->first();
        return $user->first_name . " " . $user->last_name;
    }

    public function getCreatedAtAttribute($row)
    {
        $dateTimeInstance = new \DateTime($row);
        return $dateTimeInstance->format('h:i A');
    }
}
