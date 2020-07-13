<?php

namespace Server\Controllers;

use Server\Database\Models\Chat;
use Illuminate\Support\Collection;
use Server\Database\Models\Message;
use Server\Database\Models\User;
use Server\Database\Models\LightUser;
use Server\Database\Models\ChatUser;
use Server\Library\Controllers\NewApiController;

class ChatsController extends NewApiController
{

    public function __construct()
    {
        parent::__construct();
        $this->readBy = "recvr_id";
    }

    public function getChats($user)
    {
        $paginator = ChatUser::where('user_id', $user->id)->with(['recvr', 'messages'])->paginate(12);

        $paginator = $paginator->toArray();

        $collection = Collection::make($paginator['data'])->keyBy($this->readBy);

        $paginator['object'] = $collection;

        return $paginator;
    }


    public function list($request, $response)
    {

        $user = $request->getAttribute('user');

        $paginator = ChatUser::where('user_id', $user->id)->with(['recvr', 'messages'])->paginate(12);

        $paginator = $paginator->toArray();

        $collection = Collection::make($paginator['data'])->keyBy($this->readBy);

        $paginator['object'] = $collection;

        $this->data['data'] = $paginator;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function read($request, $response)
    {

        $user = $request->getAttribute('user');

        $attr = $request->getAttribute('attr');

        $paginator = ChatUser::where('user_id', $user->id)->where('recvr_id', $attr)->with(['recvr', 'messages'])->paginate(12);

        $paginator = $paginator->toArray();

        $collection = Collection::make($paginator['data'])->keyBy($this->readBy);

        $paginator['object'] = $collection;

        $this->data['data'] = $paginator;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }


    public function create($request, $response)
    {
        $user = $request->getAttribute('user');
        $body = $request->getParsedBody();

        $message = $body['data'] ?? '';
        $recvr_id = $body['recvr_id'] ?? '';

        $chat = Chat::create(['title' => 'test']);

        ChatUser::create(['chat_id' => $chat->id, 'user_id' => $user->id, 'recvr_id' => $recvr_id]);

        ChatUser::create(['chat_id' => $chat->id, 'user_id' => $recvr_id, 'recvr_id' => $user->id]);

        Message::create(['chat_id' => $chat->id, 'user_id' => $user->id, 'data' => $message]);


        $this->data['data'] = $this->getChats($user);

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function message($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute('user');
        $user_id = $user->id;

        $chat_id = $body['chat_id'] ?? '';
        $message = $body['data'] ?? '';

        $rules = [
            'user id'  => [$user_id, 'required'],
            'chat id' => [$chat_id, 'required'],
            'message' => [$message, 'required'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $chat = Chat::where('id', $chat_id)->first();

        if (!$chat) {
            $this->data['errors'] = ['chat not found', $chat_id];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $chat->update(['title' => new \DateTime()]);

        $message = new Message(['user_id' => $user_id, 'chat_id' => $chat_id, 'data' => $message]);

        $chat->messages()->save($message);

        $row = $this->getChats($user);

        // $row =  $this->model->where("id", $chat_id)->with($this->eagerRead)->first();

        $this->data['data'] = $row;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
