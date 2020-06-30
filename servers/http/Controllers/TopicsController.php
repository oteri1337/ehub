<?php

namespace Server\Controllers;

use Server\Database\Models\Topic;
use Server\Database\Models\Topiccomment;
use Server\Library\Controllers\NewApiController;

class TopicsController extends NewApiController
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Topic;
        $this->readBy = 'slug';
        $this->searchBy = 'title';
        $this->eagerRead = ['user', 'comments.user'];
        $this->eagerList = ['user', 'comments.user', 'comments'];
    }

    public function beforeCreate($body)
    {
        $color = ['#2588ed', '#fe653b', '#8299cd', '#00adef'];

        $body['color'] = $color[rand(0, 3)];

        $body["slug"] = $this->slugify($body["title"]);

        return $this->filter($body, ['title', 'content', 'slug', 'user_id', 'color']);
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

    public function comment($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute('user');
        $user_id = $user->id;

        $topic_id = $body['topic_id'] ?? '';
        $message = $body['message'] ?? '';

        $rules = [
            'user id'  => [$user_id, 'required'],
            'topic id' => [$topic_id, 'required'],
            'message' => [$message, 'required'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors;

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $topic = $this->model->where('id', $topic_id)->first();

        if (!$topic) {
            $this->data['errors'] = ['topic not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $comment = new Topiccomment(['user_id' => $user_id, 'message' => $message]);

        $topic->comments()->save($comment);

        $row =  $this->model->where("id", $topic_id)->with($this->eagerRead)->first();

        $this->data['data'] = $row;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
