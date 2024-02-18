<?php

namespace App\Http\Controllers\TMDB;

use App\Http\Controllers\AbstractController;
use App\Http\Requests\TMDB\GeneratorRequest;

class GeneratorController extends AbstractController
{
    public function __invoke(GeneratorRequest $request): array
    {
        $decadeUrl = '';
        if (str_contains($request->get('url'), 'tv') && !empty($request->get('decade'))) {
            $decadeUrl = '&first_air_date.gte='. $request->get('decade')['gte'] . '&first_air_date.lte' . $request->get('decade')['lte'];
        } else if (str_contains($request->get('url'), 'movie') && !empty($request->get('decade'))) {
            $decadeUrl = '&primary_release_date.gte='. $request->get('decade')['gte'] . '&primary_release_date.lte' . $request->get('decade')['lte'];
        }

        $response = $this->withHeaders()->get(config('services.tmdb.base-url') .
            $request->get('url') .
            'language=' . $request->get('language') .
            '&page=' . $request->get('page') .
            '&with_genres=' . $request->get('genre') .
            '&with_runtime.gte=0' . '&with_runtime.lte=' . $request->get('runtime') .
            '&vote_average.gte=' . $request->get('rating')[0] . '&vote_average.lte=' . $request->get('rating')[1] .
            $decadeUrl
        );

        return $response->json();
    }
}
