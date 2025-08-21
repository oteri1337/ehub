<?php

namespace Server\Controllers\Observers;

use Server\Database\Models\User;


class ChatmessageObserver
{

    public function creating($body)
    {

        $date = new \DateTime("now", new \DateTimeZone('Africa/Lagos'));
        $body['date'] = $date->format('M d h:i A');
        return $body;
    }

    public function created($chatmessage)
    {
        $sendr = User::where("id", $chatmessage->user_id)->first();
        $recvr = User::where("id", $chatmessage->recvr_id)->first();

        if (strlen($recvr->expo_push_token)) {
            $client = new \GuzzleHttp\Client;

            $client->request('POST', 'https://exp.host/--/api/v2/push/send', [
                'form_params' => [
                    'to' => $recvr->expo_push_token,
                    'title' => $sendr->first_name . " " . $sendr->last_name,
                    'body' =>  $chatmessage->data,
                    'data' =>  [
                        'data' => $chatmessage->toArray(),
                        'dispatch' => 'ADD_MESSAGE_TO_CHAT'
                    ],
                ]
            ]);
        }
    }
}
