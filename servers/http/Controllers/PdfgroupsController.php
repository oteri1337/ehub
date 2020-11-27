<?php

namespace Server\Controllers;

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
        $this->eagerList = ['pdfs'];
        $this->orderBy = "updated_at";
        $this->perPage = 50;
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

    public function modifyList($list)
    {

        foreach ($list as $li) {

            // $li->pdfs_count = $li->pdfs->count();

            $pdfs = $li->pdfs->slice(0, 12);

            unset($li->pdfs);

            $li->pdfs = $pdfs;
        }

        return $list;
    }

    public function lazyLoadRelationships($row)
    {

        $paginator = $row->pdfs()->paginate(12);

        $row->pdfs = $paginator->items();

        $row->pdfs_count = $paginator->total();

        $row->next_page_url = $paginator->nextPageUrl();

        return $row;
    }
}
