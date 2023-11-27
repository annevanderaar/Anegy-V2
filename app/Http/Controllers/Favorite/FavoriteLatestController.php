<?php

namespace App\Http\Controllers\Favorite;

use App\Http\Controllers\Controller;
use App\Repositories\FavoriteLatestRepository;

class FavoriteLatestController extends Controller
{
    public function __invoke(FavoriteLatestRepository $repository, int $id): mixed
    {
        return $repository->latest($id);
    }
}
