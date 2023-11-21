<?php

namespace App\Http\Controllers\TMDB;

use App\Http\Controllers\AbstractController;
use App\Http\Requests\TMDB\SearchRequest;

class SearchController extends AbstractController
{
    /**
     * @param SearchRequest $request
     * @return array|mixed
     */
    public function __invoke(SearchRequest $request): mixed
    {
        $response = $this->withHeaders()->get(config('services.tmdb.base-url') .
            $request->get('url') . '&query=' .
            $request->get('query') . '&page=' .
            $request->get('page'));

        return $response->json();
    }
}
