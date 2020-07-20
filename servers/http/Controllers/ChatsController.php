<?php

namespace Server\Controllers;

// use Illuminate\Support\Collection;
// use Server\Database\Models\ChatUser;

use Server\Database\Models\Chat;
use Server\Database\Models\Chatmessage;
use Server\Library\Controllers\NewApiController;

class ChatsController extends NewApiController
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Chat;
        $this->readBy = "chat_id";
        $this->eagerList = ['recvr', 'messages'];
    }

    public function getList($request)
    {

        $user = $request->getAttribute("user");

        return $this->model->where("user_id", $user->id)->with($this->eagerList)->orderBy("updated_at", $this->order)->paginate($this->perPage);
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

    public function message($request, $response)
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

        $parent = $this->model->where('chat_id', $id)->where('user_id', $user->id)->first();

        if (!$parent) {
            $this->data['errors'] = ['Not found'];
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

        $comment = new Chatmessage(['user_id' => $user->id, 'data' => $data, 'type' => $type]);

        $data = $parent->messages()->save($comment);

        // Chatmessage::create(['chat_id' => $id, 'user_id' => $user->id, 'data' => $data, 'type' => $type]);

        $parent->update(['comments_count' => $parent->comments_count + 1]);

        $list = $this->getList($request);

        $list = $this->listBody($list);

        // $data = $this->model->where('id', $data->id)->with(['recv', 'event'])->first();

        $this->data['data'] = $list;

        // $this->data['message'] = $id;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // public function getChats($user)
    // {
    //     $paginator = ChatUser::where('user_id', $user->id)->with(['recvr', 'messages'])->paginate(12);

    //     $paginator = $paginator->toArray();

    //     $collection = Collection::make($paginator['data'])->keyBy($this->readBy);

    //     $paginator['object'] = $collection;

    //     return $paginator;
    // }

    // public function list($request, $response)
    // {

    //     $user = $request->getAttribute('user');

    //     $paginator = ChatUser::where('user_id', $user->id)->with(['recvr', 'messages'])->paginate(12);

    //     $paginator = $paginator->toArray();

    //     $collection = Collection::make($paginator['data'])->keyBy($this->readBy);

    //     $paginator['object'] = $collection;

    //     $this->data['data'] = $paginator;

    //     $response->getBody()->write(json_encode($this->data));

    //     return $response->withHeader('Content-Type', 'application/json');
    // }

    // public function read($request, $response)
    // {

    //     $user = $request->getAttribute('user');

    //     $attr = $request->getAttribute('attr');

    //     $paginator = ChatUser::where('user_id', $user->id)->where('recvr_id', $attr)->with(['recvr', 'messages'])->paginate(12);

    //     $paginator = $paginator->toArray();

    //     $collection = Collection::make($paginator['data'])->keyBy($this->readBy);

    //     $paginator['object'] = $collection;

    //     $this->data['data'] = $paginator;

    //     $response->getBody()->write(json_encode($this->data));

    //     return $response->withHeader('Content-Type', 'application/json');
    // }


    // public function create($request, $response)
    // {
    //     $user = $request->getAttribute('user');
    //     $body = $request->getParsedBody();

    //     $message = $body['data'] ?? '';
    //     $recvr_id = $body['recvr_id'] ?? '';

    //     $chat = Chat::create(['title' => 'test']);

    //     ChatUser::create(['chat_id' => $chat->id, 'user_id' => $user->id, 'recvr_id' => $recvr_id]);

    //     ChatUser::create(['chat_id' => $chat->id, 'user_id' => $recvr_id, 'recvr_id' => $user->id]);

    //     Chatmessage::create(['chat_id' => $chat->id, 'user_id' => $user->id, 'data' => $message]);


    //     $this->data['data'] = $this->getChats($user);

    //     $response->getBody()->write(json_encode($this->data));

    //     return $response->withHeader('Content-Type', 'application/json');
    // }

    // public function message($request, $response)
    // {
    //     $body = $request->getParsedBody();
    //     $user = $request->getAttribute('user');
    //     $user_id = $user->id;

    //     $chat_id = $body['chat_id'] ?? '';
    //     $message = $body['data'] ?? '';

    //     $rules = [
    //         'user id'  => [$user_id, 'required'],
    //         'chat id' => [$chat_id, 'required'],
    //         'message' => [$message, 'required'],
    //     ];

    //     $this->validator->validate($rules);

    //     $errors = $this->validator->errors()->all();

    //     if ($errors) {
    //         $this->data['errors'] = $errors;
    //         $response->getBody()->write(json_encode($this->data));
    //         return $response->withHeader('Content-Type', 'application/json');
    //     }

    //     $chat = Chat::where('id', $chat_id)->first();

    //     if (!$chat) {
    //         $this->data['errors'] = ['chat not found', $chat_id];
    //         $response->getBody()->write(json_encode($this->data));
    //         return $response->withHeader('Content-Type', 'application/json');
    //     }

    //     $chat->update(['title' => new \DateTime()]);

    //     $message = new Chatmessage(['user_id' => $user_id, 'chat_id' => $chat_id, 'data' => $message]);

    //     $chat->messages()->save($message);

    //     $row = $this->getChats($user);

    //     // $row =  $this->model->where("id", $chat_id)->with($this->eagerRead)->first();

    //     $this->data['data'] = $row;
    //     $response->getBody()->write(json_encode($this->data));
    //     return $response->withHeader('Content-Type', 'application/json');
    // }
}
