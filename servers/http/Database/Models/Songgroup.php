<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Songgroup extends Model {

    protected $fillable = [
        'slug',
        'title',
    ]; 

    public function items() {
        return $this->belongsToMany(Song::class);
    }

}

