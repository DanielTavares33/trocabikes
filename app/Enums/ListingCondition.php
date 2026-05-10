<?php

namespace App\Enums;

enum ListingCondition: string
{
    case New = 'new';
    case Used = 'used';
    case Excellent = 'excellent';
    case Good = 'good';
    case Fair = 'fair';
    case Poor = 'poor';
}
