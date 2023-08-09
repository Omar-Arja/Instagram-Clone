<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getProfile(){
        $user = Auth::user();
        $posts = Post::where('user_id', $user->id)-> orderBy('created_at', 'desc')-> get();

        $followers_count = $user->followers->count();
        $following_count = $user->following->count();

        $user->following_count = $following_count;
        $user->followers_count = $followers_count;
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'posts' => $posts,
        ]);
    }

    public function getUserProfile($username){
        $user = Auth::user();
        $userProfile = User::where('username', $username)->first();
        $followers_count = $userProfile->followers->count();
        $following_count = $userProfile->following->count();
        $is_following = $user->following->contains($userProfile->id);

        $userProfile->followers_count = $followers_count;
        $userProfile->following_count = $following_count;
        $userProfile->is_following = $is_following;

        if ($is_following){
            $posts = $userProfile->posts()->orderBy('created_at', 'desc')->get();
            return response()->json([
                'status' => 'success',
                'user' => $userProfile,
                'posts' => $posts,
            ]);
        }
        else{
            return response()->json([
                'status' => 'success',
                'message' => 'You are not following this user',
                'user_profile' => $userProfile,
            ], 403);
        }
    }

    public function searchUsers($username){
        $current_user = Auth::user();
        $users = User::where('username', 'LIKE', "%{$username}%")->where('id', '!=', $current_user->id)->get();

        foreach ($users as $user){
            $user->is_following = $user->followers->contains($user->id);
        }

        return response()->json([
            'status' => 'success',
            'users' => $users,
        ]);
    }

    public function followUser($username){
        $user = Auth::user();
        $userProfile = User::where('username', $username)->first();
        $is_following = $user->following->contains($userProfile->id);
        if (!$is_following){
            $user->following()->attach($userProfile->id);
            return response()->json([
                'status' => 'success',
                'message' => 'You are now following this user',
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'You are already following this user',
            ], 403);
        }
    }

    public function unfollowUser($username){
        $user = Auth::user();
        $userProfile = User::where('username', $username)->first();
        $is_following = $user->following->contains($userProfile->id);
        if ($is_following){
            $user->following()->detach($userProfile->id);
            return response()->json([
                'status' => 'success',
                'message' => 'You have unfollowed this user',
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'You are not following this user',
            ], 403);
        }
    }

}
