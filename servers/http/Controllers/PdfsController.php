<?php

namespace Server\Controllers;

use Server\Library\Controllers\NewApiController;
use Server\Database\Models\Pdf;


class PdfsController extends NewApiController
{

    public function __construct($container)
    {
        parent::__construct($container);
        $this->model = new Pdf;
        $this->readBy = 'slug';
        $this->searchBy = 'title';
        // $this->orderBy = 'title';
        // $this->order = 'ASC';
    }

    public function createRules($body)
    {

        $title = $body['title'] ?? '';
        $descr = $body['description'] ?? '';
        $image_size = $_FILES['image']['size'] ?? 0;
        $file_size = $_FILES['file']['size'] ?? 0;
        $image = $_FILES['image']['name'] ?? '';
        $file = $_FILES['file']['name'] ?? '';


        return [
            'title' => [$title, 'required'],
            'description' => [$descr, 'required'],
            'image size' => [$image_size, 'imagesize'],
            'file size' => [$file_size, 'filesize'],
            'image' => [$image, 'required|imageformat'],
            'file' => [$file, 'required|pdfformat'],
        ];
    }

    public function beforeCreate($body)
    {

        $body['slug'] = $this->slugify($body['title']);
        $body['file_name'] = $this->uploadFile(PDF_DIR, $_FILES['file']);
        $body['image_name'] = $this->uploadFile(IMAGE_DIR, $_FILES['image']);
        $body['file_size'] = $_FILES['file']['size'];

        return $this->filter($body, ['title', 'description', 'slug', 'format', 'file_name', 'file_size', 'image_name', 'image_size']);
    }

    public function updateRules($body)
    {

        $description = $body['description'] ?? '';

        return [
            'description' => [$description, 'required'],
        ];
    }

    public function updateBody($body, $row)
    {

        $body['description'] = nl2br($body['description']);

        return $this->filter($body, ['title', 'description']);
    }


    public function afterCreate($row)
    {
        $row->groups;
        return $row;
    }

    public function lazyLoadRelationships($row)
    {

        $row->groups;

        return $row;
    }

    public function syncGroups($request, $response)
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

        $this->removeImage($row->image_name);
        $image = $this->uploadImage($_FILES['image']);

        $row->update(['image_name' => $image]);

        $this->data['data'] = $row;
        $this->data['message'] = "Update Successful";
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateFile($request, $response)
    {
        $body = $request->getParsedBody();
        $id = $body['id'] ?? '';
        $file = $_FILES['pdf']['name'] ?? '';
        $file_size = $_FILES['pdf']['size'] ?? 0;

        $rules = [
            'id' => [$id, 'required'],
            'pdf' => [$file, 'required|pdfformat'],
            'file size' => [$file_size, 'filesize'],
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

        $this->removeFile(PDF_DIR, $row->file_name);
        $file = $this->uploadFile(PDF_DIR, $_FILES['pdf']);

        $row->update(['file_name' => $file, 'file_size' => $file_size]);

        $this->data['data'] = $row;
        $this->data['message'] = "Update Successful";
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
