<?php

namespace Server\Controllers;

use Server\Library\Controllers\NewApiController;
use Server\Database\Models\News;

class NewsController extends NewApiController
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new News;
        $this->readBy = 'slug';
        $this->searchBy = 'title';
    }

    public function beforeCreate($body)
    {
        $body["slug"] = $this->slugify($body["title"]);

        return $this->filter($body, ['title', 'content', 'slug']);
    }
}
