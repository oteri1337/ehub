<?php

namespace Server\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Server\Database\Models\Pdfgroup;
use Server\Library\Controllers\NewApiController;

class PdfgroupsController extends NewApiController
{

    public function __construct()
    {
        parent::__construct();
        $this->readBy = 'slug';
        $this->searchBy = 'title';
        $this->model = new Pdfgroup;
        // $this->relationships = ['pdfs'];
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

    // public function afterCreate($row)
    // {
    //     $pdfs = $row->pdfs()->paginate(12);
    //     $row->pdfs = $pdfs;
    //     return $row;
    // }

    // public function list($request, $response)
    // {
    //     // $builder = $this->model->with(['pdfs']);

    //     $data = $this->model->paginate(12);

    //     // $data->pdfs()->paginate(12)

    //     // $this->model->pdfs()->paginate(12);

    //     // $paginated = $builder->paginate(12);

    //     $this->data['data'] = $data;

    //     // // $collection = $collection->keyBy($this->readBy);

    //     // // $paginated['object'] = $collection;
    //     // $this->data['object'] = $collection;

    //     $response->getBody()->write(json_encode($this->data));
    //     return $response->withHeader('Content-Type', 'application/json');
    // }
}
