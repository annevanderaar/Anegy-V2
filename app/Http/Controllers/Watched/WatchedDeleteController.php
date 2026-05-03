<?php

namespace App\Http\Controllers\Watched;

use App\Http\Controllers\AbstractController;
use App\Http\Requests\Watched\WatchedDeleteRequest;
use App\Repositories\WatchedRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Throwable;

class WatchedDeleteController extends AbstractController
{
    /**
     * @param WatchedRepository $repository
     * @param WatchedDeleteRequest $request
     * @return JsonResponse
     * @throws Throwable
     */
    public function __invoke(WatchedRepository $repository, WatchedDeleteRequest $request): JsonResponse
    {
        $repository->delete($request->all());
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
