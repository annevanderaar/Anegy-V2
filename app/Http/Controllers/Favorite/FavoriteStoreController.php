<?php

namespace App\Http\Controllers\Favorite;

use App\Http\Controllers\AbstractController;
use App\Http\Requests\Favorite\FavoriteStoreRequest;
use App\Models\Favorite;
use App\Repositories\FavoriteStoreRepository;

class FavoriteStoreController extends AbstractController
{
    /**
     * @param FavoriteStoreRequest $request
     * @param FavoriteStoreRepository $repository
     * @return Favorite
     */
    public function __invoke(FavoriteStoreRequest $request, FavoriteStoreRepository $repository): Favorite
    {
        return $repository->store($request->all());
    }
}
