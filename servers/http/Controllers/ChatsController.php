<?php

namespace Server\Controllers;


use Server\Database\Models\Chat;
use Illuminate\Support\Collection;
use Server\Database\Models\Chatmessage;
use Server\Library\Controllers\NewApiController;

class ChatsController extends NewApiController
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Chat;
        $this->readBy = "recvr_id";
        $this->orderBy = "updated_at";
        $this->eagerList = ['recvr', 'messages'];
    }

    public function create($request, $response)
    {
        $user = $request->getAttribute('user');

        $body = $request->getParsedBody();

        $type = $body['type'] ?? 0;

        $recvr_id = $body['recvr_id'] ?? '';

        $data = $body['data'] ??  $_FILES['data']['name'] ?? '';

        // rules
        $rules = ['data' => [$data, 'required']];
        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }


        // create chat

        $chat_id = time();

        $this->model->create(['user_id' => $user->id, 'recvr_id' => $recvr_id, 'chat_id' => $chat_id]);

        $this->model->create(['recvr_id' => $user->id, 'user_id' => $recvr_id, 'chat_id' => $chat_id]);



        // create message

        // if message is image
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

        Chatmessage::create(['user_id' => $user->id, 'recvr_id' => $recvr_id, 'data' => $data, 'chat_id' => $chat_id, 'type' => $type]);


        // get chat list

        $list = $this->getList($request);

        $list = $this->modifyList($list);

        $list = $list->toArray();

        $object = Collection::make($list['data'])->keyBy($this->readBy);

        $list['object'] = $object;

        $this->data['data'] = $list;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function modifyList($list)
    {

        foreach ($list as $li) {

            $li->comments_count = $li->messages->count();

            $messages = $li->messages->slice(0, 15)->toArray();

            // $messages = array_reverse($li->messages->slice(0, 15)->toArray());

            unset($li->messages);

            $li->messages = $messages;
        }

        return $list;
    }

    public function lazyLoadRelationships($row)
    {

        $row->recvr = $row->recvr;

        $paginator = $row->messages()->paginate(15);

        // $messages = array_reverse($paginator->messages->slice(0, 12)->toArray());

        // unset($paginator->messages);

        $row->messages = $paginator->items();

        //        $row->messages = array_reverse($paginator->items());

        $row->comments_count = $paginator->total();

        $row->next_page_url = $paginator->nextPageUrl();

        return $row;
    }

    public function getList($request)
    {

        $user = $request->getAttribute("user");

        return $this->model->where("user_id", $user->id)->with($this->eagerList)->orderBy("updated_at", $this->order)->paginate($this->perPage);
    }

    public function message($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute('user');

        $id = $body['id'] ?? '';
        $recvr_id = $body['recvr_id'] ?? '';

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

        $chat = $this->model->where('chat_id', $id)->where('user_id', $user->id)->first();

        if (!$chat) {
            $this->data['errors'] = ['Chat Not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        // if message is image
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

        $comment = new Chatmessage(['user_id' => $user->id, 'data' => $data, 'type' => $type, 'recvr_id' => $recvr_id]);

        $data = $chat->messages()->save($comment);

        $chat->update(['comments_count' => $chat->comments_count + 1]);

        $list = $this->getList($request);

        $list = $this->listBody($list);

        $chat = $this->model->where('chat_id', $id)->where('user_id', $user->id)->first();
        $chat = $this->lazyLoadRelationships($chat);

        $this->data['data'] = $chat;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute('user');

        $recvr_id = $body['recvr_id'] ?? '';
        $notifications = $body['notifications'] ?? '';

        $rules = [
            'recvr id' => [$recvr_id, 'required|number'],
            'notifications' => [$notifications, 'required|number'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $chat = $this->model->where('user_id', $user->id)->where('recvr_id', $recvr_id)->first();
        if (!$chat) {
            $this->data['errors'] = ['chat not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $chat->update(['notifications' => $notifications]);

        $chat = $this->model->where('user_id', $user->id)->where('recvr_id', $recvr_id)->first();
        $chat = $this->lazyLoadRelationships($chat);

        $this->data['data'] = $chat;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
