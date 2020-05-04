<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{

    protected $table_name = "news";

    protected $fillable = [
        'slug',
        'title',
        'content',
    ];
}
