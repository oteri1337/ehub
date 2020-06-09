<?php

namespace Server\Controllers;

use Server\Library\Controllers\ApiController;
use Server\Database\Models\Product;

class ProductsController extends ApiController
{

    public function __construct($container)
    {
        parent::__construct($container);
        $this->model = new Product;
        $this->readBy = "slug";
    }

    public function createRules($body)
    {
        $title = $body['title'] ?? '';
        $price = $body['price'] ?? '';
        $min_order = $body['min_order'] ?? '';
        $max_order = $body['max_order'] ?? '';
        $descr = $body['description'] ?? '';
        $image_size = $_FILES['image_one']['size'] ?? 0;
        $image = $_FILES['image_one']['name'] ?? '';


        return [
            'title' => [$title, 'required'],
            'price' => [$price, 'required|number'],
            'min order' => [$min_order, 'required|number'],
            'max order' => [$max_order, 'required|number'],
            'description' => [$descr, 'required'],
            'image size' => [$image_size, 'imagesize'],
            'image' => [$image, 'required|imageformat'],
        ];
    }

    public function createBody($body)
    {

        $body['description'] = nl2br($body['description']);

        $file_name = strtolower($body['title']);
        $image_name = strtolower($body['title']);

        $file_name = str_replace(' ', '-', $file_name);
        $image_name = str_replace(' ', '-', $image_name);

        $body['slug'] = $file_name;

        $image = $_FILES['image_one'];
        $body['image_size'] = $image['size'];

        $image_name = $image_name . $this->getExtension($image);

        $body['file_name'] = $file_name;
        $body['image_one'] = $image_name;

        try {
            //move_uploaded_file($file['tmp_name'], $this->container->get("animationsDir") . $file_name);
            move_uploaded_file($image['tmp_name'], $this->container->get("imageDir") . $image_name);
        } catch (\Exception $e) {
            return $e->getMessage();
        }

        return $this->filter($body, ['title', 'slug', 'description', 'price', 'min_order', 'max_order', 'image_one']);
    }

    public function updateRules($body)
    {
        $title = $body['title'] ?? '';
        $price = $body['price'] ?? '';
        $min_order = $body['min_order'] ?? '';
        $max_order = $body['max_order'] ?? '';
        $descr = $body['description'] ?? '';


        return [
            'title' => [$title, 'required'],
            'price' => [$price, 'required|number'],
            'min order' => [$min_order, 'required|number'],
            'max order' => [$max_order, 'required|number'],
            'description' => [$descr, 'required'],
        ];
    }

    public function updateBody($body, $row)
    {

        return $this->filter($body, ['title', 'slug', 'description', 'price', 'min_order', 'max_order']);
    }


    public function total($request, $response)
    {
        $body = $request->getParsedBody();
        $items = $body['items'];

        $all_products = $this->model::all()->keyBy("id");

        $total = 0;

        foreach ($items as $item) {
            $id = $item['id'];
            $quantity = $item['quantity'];
            $total += $all_products[$id]['price'] * $quantity;
        }

        $this->data['data'] = $total;
        return $response->withJson($this->data);
    }

    private function getExtension($file)
    {
        $filename = $file['name'];
        $filename = strtolower($filename);
        $end = strlen($filename);
        $start = $end - 4;
        return substr($filename, $start, $end);
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
            return $response->withJson($this->data);
        }

        $row = $this->model->where('id', $id)->first();

        if (!$row) {
            $this->data['errors'] = ["not found"];
            return $response->withJson($this->data);
        }

        $oldImage = $row->image_one;
        $newImage = time() . $this->getFileNameAndExtenstion($oldImage)['name'] . $this->getFileNameAndExtenstion($image)['extension'];

        $oldImagePath = $this->container->get("imageDir") . $oldImage;
        $newImagePath = $this->container->get("imageDir") . $newImage;

        try {
            unlink($oldImagePath);
            move_uploaded_file($_FILES['image']['tmp_name'], $newImagePath);
        } catch (\Exception $e) {
            return $this->data['errors'] = [$e->getMessage()];
            return $response->withJson($this->data);
        }

        $row->update(['image_one' => $newImage]);

        $this->data['data'] = $row;
        $this->data['message'] = "Update Successful";
        return $response->withJson($this->data);
    }

    public function getFileNameAndExtenstion($filename)
    {
        $length_of_filename = strlen($filename);
        $fifth_char_from_behind = $length_of_filename - 5;
        $fourth_char_from_behind = $length_of_filename - 4;

        if ($filename[$fifth_char_from_behind] === ".") {
            return [
                'name' => substr($filename, 0, $fifth_char_from_behind),
                'extension' => substr($filename, $fifth_char_from_behind, $length_of_filename)
            ];
        }

        if ($filename[$fourth_char_from_behind] === ".") {
            return [
                'name' => substr($filename, 0, $fourth_char_from_behind),
                'extension' => substr($filename, $fourth_char_from_behind, $length_of_filename)
            ];
        }
    }
}
