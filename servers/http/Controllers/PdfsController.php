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
        $body['file_name'] = $this->uploadFile($_FILES['file'], PDF_DIR);
        $body['image_name'] = $this->uploadFile($_FILES['image'], IMAGE_DIR);
        $body['file_size'] = $_FILES['file']['size'];

        return $this->filter($body, ['title', 'description', 'slug', 'format', 'file_name', 'file_size', 'image_name', 'image_size']);
    }

    public function updateRules($body)
    {

        $by = $body['by'] ?? '';
        $stars = $body['stars'] ?? '';
        $title = $body['title'] ?? '';
        $description = $body['description'] ?? '';


        return [
            'by' => [$by, 'required'],
            'stars' => [$stars, 'required|number'],
            'Pdf title' => [$title, 'required'],
            'description' => [$description, 'required'],
        ];
    }

    public function updateBody($body, $row)
    {

        $body['description'] = nl2br($body['description']);

        return $this->filter($body, ['by', 'stars', 'title', 'description']);
    }

    public function afterCreate($row)
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

    // private function getExtension($file)
    // {
    //     $filename = $file['name'];
    //     $filename = strtolower($filename);
    //     $end = strlen($filename);
    //     $start = $end - 4;
    //     return substr($filename, $start, $end);
    // }
}
