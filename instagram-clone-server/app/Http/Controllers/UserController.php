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
        $followers = $user->followers;
        $following = $user->following;
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'posts' => $posts,
            'followers_count' => $followers_count,
            'following_count' => $following_count,
            'followers' => $followers,
            'following' => $following,
        ]);
    }

    public function getUserProfile($username){
        $user = Auth::user();
        $userProfile = User::where('username', $username)->first();
        $followers_count = $userProfile->followers->count();
        $following_count = $userProfile->following->count();
        $is_following = $user->following->contains($userProfile->id);
        if ($is_following){
            $posts = $userProfile->posts()->orderBy('created_at', 'desc')->get();
            return response()->json([
                'status' => 'success',
                'user' => $userProfile,
                'followers_count' => $followers_count,
                'following_count' => $following_count,
                'is_following' => $is_following,
                'posts' => $posts,
            ]);
        }
        else{
            return response()->json([
                'status' => 'error',
                'message' => 'You are not following this user',
                'user_profile' => $userProfile,
                'followers_count' => $followers_count,
                'following_count' => $following_count,
                'is_following' => $is_following,
            ], 403);
        }
    }

    public function searchUsers($username){
        $current_user = Auth::user();
        $users = User::where('username', 'LIKE', "%{$username}%");

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
