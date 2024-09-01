<?php

namespace App\Http\Controllers\Favorite;

use App\Http\Controllers\Controller;
use App\Repositories\FavoriteRepository;

class FavoriteAllController extends Controller
{
    /**
     * @param FavoriteRepository $repository
     * @param int $id
     * @return mixed
     */
    public function __invoke(FavoriteRepository $repository, int $id): mixed
    {
        return $repository->all($id);
    }
}
