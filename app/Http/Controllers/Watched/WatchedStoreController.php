<?php

namespace App\Http\Controllers\Watched;

use App\Http\Controllers\AbstractController;
use App\Http\Requests\Watched\WatchedStoreRequest;
use App\Models\Watched;
use App\Repositories\WatchedRepository;

class WatchedStoreController extends AbstractController
{
    /**
     * @param WatchedStoreRequest $request
     * @param WatchedRepository $repository
     * @return Watched
     */
    public function __invoke(WatchedStoreRequest $request, WatchedRepository $repository): Watched
    {
        return $repository->store($request->all());
    }
}
