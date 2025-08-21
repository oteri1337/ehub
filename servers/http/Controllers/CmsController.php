<?php

namespace Server\Controllers;

use Server\Library\Controllers\ServicesController;

class CmsController extends ServicesController
{

    public function renderApp($request, $response)
    {
        $data = $this->renderer->render('zindex.html');

        $response->getBody()->write($data);

        return $response;
    }

    public function contact($request, $response)
    {
        $body = $request->getParsedBody();
        $content = $body['body'] ?? '';
        $subject = $body['subject'] ?? '';

        $rules = [
            'body' => [$content, 'required'],
            'subject' => [$subject, 'required'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $emails = [getenv("MAIL_USERNAME")];

        $sent = $this->sender->sendEmail($emails, $content, $subject);

        if (!$sent) {
            $this->data['errors'] = ['failed to send email'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $this->data['message'] = ['email sent'];
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function subscribe($request, $response)
    {

        $body = $request->getParsedBody();
        $body['email'] = $body['email'] ?? '';

        $rules = [
            'email address' => [$body['email'], 'required|email'],
        ];

        $this->validator->validate($rules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        return $response->withJson(['errors' => [], 'data' => "subscription successful"]);
    }
}
