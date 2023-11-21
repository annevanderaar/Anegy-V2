<?php

namespace App\Http\Controllers\TMDB;

use App\Http\Controllers\AbstractController;
use App\Http\Requests\TMDB\DetailsRequest;

class DetailsController extends AbstractController
{
    /**
     * @param DetailsRequest $request
     * @return array|mixed
     */
    public function __invoke(DetailsRequest $request): mixed
    {
        $response = $this->withHeaders()->get(config('services.tmdb.base-url') . $request->get('url') .  '?language=' . $request->get('language'));

        return $response->json();
    }
}
