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
        $this->eagerList = ['user', 'comments.user'];
    }

    public function createRules($body)
    {
        $data = $body['data'] ?? '';
        $title = $body['title'] ?? '';
        $user_id = $body['user_id'] ?? '';

        return [
            'data' => [$data, 'required'],
            'title' => [$title, 'required'],
            'user id' => [$user_id, 'required']
        ];
    }

    public function beforeCreate($body)
    {

        $body["slug"] = $this->slugify($body["title"]);

        return $this->filter($body, ['title', 'data', 'slug', 'user_id', 'color', 'icon']);
    }

    public function updateRules($body)
    {
        $id = $body['id'] ?? '';
        $data = $body['data'] ?? '';

        return [
            'id' => [$id, 'required'],
            'data' => [$data, 'required'],
        ];
    }

    public function beforeUpdate($body)
    {

        return $this->filter($body, ['data']);
    }

    public function modifyList($list)
    {

        foreach ($list as $li) {

            $li->comments_count = $li->comments->count();

            $comments = array_reverse($li->comments->slice(0, 12)->toArray());

            unset($li->comments);

            $li->comments = $comments;
        }

        return $list;
    }

    public function lazyLoadRelationships($row)
    {

        $row->user = $row->user;

        $paginator = $row->comments()->with('user')->paginate(12);

        $row->comments = $paginator->items();

        $row->comments_count = $paginator->total();

        $row->next_page_url = $paginator->nextPageUrl();


        return $row;
    }

    public function comment($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute('user');
        $user_id = $user->id;

        $topic_id = $body['topic_id'] ?? '';
        $data = $body['data'] ?? '';

        $rules = [
            'user id'  => [$user_id, 'required'],
            'topic id' => [$topic_id, 'required'],
            'data' => [$data, 'required'],
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

        $comment = new Topiccomment(['user_id' => $user_id, 'data' => $data]);

        $data = $topic->comments()->save($comment);

        $data = Topiccomment::where('id', $data->id)->with(['user', 'topic'])->first();

        $this->data['data'] = $data;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateComment($request, $response)
    {
        $body = $request->getParsedBody();

        $data = $body['data'] ?? '';
        $comment_id = $body['id'] ?? '';
        $topic_id = $body['topic_id'] ?? '';

        $rules = [
            'data' => [$data, 'required'],
            'topic id' => [$topic_id, 'required'],
            'comment id' => [$comment_id, 'required'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $comment = Topiccomment::where('id', $comment_id)->first();

        if (!$comment) {
            $this->data['errors'] = ['comment not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $comment->update(['data' => $data]);

        $topic = $this->model->where('id', $topic_id)->first();

        if (!$topic) {
            $this->data['errors'] = ['topic not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $topic = $this->lazyLoadRelationships($topic);

        $this->data['data'] = $topic;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function deleteComment($request, $response)
    {
        $body = $request->getParsedBody();

        $comment_id = $body['id'] ?? '';
        $topic_id = $body['topic_id'] ?? '';

        $rules = [
            'topic id' => [$topic_id, 'required'],
            'comment id' => [$comment_id, 'required'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $comment = Topiccomment::where('id', $comment_id)->first();

        if (!$comment) {
            $this->data['errors'] = ['comment not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $comment->delete();

        $topic = $this->model->where('id', $topic_id)->first();

        if (!$topic) {
            $this->data['errors'] = ['topic not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $topic = $this->lazyLoadRelationships($topic);

        $this->data['data'] = $topic;

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

        $comment = new Topiccomment(['user_id' => $user_id, 'type' => 1, 'data' => $image]);

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
