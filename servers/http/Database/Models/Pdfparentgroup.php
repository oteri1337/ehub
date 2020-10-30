<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Pdfparentgroup extends Model
{

    protected $fillable = [
        'slug',
        'title',
    ];

    // public function groups()
    // {
    //     return $this->belongsToMany(PdfgroupLight::class);
    // }

    public function groups()
    {
        return $this->belongsToMany(Pdfgroup::class, "pdfgroup_pdfparentgroup", null, "pdfgroup_id");
    }

    // public function data()
    // {
    //     return $this->belongsToMany(Pdf::class);
    // }



    // public function getNextPageUrlAttribute()
    // {

    //     $count = count($this->pdfs);

    //     if ($count === 0 || $count < 12) {
    //         return null;
    //     }

    //     $page = $_GET['page'] ?? 1;

    //     $next_page_url = $page + 1;

    //     return "/api/pdfgroups/" . $this->slug .  "?page=" . $next_page_url;
    // }
}
