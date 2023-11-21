<?php

namespace App\Http\Controllers\TMDB;

use App\Http\Controllers\AbstractController;
use App\Http\Requests\TMDB\DiscoverRequest;

class DiscoverController extends AbstractController
{
    /**
     * @param DiscoverRequest $request
     * @return array
     */
    public function __invoke(DiscoverRequest $request): array
    {
        $response = $this->withHeaders()->get(config('services.tmdb.base-url') .
            $request->get('url') . 'language=' .
            $request->get('language') . '&page=' .
            $request->get('page') .
            '&with_genres=' . $request->get('genres'));

        return $response->json();
    }
}
