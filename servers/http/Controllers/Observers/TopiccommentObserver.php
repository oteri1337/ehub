<?php

namespace Server\Controllers\Observers;

use Server\Database\Models\User;
use Server\Database\Models\Topic;

class TopiccommentObserver
{

    public function creating($body)
    {

        $date = new \DateTime("now", new \DateTimeZone('Africa/Lagos'));
        $body['date'] = $date->format('M d h:i A');
        return $body;
    }

    public function created($comment)
    {
        $topic = Topic::where("id", $comment->topic_id)->with('users')->first();

        $poster = User::where('id', $comment->user_id)->first();


        foreach ($topic->users as $user) {

            if (strlen($user->expo_push_token) && $user->id != $poster->id) {
                $client = new \GuzzleHttp\Client;

                $client->request('POST', 'https://exp.host/--/api/v2/push/send', [
                    'form_params' => [
                        'to' => $user->expo_push_token,
                        'title' => $topic->title,
                        'body' => $poster->first_name . " " . $poster->last_name . ": " . $comment->data,
                        'data' =>  [
                            'data' => $comment->toArray(),
                            'dispatch' => 'ADD_COMMENT_TO_TOPIC'
                        ],
                    ]
                ]);
            }
        }
    }
}
