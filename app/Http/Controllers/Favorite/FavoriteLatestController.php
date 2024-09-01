<?php

namespace App\Http\Controllers\Favorite;

use App\Http\Controllers\Controller;
use App\Repositories\FavoriteRepository;

class FavoriteLatestController extends Controller
{
    /**
     * @param FavoriteRepository $repository
     * @param int $id
     * @return mixed
     */
    public function __invoke(FavoriteRepository $repository, int $id): mixed
    {
        return $repository->latest($id);
    }
}
