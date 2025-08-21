<?php

namespace Server\Controllers;

use Server\Database\Models\Event;
use Server\Database\Models\Eventcomment;
use Server\Library\Controllers\NewApiController;

class EventsController extends NewApiController
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Event;
        // $this->readBy = 'slug';
        $this->searchBy = 'title';
        $this->eagerList = ['comments.user', 'users'];
    }

    public function createRules($body)
    {

        $title = $body['title'] ?? '';
        $content = $body['data'] ?? '';

        return [
            'title' => [$title, 'required'],
            'data' => [$content, 'required'],
        ];
    }

    public function beforeCreate($body)
    {

        return $this->filter($body, ['title', 'data', 'user_id', 'type', 'date']);
    }

    public function lazyLoadRelationships($row)
    {
        $row->users = $row->users;

        $paginator = $row->comments()->with('user')->paginate(12);

        $row->comments = $paginator->items();

        $row->comments_count = $paginator->total();

        $row->next_page_url = $paginator->nextPageUrl();

        return $row;
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
            $this->data['errors'] = ['comments are disabled for this event'];
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

        $comment = new Eventcomment(['user_id' => $user->id, 'data' => $data, 'type' => $type]);

        $data = $parent->comments()->save($comment);

        // $data = Eventcomment::where('id', $data->id)->with(['user', 'event'])->first();
        $event = $this->model->where('id', $id)->first();

        $event = $this->lazyLoadRelationships($event);

        $this->data['data'] = $event;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateComment($request, $response)
    {
        $body = $request->getParsedBody();

        $data = $body['data'] ?? '';
        $comment_id = $body['id'] ?? '';
        $event_id = $body['event_id'] ?? '';

        $rules = [
            'data' => [$data, 'required'],
            'topic id' => [$event_id, 'required'],
            'comment id' => [$comment_id, 'required'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $comment = Eventcomment::where('id', $comment_id)->first();

        if (!$comment) {
            $this->data['errors'] = ['comment not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $comment->update(['data' => $data]);

        $topic = $this->model->where('id', $event_id)->first();

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
        $event_id = $body['event_id'] ?? '';

        $rules = [
            'topic id' => [$event_id, 'required'],
            'comment id' => [$comment_id, 'required'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $comment = Eventcomment::where('id', $comment_id)->first();

        if (!$comment) {
            $this->data['errors'] = ['comment not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $comment->delete();

        $topic = $this->model->where('id', $event_id)->first();

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

    public function updateImage($request, $response)
    {
        $body = $request->getParsedBody();
        $id = $body['id'] ?? '';
        $image = $_FILES['image']['name'] ?? '';
        $image_size = $_FILES['image']['size'] ?? 0;

        $rules = [
            'id' => [$id, 'required'],
            'image' => [$image, 'required|imageformat'],
            'image size' => [$image_size, 'imagesize'],
        ];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $this->model->where('id', $id)->first();

        if (!$row) {
            $this->data['errors'] = ["not found"];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $this->removeImage($row->image);
        $image = $this->uploadImage($_FILES['image']);

        $row->update(['image' => $image]);

        $this->data['data'] = $row;
        $this->data['message'] = "Update Successful";
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function addUser($request, $response)
    {
        $body = $request->getParsedBody();

        $user = $request->getAttribute('user');

        $event_id = $body['event_id'] ?? '';

        $rules = ['event id' => [$event_id, 'required|number']];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $event = $this->model->where('id', $event_id)->first();

        if (!$event) {
            $this->data['errors'] = ['Not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $event->users()->attach($user->id);

        $event = $this->model->where('id', $event_id)->with($this->eagerList)->first();

        $this->data['data'] = $event;

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function deleteUser($request, $response)
    {
        $body = $request->getParsedBody();

        $user = $request->getAttribute('user');

        $event_id = $body['event_id'] ?? '';

        $rules = ['event id' => [$event_id, 'required|number']];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $event = $this->model->where('id', $event_id)->first();

        if (!$event) {
            $this->data['errors'] = ['Not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $event->users()->detach($user->id);

        $event = $this->model->where('id', $event_id)->with($this->eagerList)->first();

        $this->data['data'] = $event;

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
