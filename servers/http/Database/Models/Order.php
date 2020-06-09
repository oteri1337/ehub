<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = [
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
        'user_id',
        'order_id',
        'payment_status',
        'delivery_status'
    ];

    protected $hidden = [
        'id',
        'user_id'
    ];

    public function getPaymentStatusAttribute($col)
    {

        if ($col === 0) {
            return "Pending";
        }

        if ($col === 1) {
            return "Paid";
        }
    }

    public function getDeliveryStatusAttribute($col)
    {

        if ($col === 0) {
            return "Pending";
        }

        if ($col === 1) {
            return "Delivered";
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(new Product);
    }

    public function getCreatedAtMonthAttribute()
    {
        $dateTimeInstance = new \DateTime($this->created_at);
        return strtoupper($dateTimeInstance->format('M'));
    }

    public function getCreatedAtDayAttribute()
    {
        $dateTimeInstance = new \DateTime($this->created_at);
        return $dateTimeInstance->format('d');
    }
}
