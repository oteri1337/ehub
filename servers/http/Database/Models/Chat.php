<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{

    protected $fillable = [
        'chat_id',
        'user_id',
        'recvr_id',
        'comments_count'
    ];

    public function recvr()
    {
        return $this->belongsTo(UserLight::class, "recvr_id");
    }

    public function messages()
    {
        return $this->hasMany(Chatmessage::class, "chat_id", "chat_id")->orderBy('created_at', 'DESC');
    }

    public function getNextPageUrlAttribute($data)
    {

        if ($data) {
            return $data;
        }

        $count = count($this->messages);

        if ($count === 0 || $count < 12) {
            return null;
        }

        $page = $_GET['page'] ?? 1;

        $next_page_url = $page + 1;

        return "/api/chats/" . $this->chat_id .  "?page=" . $next_page_url;
    }
}
