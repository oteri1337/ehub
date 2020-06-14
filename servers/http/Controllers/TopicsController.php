<?php

namespace Server\Controllers;

use Server\Database\Models\Topic;
use Illuminate\Support\Collection;
use Server\Database\Models\Comment;
use Server\Library\Controllers\NewApiController;

class TopicsController extends NewApiController
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Topic;
        $this->readBy = 'slug';
        $this->searchBy = 'title';
        $this->eagerList = ['comments.user', 'comments' => function ($comments) {
            $comments->orderBy('created_at', 'DESC')->limit(1);
        }];
        $this->eagerRead = ['comments.user', 'comments'];
    }

    public function list($request, $response)
    {

        $paginator =  $this->model->with($this->eagerList)->orderBy('created_at', 'DESC')->paginate($this->perPage);

        $paginator = $paginator->toArray();

        $collection = Collection::make($paginator['data'])->keyBy($this->readBy);

        $paginator['object'] = $collection;

        $this->data['data'] = $paginator;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function read($request, $response)
    {
        $attr = $request->getAttribute('attr');

        $row =  $this->model->where($this->readBy, $attr)->with($this->eagerRead)->first();

        if (!$row) {
            $this->data['errors'] = ['not found'];

            $response->getBody()->write(json_encode($this->data));

            return $response->withHeader('Content-Type', 'application/json');
        }

        // $comments = $row->comments()->paginate($this->perPage)->toArray();

        // $row['comments_total'] = $comments['total'];

        // $row['comments_next_page'] = $comments['next_page_url'];

        $this->data['data'] = $row;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }


    public function beforeCreate($body)
    {
        $body["slug"] = $this->slugify($body["title"]);

        return $this->filter($body, ['title', 'message', 'slug', 'user_id']);
    }

    public function createRules($body)
    {

        $title = $body['title'] ?? '';
        $message = $body['message'] ?? '';
        $user_id = $body['user_id'] ?? '';

        return [
            'title' => [$title, 'required'],
            'message' => [$message, 'required'],
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

        $comment = new Comment(['user_id' => $user_id, 'topic_id', 'message' => $message]);

        $topic->comments()->save($comment);

        $row =  $this->model->where("id", $topic_id)->with($this->eagerRead)->first();

        $this->data['data'] = $row;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
