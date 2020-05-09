<?php

namespace Server\Controllers;

use Server\Library\Controllers\NewApiController;
use Server\Database\Models\Topic;

class TopicsController extends NewApiController
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Topic;
        $this->readBy = 'slug';
        $this->searchBy = 'title';
    }

    public function beforeCreate($body)
    {
        $body["slug"] = $this->slugify($body["title"]);

        return $this->filter($body, ['title', 'content', 'slug', 'user_id']);
    }

    public function createRules($body)
    {

        $title = $body['title'] ?? '';
        $content = $body['content'] ?? '';
        $user_id = $body['user_id'] ?? '';

        return [
            'title' => [$title, 'required'],
            'content' => [$content, 'required'],
            'user id' => [$user_id, 'required']
        ];
    }
}
