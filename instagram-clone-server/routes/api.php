<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;

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

Route::prefix('/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class,'register']);
    Route::post('/logout', [AuthController::class,'logout']);
});

Route::prefix('/user')->group(function () {
    Route::get('/profile', [UserController::class, 'getProfile']);
    Route::get('/{username}', [UserController::class, 'getUserProfile']);
    Route::get('/search/{username}', [UserController::class, 'searchUsers']);
    Route::post('/follow/{user_id}', [UserController::class, 'followUser']);
    Route::post('/unfollow/{user_id}', [UserController::class, 'unfollowUser']);
});

Route::prefix('/posts')->group(function () {
    Route::get('/feed', [PostController::class, 'getFeed']);
    Route::post('/create', [PostController::class, 'createPost']);
    Route::post('/like/{post_id}', [PostController::class, 'likePost']);
});