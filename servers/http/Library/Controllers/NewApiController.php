<?php

namespace Server\Library\Controllers;

use Illuminate\Support\Collection;

class NewApiController extends ServicesController
{
    use UtilsTrait;

    public $model;
    public $eagerList = [];
    public $eagerRead = [];
    public $perPage = 12;
    public $readBy = "id";
    public $searchBy = "id";
    public $orderBy = "created_at";
    public $order = 'DESC';
    public $meta = [];
    public $data = [
        'errors' => [],
        'message' => '',
        'data' =>  [],
    ];


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

        $row = $this->model->where('id', $row->id)->first();

        $row = $this->lazyLoadRelationships($row);

        $this->data['data'] = $row;

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

    public function beforeUpdate($body)
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

    public function lazyLoadRelationships($row)
    {
        return $row;
    }

    public function read($request, $response)
    {
        $attr = $request->getAttribute('attr');

        $row =  $this->model->where($this->readBy, $attr)->with($this->eagerRead)->first();


        if (!$row) {
            $this->data['errors'] = ['not found'];

            $response->getBody()->write(json_encode($this->data));

            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $this->lazyLoadRelationships($row);

        $this->data['data'] = $row;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function loadPivots($row)
    {
    }

    public function getList($request)
    {
        return $this->model->with($this->eagerList)->orderBy($this->orderBy, $this->order)->paginate($this->perPage);
    }

    public function listBody($list)
    {
        $list = $this->modifyList($list);

        $list = $list->toArray();

        $object = Collection::make($list['data'])->keyBy($this->readBy);

        $list['object'] = $object;

        return $list;
    }

    public function list($request, $response)
    {

        $list = $this->getList($request);

        $list = $this->modifyList($list);

        $list = $list->toArray();

        $object = Collection::make($list['data'])->keyBy($this->readBy);

        $list['object'] = $object;

        $this->data['data'] = $list;

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

    public function search($request, $response)
    {
        $term = $request->getAttribute("attr") ?? '';

        if (strlen($term) === 0) {
            var_dump($term);
            $this->data['errors'] = ['search term is required'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $paginator =  $this->model->where($this->searchBy, 'LIKE', "%{$term}%")->with($this->eagerList)->orderBy('created_at', 'DESC')->paginate($this->perPage);

        $paginator = $paginator->toArray();
        $collection = Collection::make($paginator['data'])->keyBy($this->readBy);
        $paginator['object'] = $collection;

        $this->data['data'] = $paginator;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function modifyList($list)
    {
        return $list;
    }

    public function update($request, $response)
    {
        $body = $request->getParsedBody();
        $attr = $body["id"] ?? "";

        $rules = $this->updateRules($body) ?? [];

        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $this->model->where("id", $attr)->first();
        if (!$row) {
            $this->data['errors'] = ['not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $cleanBody = $this->beforeUpdate($body);
        $row = $row->update($cleanBody);

        $row = $this->model->where("id", $attr)->first();

        $row = $this->lazyLoadRelationships($row);

        $this->data['data'] = $row;
        // $this->data['message'] = 'Update Successful';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
