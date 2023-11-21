<?php

namespace App\Repositories;

use App\Models\Favorite;
use DB;

class FavoriteAllRepository
{
    /**
     * @param int $id
     * @return mixed
     */
    public function all(int $id): mixed
    {
        return DB::transaction(static function () use ($id) {
            return Favorite::where('user_id', $id)->get();
        });
    }
}
