<?php

namespace App\Http\Controllers;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class PostController extends Controller
{
    public function createPost(Request $request){
        $user = Auth::user();

        $request->validate([
            'image' => 'required',
            'caption' => 'required',
        ]);

        $post = new Post();
        $post->user_id = $user->id;
        
        base64_decode($request->image);
        $image = $request->image;
        $image_name = time().'.'.$request->image->extension();  
        $image->move(public_path('/images'), $image_name);
        $image_url = '/instagram-clone-server/public/images/'.$image_name;
        $post->image_url = $image_url;
        
        $post->caption = $request->caption;

        $post->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Post created successfully',
            'post' => $post,
        ]);
    }

    public function getFeed(){
        $user = Auth::user();
        $posts = Post::whereIn('user_id', $user->following->pluck('id'))->orderBy('created_at', 'desc')->get();

        foreach ($posts as $post){
            $post->is_liked = $post->likes->contains($user->id);
        }

        foreach ($posts as $post){
            $post->username = $post->user->username;
        }

        return response()->json([
            'status' => 'success',
            'posts' => $posts,
        ]);
    }

    public function likePost($post_id){
        $user = Auth::user();
        $post = Post::find($post_id);
        $post->likes()->toggle($user->id);
        if ($post->likes->contains($user->id)){
            $is_liked = true;
            $message = 'Post liked successfully';
        }
        else{
            $is_liked = false;
            $message = 'Post unliked successfully';
        }
        return response()->json([
            'status' => 'success',
            'message' => $message,
        ]);
    }
}
