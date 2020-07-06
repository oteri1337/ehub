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
        $this->eagerRead = ['user', 'comments.user', 'comments' => function ($data) {
            $data->paginate(12);
        }];
        $this->eagerList = ['user', 'comments.user'];
    }

    public function beforeCreate($body)
    {

        $body["slug"] = $this->slugify($body["title"]);

        return $this->filter($body, ['title', 'content', 'slug', 'user_id', 'color', 'icon']);
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

    public function modifyList($list)
    {

        foreach ($list as $li) {

            $comments = array_reverse($li->comments->slice(0, 12)->toArray());

            unset($li->comments);

            $li->comments = $comments;
        }

        return $list;
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

        $errors = $this->validator->errors()->all();

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

        $data = $topic->comments()->save($comment);

        $data = Topiccomment::where('id', $data->id)->with(['user', 'topic'])->first();

        // var_dump($data);
        // $row =  $this->model->where("id", $topic_id)->with($this->eagerRead)->first();

        // $this->data['errors'] = ['testing'];
        $this->data['data'] = $data;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function imageComment($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute('user');
        $user_id = $user->id;

        $topic_id = $body['topic_id'] ?? '';

        $rules = [
            'user id'  => [$user_id, 'required'],
            'topic id' => [$topic_id, 'required'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

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

        $image = $_FILES['image']['name'] ?? '';

        if ($_FILES['image']['size'] === 0) {
            $this->data['errors'] = ['Image Rejected'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $rules = ['image' => [$image, 'required|imageformat']];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $image = $this->uploadImage($_FILES['image']);

        $comment = new Topiccomment(['user_id' => $user_id, 'type' => 1, 'message' => $image]);

        $data =  $topic->comments()->save($comment);

        $data = Topiccomment::where('id', $data->id)->with(['user', 'topic'])->first();

        // $row =  $this->model->where("id", $topic_id)->with($this->eagerRead)->first();

        $this->data['data'] = $data;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function documentComment($request, $response)
    {
    }
}
