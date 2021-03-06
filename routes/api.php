<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/videos', 'Studio@list');
Route::get('/videos/{pageToken}', 'Studio@list');
Route::post('/upload', 'Studio@upload');
Route::delete('/delete/{id}', 'Studio@delete');
Route::patch('/edit', 'Studio@edit');