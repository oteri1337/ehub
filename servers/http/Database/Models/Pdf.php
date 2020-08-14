<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Pdf extends Model
{

    protected $fillable = [
        'title',
        'description',
        'image_name',
        'file_name',
        'file_size',
        'slug',
    ];

    public function getFileSizeAttribute($bytes)
    {
        $mb = $bytes * 1e-6;
        $mb = number_format($mb, 2);
        return $mb . " MB";
    }

    public function groups()
    {
        return $this->belongsToMany(PdfgroupLight::class, "pdf_pdfgroup", null, "pdfgroup_id");
    }
}
