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
        $this->eagerList = ['recvr', 'messages'];
    }

    public function create($request, $response)
    {
        $user = $request->getAttribute('user');

        $body = $request->getParsedBody();
        $data = $body['data'] ?? '';
        $recvr_id = $body['recvr_id'] ?? '';

        $chat_id = time();

        $this->model->create(['user_id' => $user->id, 'recvr_id' => $recvr_id, 'chat_id' => $chat_id]);

        $this->model->create(['recvr_id' => $user->id, 'user_id' => $recvr_id, 'chat_id' => $chat_id]);

        Chatmessage::create(['user_id' => $user->id, 'recvr_id' => $recvr_id, 'data' => $data, 'chat_id' => $chat_id]);

        $list = $this->getList($request);

        $list = $this->modifyList($list);

        $list = $list->toArray();

        $object = Collection::make($list['data'])->keyBy($this->readBy);

        $list['object'] = $object;

        $this->data['data'] = $list;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');


        // $list = $this->model->where("user_id", $user->id)->with($this->eagerList)->orderBy("updated_at", $this->order)->paginate($this->perPage);

        // $this->data['data'] = $this->modifyList($list);

        // $response->getBody()->write(json_encode($this->data));

        // return $response->withHeader('Content-Type', 'application/json');
    }

    public function modifyList($list)
    {

        foreach ($list as $li) {

            $li->comments_count = $li->messages->count();

            $messages = array_reverse($li->messages->slice(0, 12)->toArray());

            unset($li->messages);

            $li->messages = $messages;
        }

        return $list;
    }

    public function lazyLoadRelationships($row)
    {

        $row->recvr = $row->recvr;

        $paginator = $row->messages()->paginate(12);

        $row->messages = $paginator->items();

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
        $type = $body['type'] ?? 0;
        $recvr_id = $body['recvr_id'] ?? '';
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

        $comment = new Chatmessage(['user_id' => $user->id, 'data' => $data, 'type' => $type, 'recvr_id' => $recvr_id]);

        $data = $chat->messages()->save($comment);

        $chat->update(['comments_count' => $chat->comments_count + 1]);

        $list = $this->getList($request);

        $list = $this->listBody($list);

        $this->data['data'] = $list;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
