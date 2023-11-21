<?php

namespace App\Repositories;

use App\Models\Favorite;
use Throwable;
use DB;

class FavoriteDeleteRepository
{
    /**
     * @param Favorite $favorite
     * @return mixed
     * @throws Throwable
     */
    public function delete(Favorite $favorite): mixed
    {
        return DB::transaction(static function () use ($favorite) {
            return $favorite->deleteOrFail();
        });
    }
}
