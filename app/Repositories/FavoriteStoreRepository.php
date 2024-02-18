<?php

namespace App\Repositories;

use App\Models\Favorite;
use Illuminate\Support\Facades\DB;

class FavoriteStoreRepository
{
    /**
     * @param array $data
     * @return Favorite
     */
    public function store(array $data): Favorite
    {
        return DB::transaction(static function () use ($data) {
            return Favorite::create($data);
        });
    }
}
