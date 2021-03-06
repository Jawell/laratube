<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Google_Service_YouTube;
use Google_Client;
use Dawson\Youtube\Facades\Youtube;
use App\Http\Middleware\YoutubeAuth;
use App\Http\Controllers\Helpers\Studio as Helper;

class Studio extends Controller
{
    private $client;
    private $youtube;

    function __construct()
    {
        $OAUTH2_CLIENT_ID = env('GOOGLE_CLIENT_ID', null);
        $OAUTH2_CLIENT_SECRET = env('GOOGLE_CLIENT_SECRET', null);
        $scope = [
            'https://www.googleapis.com/auth/youtube',
            'https://www.googleapis.com/auth/youtube.upload',
            'https://www.googleapis.com/auth/youtube.readonly'
        ];

        $this->client = new Google_Client();
        $this->client->setClientId($OAUTH2_CLIENT_ID);
        $this->client->setClientSecret($OAUTH2_CLIENT_SECRET);
        $this->client->setScopes($scope);

        if ($accessToken = Helper::getLatestAccessTokenFromDB()) {
            $this->client->setAccessToken($accessToken);
        }

        $this->youtube = new Google_Service_YouTube($this->client);
    }

    function list($pageToken = '')
    {
        return Helper::getVideos($this->youtube, $pageToken);
    }

    function upload(Request $request)
    {
        Youtube::upload($request->file('video')->getPathName(), [
            'title'       => $request->input('title'),
            'description' => $request->input('descr'),
            'tags'	      => Helper::tagsToArray($request->input('tags')),
            'category_id' => $request->input('category')
        ], $request->input('privacy'));

        return response()->json('', 204);
    }

    function edit(Request $request) {
        Youtube::update($request->input('id'), [
            'title' => $request->input('title'),
            'category_id' => $request->input('category')
        ], $request->input('privacy'));

        return response()->json('', 204);
    }

    function delete($id)
    {
        Youtube::delete($id);
        return response()->json('', 204);
    }
}
