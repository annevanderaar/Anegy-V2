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
            '&with_genres=' . $request->get('genres') .
            '&vote_average.gte=' . $request->get('rating')[0] . '&vote_average.lte=' . $request->get('rating')[1]
        );

        return $response->json();
    }
}
