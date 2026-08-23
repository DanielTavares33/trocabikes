<?php

namespace App\Enums;

enum BikeStatus: string
{
    case Active = 'active';
    case Sold = 'sold';
    case Archived = 'archived';
}
