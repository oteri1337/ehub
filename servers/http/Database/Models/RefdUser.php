<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Server\Database\Models\Traits\CreatedTrait;

class RefdUser extends Model
{
    use CreatedTrait;

    protected $table = 'users';

    protected $hidden = [
        'password',
        'phone_number',
        'email_token',
        'password_token',
        'photo_front_view',
        'photo_back_view',
        'street_address',
        'post_code',
        'city',
        'state',
        'currency',
        'currency_string',
        'deposit_btc_wallet',
        'deposit_eth_wallet',
        'deposit_btc_wallet_id',
        'deposit_eth_wallet_id',
        'user_id',
        'bitcoin_wallet',
        'ethereum_wallet',
        'cuurrency_string',
        'referral_link',
        'updated_at'
    ];
}
