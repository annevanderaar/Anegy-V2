<?php

namespace App\Http\Controllers\Favorite;

use App\Http\Controllers\AbstractController;
use App\Http\Requests\Favorite\FavoriteDeleteRequest;
use App\Repositories\FavoriteDeleteRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Throwable;

class FavoriteDeleteController extends AbstractController
{
    /**
     * @param FavoriteDeleteRepository $repository
     * @param FavoriteDeleteRequest $request
     * @return JsonResponse
     * @throws Throwable
     */
    public function __invoke(FavoriteDeleteRepository $repository, FavoriteDeleteRequest $request): JsonResponse
    {
        $repository->delete($request->all());
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
