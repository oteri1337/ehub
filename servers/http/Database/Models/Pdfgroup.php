<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Pdfgroup extends Model {

    protected $fillable = [
        'slug',
        'title',
    ]; 

    public function pdfs() {
        return $this->belongsToMany(Pdf::class);
    }

}

