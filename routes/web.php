<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Auth::routes();

Route::get('/authuser', [HomeController::class, 'authuser'])->name('authuser');
Route::get('/users', [HomeController::class, 'users'])->name('users');
Route::post("/sendmessage", [HomeController::class, 'sendmessage'])->name('sendmessage');
Route::get('/chatapi/{sendbyid}/{receivebyid}', [HomeController::class, 'chat'])->name('chat');
Route::get('/{path?}/{id}', [HomeController::class, 'index'])->name('home');
Route::get('/{path?}', [HomeController::class, 'index'])->name('home');
