<?php

namespace Server\Controllers;

use Server\Library\Controllers\ApiController;
use Server\Database\Models\Order;
use Server\Database\Models\Product;


class OrdersController extends ApiController
{

    public function __construct($container)
    {
        parent::__construct($container);
        $this->model = new Order;
        $this->readBy = "order_id";
    }

    public function create($request, $response)
    {

        // parse body
        $body = $request->getParsedBody();
        $items = $body['items'] ?? [];
        $email = $body['email'] ?? '';
        $phone_number = $body['phone_number'] ?? '';

        // validate body
        $rules = [
            'email' => [$email, 'required|email'],
            'phone number'  => [$phone_number, 'required'],
        ];
        $this->validator->validate($rules);
        $errors = $this->validator->errors()->all();
        if ($errors) {
            return $response->withJson(['errors' =>  $errors, 'data' => []]);
        }

        // calculate total
        $all_products = Product::all()->keyBy("id");
        $total = 0;
        foreach ($items as $item) {
            $id = $item['id'];
            $quantity = $item['quantity'];
            $total += $all_products[$id]['price'] * $quantity;
        }
        $body['total'] = $total;
        $body['order_id'] = time();

        // filter body
        $body =  $this->filter($body, [
            'country',
            'state',
            'city',
            'post_code',
            'street_address',
            'email',
            'phone_number',
            'first_name',
            'last_name',
            'total',
            'order_id',
            'user_id',
        ]);

        // store data
        $order = $this->model->create($body);
        foreach ($items as $item) {
            $order->products()->attach($item['id'], ['quantity' => $item['quantity']]);
        }

        $this->data['data'] = $order;
        return $response->withJson($this->data);
    }
}
