<?php

namespace Server\Controllers;

use Server\Database\Models\User;
use Illuminate\Support\Collection;
use Server\Library\Controllers\AuthController;

class UsersController extends AuthController
{


    public function __construct()
    {
        parent::__construct();
        $this->model = new User;
        $this->authKey = 'user';
        $this->searchBy = 'first_name';
        $this->eagerList = ['topics.comments'];
    }

    public function createRules($body)
    {
        $email = $body['email'] ?? '';
        $password = $body['password'] ?? '';
        $confirm_password = $body['password_confirmation'] ?? '';

        return [
            'password' => [$password, 'required|min(8)'],
            'email' => [$email, 'required|emailAlreadyExists'],
            'password confirmation' => [$confirm_password, 'required|matches(password)'],
        ];
    }

    public function beforeCreate($body)
    {

        $body['email'] = strtolower($body['email']);
        $body['password'] = sha1($body['password']);

        return $this->filter($body, ['email', 'password', 'push_subscription', 'first_name', 'last_name', 'department']);
    }

    public function updateRules($body)
    {
        $first_name = $body['first_name'] ?? '';
        $last_name = $body['last_name'] ?? '';
        $dob = $body['dob'] ?? '';
        $country = $body['country'] ?? '';
        $street_address = $body['street_address'] ?? '';


        return [
            'first name' => [$first_name, 'required'],
            'last name' => [$last_name, 'required'],
            'date of birth' => [$dob, 'required'],
            'country' => [$country, 'required'],
            'address' => [$street_address, 'required'],
        ];
    }

    public function updateBody($body, $row)
    {
        return $this->filter($body, ['hidden', 'link', 'department',  'phone_number', 'bio']);
    }

    public function modifyList($list)
    {

        foreach ($list as $li) {

            $li->topics_count = $li->topics->count();

            $topics = array_reverse($li->topics->slice(0, 12)->toArray());

            unset($li->topics);

            $li->topics = $topics;
        }

        return $list;
    }

    public function lazyLoadRelationships($row)
    {

        $paginator = $row->topics()->with('comments')->paginate(12);

        $row->topics = $paginator->items();

        $row->topics_count = $paginator->total();

        $row->next_page_url = $paginator->nextPageUrl();


        return $row;
    }

    public function getList($request)
    {
        return $this->model->where('hidden', 1)->with($this->eagerList)->orderBy($this->orderBy, $this->order)->paginate($this->perPage);
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

        $paginator =  $this->model->where('hidden', 1)->where($this->searchBy, 'LIKE', "%{$term}%")->with($this->eagerList)->orderBy('created_at', 'DESC')->paginate($this->perPage);

        $paginator = $paginator->toArray();
        $collection = Collection::make($paginator['data'])->keyBy($this->readBy);
        $paginator['object'] = $collection;

        $this->data['data'] = $paginator;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
