<?php

namespace App\Enums;

enum ListingStatus: string
{
    case Active = 'active';
    case Sold = 'sold';
    case Archived = 'archived';
}
