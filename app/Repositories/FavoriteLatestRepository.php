<?php

namespace App\Repositories;

use App\Models\Favorite;
use DB;

class FavoriteLatestRepository
{
    /**
     * @param int $id
     * @return mixed
     */
    public function latest(int $id): mixed
    {
        return DB::transaction(static function () use ($id) {
            return Favorite::where('user_id', $id)->latest('created_at')->first();
        });
    }
}
