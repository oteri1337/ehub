<?php

namespace Server\Controllers;

use Server\Library\Controllers\ApiController;
use Server\Database\Models\Songgroup;

class SonggroupsController extends ApiController 
{ 

    public function __construct($container) {
        parent::__construct($container);
        $this->model = new Songgroup;
        $this->readBy = 'slug';
        $this->searchBy = "title";
    }

    public function createRules($body) {
        $title = $body['title'] ?? '';

        return [
            'title' => [$title, 'required'],
        ];
    }

    public function createBody($body) {

        $slug = strtolower($body['title']);
        $body['slug'] = str_replace(" ","-",$slug);

        return $this->filter($body, ['slug','title']);
    }

    public function relationships($row) {
        $items = $row->items()->paginate(12);
        $row->items = $items;
        return $row;
    }

}

?>