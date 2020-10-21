<?php

namespace Server\Controllers;

use Server\Database\Models\Pdfparentgroup;
use Server\Library\Controllers\NewApiController;

class PdfparentgroupsController extends NewApiController
{

    public function __construct()
    {
        parent::__construct();
        $this->readBy = 'slug';
        $this->searchBy = 'title';
        $this->eagerList = ['groups'];
        $this->model = new Pdfparentgroup;
        $this->orderBy = "updated_at";
    }

    public function createRules($body)
    {
        $title = $body['title'] ?? '';

        return [
            'title' => [$title, 'required'],
        ];
    }

    public function beforeCreate($body)
    {
        $body["slug"] = $this->slugify($body["title"]);

        return $this->filter($body, ['title', 'slug']);
    }

    public function lazyLoadRelationships($row)
    {

        $row->groups;

        return $row;
    }

    public function sync($request, $response)
    {
        $body = $request->getParsedBody();
        $slug = $body['slug'] ?? '';
        $groups = $body['groups'] ?? [];

        $row = $this->model->where('slug', $slug)->first();
        if (!$row) {
            $errors = ['not found'];
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $data = $row->groups()->sync($groups);
        $this->data['data'] = $data;
        $this->data['message'] = "Updated Successfully";
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
