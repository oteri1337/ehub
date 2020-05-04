<?php

namespace Server\Database\Models\Traits;

trait UpdatedTrait
{
    public function getUpdatedAtMonthAttribute()
    {
        $dateTimeInstance = new \DateTime($this->updated_at);
        return strtoupper($dateTimeInstance->format('M'));
    }

    public function getUpdatedAtDayAttribute()
    {
        $dateTimeInstance = new \DateTime($this->updated_at);
        return $dateTimeInstance->format('d');
    }
}
