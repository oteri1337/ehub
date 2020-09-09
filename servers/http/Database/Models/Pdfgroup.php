<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Pdfgroup extends Model
{

    protected $fillable = [
        'slug',
        'title',
    ];

    public function data()
    {
        return $this->belongsToMany(Pdf::class);
    }

    public function pdfs()
    {
        return $this->belongsToMany(Pdf::class);
    }

    public function getNextPageUrlAttribute()
    {

        $count = count($this->pdfs);

        if ($count === 0 || $count < 12) {
            return null;
        }

        $page = $_GET['page'] ?? 1;

        $next_page_url = $page + 1;

        return "/api/pdfgroups/" . $this->slug .  "?page=" . $next_page_url;
    }
}
