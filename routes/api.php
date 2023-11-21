<?php

use App\Http\Controllers\Favorite\FavoriteDeleteController;
use App\Http\Controllers\Favorite\FavoriteStoreController;
use App\Http\Controllers\TMDB\DetailsController;
use App\Http\Controllers\TMDB\DiscoverController;
use App\Http\Controllers\TMDB\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('discover')->group(static function () {
    Route::post('', DiscoverController::class)->name('api.discover');
});

Route::prefix('details')->group(static function () {
    Route::post('', DetailsController::class)->name('api.details');
});

Route::prefix('search')->group(static function () {
    Route::post('', SearchController::class)->name('api.search');
});

Route::prefix('favorites')->group(static function () {
    Route::post('', FavoriteStoreController::class)->name('api.favorites.store');
    Route::delete('', FavoriteDeleteController::class)->name('api.favorites.delete');
});
