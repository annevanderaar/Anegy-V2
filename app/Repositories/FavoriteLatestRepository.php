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
        return Favorite::where('user_id', $id)->latest('created_at')->first();
    }
}
