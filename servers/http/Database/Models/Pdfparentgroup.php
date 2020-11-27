<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Pdfparentgroup extends Model
{

    protected $fillable = [
        'icon',
        'slug',
        'title',
    ];

    public function pdfgroups()
    {
        return $this->belongsToMany(Pdfgroup::class, "pdfgroup_pdfparentgroup", null, "pdfgroup_id");
    }
}
