<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Helpers\Studio as Helper;
use Closure;

class YoutubeAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Helper::getLatestAccessTokenFromDB()) {
            return $next($request);
        } else {
            return redirect('/youtube/auth');
        }
    }
}
