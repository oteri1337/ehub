<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class PdfgroupLight extends Model
{

    protected $table = 'pdfgroups';

    protected $hidden = [
        'created_at',
        'updated_at',
        'next_page_url'
    ];
}
