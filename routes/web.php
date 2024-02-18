<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
    Homepage
*/
Route::get('/', function () {
    return Inertia::render('Homepage');
})->name('home');

/*
    Person routes
*/
Route::get('people/{id}', function () {
    return Inertia::render('Person');
})->name('person.details');

/*
    Generator routes
*/
Route::get('generator', function () {
    return Inertia::render('Generator');
})->name('generator');

/*
    Movies routes
*/
Route::get('movies/details/{id}', function () {
    return Inertia::render('Details');
})->name('movies.details');

Route::get('movies/discover', function () {
    return Inertia::render('Discover');
})->name('movies.discover');

Route::get('movies/trending', function () {
    return Inertia::render('Discover');
})->name('movies.trending');

Route::get('movies/popular', function () {
    return Inertia::render('Discover');
})->name('movies.popular');

Route::get('movies/playing', function () {
    return Inertia::render('Discover');
})->name('movies.playing');

Route::get('movies/top-rated', function () {
    return Inertia::render('Discover');
})->name('movies.top-rated');

Route::get('movies/upcoming', function () {
    return Inertia::render('Discover');
})->name('movies.upcoming');

/*
    Series routes
*/
Route::get('series/details/{id}', function () {
    return Inertia::render('Details');
})->name('series.details');

Route::get('series/discover', function () {
    return Inertia::render('Discover');
})->name('series.discover');

Route::get('series/trending', function () {
    return Inertia::render('Discover');
})->name('series.trending');

Route::get('series/popular', function () {
    return Inertia::render('Discover');
})->name('series.popular');

Route::get('series/playing', function () {
    return Inertia::render('Discover');
})->name('series.playing');

Route::get('series/top-rated', function () {
    return Inertia::render('Discover');
})->name('series.top-rated');

Route::get('series/upcoming', function () {
    return Inertia::render('Discover');
})->name('series.upcoming');

/*
    Dashboard
*/
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/*
    Auth routes
*/
Route::middleware('auth')->group(function () {
    Route::get('/favorites', function () {
        return Inertia::render('Favorites');
    })->name('favorites');

    Route::prefix('profile')->group(static function () {
        Route::get('', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__ . '/auth.php';
