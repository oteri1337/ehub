<?php

namespace Server\Controllers;

use Server\Database\Models\Pdfgroup;
use Server\Library\Controllers\NewApiController;

class PdfgroupsController extends NewApiController
{

    public function __construct()
    {
        parent::__construct();
        $this->readBy = 'slug';
        $this->searchBy = 'title';
        $this->model = new Pdfgroup;
    }

    public function createRules($body) {
        $title = $body['title'] ?? '';

        return [
            'title' => [$title, 'required'],
        ];
    }

    public function beforeCreate($body)
    {
        $body["slug"] = $this->slugify($body["title"]);

        return $this->filter($body, ['title', 'slug']);
    }

    public function afterCreate($row) {
        $pdfs = $row->pdfs()->paginate(12);
        $row->pdfs = $pdfs;
        return $row;
    }

}
