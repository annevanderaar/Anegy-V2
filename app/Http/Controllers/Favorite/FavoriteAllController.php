<?php

namespace App\Http\Controllers\Favorite;

use App\Http\Controllers\Controller;
use App\Repositories\FavoriteAllRepository;

class FavoriteAllController extends Controller
{
    /**
     * @param FavoriteAllRepository $repository
     * @param int $id
     * @return mixed
     */
    public function __invoke(FavoriteAllRepository $repository, int $id): mixed
    {
        return $repository->all($id);
    }
}
