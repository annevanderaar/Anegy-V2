<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

class AbstractController extends Controller
{
    /**
     * @return PendingRequest
     */
    public function withHeaders (): PendingRequest
    {
        return Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.tmdb.token'),
            'accept' => 'application/json',
        ]);
    }
}
