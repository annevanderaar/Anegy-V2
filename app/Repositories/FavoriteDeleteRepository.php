<?php

namespace App\Repositories;

use App\Models\Favorite;
use Throwable;
use DB;

class FavoriteDeleteRepository
{
    /**
     * @param array $data
     * @return mixed
     */
    public function delete(array $data): mixed
    {
        return DB::transaction(static function () use ($data) {
            return Favorite::where('user_id', '=', $data['user_id'])->where('ms_id', '=', $data['ms_id'])->firstOrFail()->delete();
        });
    }
}
