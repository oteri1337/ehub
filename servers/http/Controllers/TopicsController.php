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
        $this->searchBy = 'title';
        $this->orderBy = "updated_at";
        $this->eagerList = ['user', 'comments.user', 'users'];
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

        return $this->filter($body, ['data', 'allow_comments']);
    }

    public function modifyList($list)
    {

        foreach ($list as $li) {

            $li->comments_count = $li->comments->count();

            $comments = $li->comments->slice(0, 12)->toArray();

            unset($li->comments);

            $li->comments = $comments;
        }

        return $list;
    }

    public function lazyLoadRelationships($row)
    {

        $row->user = $row->user;

        $row->users = $row->users;

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

        $id = $body['id'] ?? '';
        $type = $body['type'] ?? 0;
        $data = $body['data'] ??  $_FILES['data']['name'] ?? '';

        $rules = [
            'id' => [$id, 'required'],
            'data' => [$data, 'required'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $parent = $this->model->where('id', $id)->first();

        if (!$parent) {
            $this->data['errors'] = ['Not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        if ($parent->allow_comments == "no") {
            $this->data['errors'] = ['comments are disabled for this topic'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        // image validation
        if ($type == 1) {
            if ($_FILES['data']['size'] === 0) {
                $this->data['errors'] = ['Image Rejected'];
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }

            $rules = ['image' => [$data, 'required|imageformat']];

            $this->validator->validate($rules);

            $errors = $this->validator->errors()->all();

            if ($errors) {
                $this->data['errors'] = $errors;
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }

            $data = $this->uploadImage($_FILES['data']);
        }

        // if message is pdf
        if ($type == 2) {
            if ($_FILES['data']['size'] === 0) {
                $this->data['errors'] = ['Pdf Rejected'];
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }

            $rules = ['pdf' => [$data, 'required|pdfformat']];

            $this->validator->validate($rules);

            $errors = $this->validator->errors()->all();

            if ($errors) {
                $this->data['errors'] = $errors;
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }

            $data = $this->uploadFile(PDF_DIR, $_FILES['data']);
        }

        $comment = new Topiccomment(['user_id' => $user->id, 'data' => $data, 'type' => $type]);

        $data = $parent->comments()->save($comment);


        $topic = $this->model->where('id', $id)->first();

        $topic->update(['comments_count' => $topic->comments_count + 1]);

        $topic = $this->lazyLoadRelationships($topic);

        $this->data['data'] = $topic;
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

    public function addUser($request, $response)
    {
        $body = $request->getParsedBody();

        $user = $request->getAttribute('user');

        $topic_id = $body['topic_id'] ?? '';

        $rules = ['topic id' => [$topic_id, 'required|number']];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $topic = $this->model->where('id', $topic_id)->first();

        if (!$topic) {
            $this->data['errors'] = ['Not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $topic->users()->attach($user->id);

        $topic = $this->model->where('id', $topic_id)->with($this->eagerList)->first();

        $this->data['data'] = $topic;

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function deleteUser($request, $response)
    {
        $body = $request->getParsedBody();

        $user = $request->getAttribute('user');

        $topic_id = $body['topic_id'] ?? '';

        $rules = ['topic id' => [$topic_id, 'required|number']];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $topic = $this->model->where('id', $topic_id)->first();

        if (!$topic) {
            $this->data['errors'] = ['Not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $topic->users()->detach($user->id);

        $topic = $this->model->where('id', $topic_id)->with($this->eagerList)->first();

        $this->data['data'] = $topic;

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
