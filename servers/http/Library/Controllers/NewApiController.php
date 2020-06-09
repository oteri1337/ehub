<?php

namespace Server\Library\Controllers;

use Illuminate\Support\Collection;


class NewApiController extends ServicesController
{
    use UtilsTrait;

    public $model;
    public $eager = [];
    public $perPage = 12;
    public $readBy = "id";
    public $searchBy = "id";
    public $data = [
        'errors' => [],
        'message' => '',
        'data' =>  [],
    ];

    // public $relationships;

    // public function __construct($model = [], $readBy = "id", $searchBy = "id", $perPage = 12)
    // {
    //     parent::__construct();

    // $this->data = [
    //     'errors' => [],
    //     'message' => '',
    //     'data' => (object) [],
    // ];

    //     $this->model = $model;
    //     $this->readBy = $readBy;
    //     $this->perPage = $perPage;
    //     $this->searchBy = $searchBy;
    //     $this->relationships = [];
    // }

    public function create($request, $response)
    {
        $body = $request->getParsedBody();

        $createRules = $this->createRules($body);

        $this->validator->validate($createRules);

        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }


        $body = $this->beforeCreate($body);

        $row = $this->model->create($body);

        $row = $this->afterRead($row);

        $this->data['data'] = $row;
        $this->data['message'] = "Created";
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function createRules($body)
    {
        return [];
    }

    public function beforeCreate($body)
    {
        return $body;
    }

    public function afterCreate($row)
    {
        return $row;
    }

    public function afterRead($row)
    {
        return $this->afterCreate($row);
    }

    public function read($request, $response)
    {
        $attr = $request->getAttribute('attr');

        $row = $this->model->where($this->readBy, $attr)->first();
        if (!$row) {
            $this->data['errors'] = ['not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        // $row = $this->afterRead($row);
        // $row = $row->with($this->relationships);

        $this->data['data'] = $row;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // public function list($request, $response)
    // {
    //     $optimized = $this->getOptimizedList();
    //     $this->data['data'] = $optimized;
    //     $response->getBody()->write(json_encode($this->data));
    //     return $response->withHeader('Content-Type', 'application/json');
    // }

    public function list($request, $response)
    {

        $paginator =  $this->model->with($this->eager)->orderBy('created_at', 'DESC')->paginate($this->perPage);

        $paginator = $paginator->toArray();

        $collection = Collection::make($paginator['data'])->keyBy($this->readBy);

        $paginator['object'] = $collection;

        $this->data['data'] = $paginator;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }


    public function delete($request, $response)
    {
        $body = $request->getParsedBody();

        $attr = $body["id"];

        $row = $this->model->where("id", $attr)->first();

        if (!$row) {
            $this->data['errors'] = ['not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row->delete();

        $optimized = $this->getOptimizedList();
        $this->data['data'] = $optimized;

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
