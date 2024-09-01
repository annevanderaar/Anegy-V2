<?php

namespace App\Repositories;

use App\Models\Watched;
use Illuminate\Support\Facades\DB;

class WatchedRepository
{
    /**
     * @param array $data
     * @return Watched
     */
    public function store(array $data): Watched
    {
        return DB::transaction(static function () use ($data) {
            return Watched::create($data);
        });
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function delete(array $data): mixed
    {
        return DB::transaction(static function () use ($data) {
            return Watched::where('user_id', '=', $data['user_id'])->where('ms_id', '=', $data['ms_id'])->firstOrFail()->delete();
        });
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function latest(int $id): mixed
    {
        return Watched::where('user_id', $id)->latest('created_at')->first();
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function all(int $id): mixed
    {
        return Watched::where('user_id', $id)->orderBy('created_at', 'desc')->get();
    }
}
