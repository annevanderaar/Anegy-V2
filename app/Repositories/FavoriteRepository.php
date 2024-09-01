<?php

namespace App\Repositories;

use App\Models\Favorite;
use Illuminate\Support\Facades\DB;

class FavoriteRepository
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

    /**
     * @param int $id
     * @return mixed
     */
    public function latest(int $id): mixed
    {
        return Favorite::where('user_id', $id)->latest('created_at')->first();
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function all(int $id): mixed
    {
        return Favorite::where('user_id', $id)->orderBy('created_at', 'desc')->get();
    }
}
