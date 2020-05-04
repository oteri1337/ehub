<?php

namespace Server\Library\Services;

use Twilio\Rest\Client;
use Minishlink\WebPush\WebPush;
use PHPMailer\PHPMailer\PHPMailer;
use Minishlink\WebPush\Subscription;

class Sender
{

    public function sendEmail(array $emails, string $body, string $subject)
    {

        try {

            $mailer = new PHPMailer;
            $mailer->isMail();
            //$mailer->Sender = getenv("MAIL_NAME");
            $mailer->From = getenv("MAIL_USERNAME");
            //$mailer->setFrom("test", "test");

            // $mailer->Host = getenv("MAIL_HOST");
            // $mailer->Port = getenv("MAIL_PORT");
            // $name = getenv("MAIL_NAME");
            // $email = ;
            // $mailer->isHTML(true);
            // $mailer->isSMTP();
            // $mailer->SMTPDebug = getenv("MAIL_ERRORS");
            // $mailer->SMTPAuth = true;
            // $mailer->Username = $email;
            // $mailer->Password = getenv("MAIL_PASSWORD");

            // $mailer->addReplyTo($email, $name);

            foreach ($emails as $email) {
                $mailer->addAddress($email);
            }

            $mailer->Subject = $subject;
            $mailer->Body = $body;

            // echo "<pre>";
            // var_dump($mailer);

            $sent =  $mailer->send();

            return $sent;
        } catch (\Exception $errors) {
            return false;
        }
    }

    public function sendPush(array $subscriptions, string $body, string $subject)
    {


        $auth = [
            'VAPID' => [
                'subject' => 'mailto:' . getenv("MAIL_USERNAME"),
                'publicKey' => getenv("PUBLIC_VAPID_KEY"),
                'privateKey' => getenv("PRIVATE_VAPID_KEY"),
            ],
        ];

        $notification = ['subject' => $subject, 'body' => $body];

        $webPush = new WebPush($auth);

        try {
            // add push subscriptions
            foreach ($subscriptions as $subscription) {
                $subscription = (array) json_decode($subscription);
                // var_dump($subscription);
                $subscription['keys'] = (array) $subscription['keys'];
                $subscription = Subscription::create($subscription);
                $webPush->sendNotification($subscription, json_encode($notification));
            }

            // send push subscriptons
            foreach ($webPush->flush() as $report) {
            }

            return true;
        } catch (\Exception $errors) {
            return false;
        }
    }

    public function sendSms(array $numbers, string $body)
    {
        $sid = getenv('TWILIO_SID');
        $token = getenv('TWILIO_TOKEN');
        $from_number = getenv('TWILIO_NUMBER');

        $client = new Client($sid, $token);
        $sent = [];

        try {
            foreach ($numbers as $number) {
                $sent[] = $client->messages->create($number, [
                    'from' => $from_number,
                    'body' => $body
                ]);
            }
            return $sent;
        } catch (\Exception $errors) {
            return false;
        }
    }
}
