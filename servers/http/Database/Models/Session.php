<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{

    protected $fillable = [
        'key',
        'value',
    ];
}
