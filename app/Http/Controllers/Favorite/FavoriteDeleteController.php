<?php

namespace App\Http\Controllers\Favorite;

use App\Http\Controllers\AbstractController;
use App\Models\Favorite;
use App\Repositories\FavoriteDeleteRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Throwable;

class FavoriteDeleteController extends AbstractController
{
    /**
     * @param FavoriteDeleteRepository $repository
     * @param Favorite $id
     * @return JsonResponse
     * @throws Throwable
     */
    public function __invoke(FavoriteDeleteRepository $repository, Favorite $id): JsonResponse
    {
        $repository->delete($id);
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
