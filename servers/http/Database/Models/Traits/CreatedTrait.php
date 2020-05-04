<?php

namespace Server\Database\Models\Traits;

trait CreatedTrait
{
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
