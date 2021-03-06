<?php

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

Route::group([
    'middleware' => 'youtube.auth',
], function ($router) {
    Route::get('/', function () {
        return view('index');
    });
});
Route::get('/{any}', function ($any) {
    return view('index');
})->where('any', '.*');
