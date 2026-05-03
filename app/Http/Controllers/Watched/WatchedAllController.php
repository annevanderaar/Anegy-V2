<?php

namespace App\Http\Controllers\Watched;

use App\Http\Controllers\Controller;
use App\Repositories\WatchedRepository;

class WatchedAllController extends Controller
{
    /**
     * @param WatchedRepository $repository
     * @param int $id
     * @return mixed
     */
    public function __invoke(WatchedRepository $repository, int $id): mixed
    {
        return $repository->all($id);
    }
}
