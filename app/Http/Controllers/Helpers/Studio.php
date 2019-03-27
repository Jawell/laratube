<?php

namespace App\Http\Controllers\Helpers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class Studio extends Controller
{
    static function getChannel($youtube)
    {
        try {
            return $youtube->channels->listChannels('contentDetails', [
                'mine' => true,
                'fields' => 'items/contentDetails/relatedPlaylists/uploads'
            ]);
        } catch (\Google_Service_Exception $exception) {
            return $exception->getMessage();
        }
    }

    static function getVideosUri($channel, $youtube)
    {
        $id = $channel->items[0]->contentDetails->relatedPlaylists->uploads;
        $config = [
            'playlistId' => $id,
            'fields' => 'items(snippet(resourceId/videoId,thumbnails/high/url,title))'
        ];
        try {
            return $youtube->playlistItems->listPlaylistItems('snippet', $config);
        } catch (\Google_Exception $exception) {
            return $exception->getMessage();
        }
    }

    static function videosList($rawList)
    {
        $videos = [];
        foreach ($rawList as $key => $value) {
            $videos[$key]['title'] = $value['snippet']['title'];
            $videos[$key]['thumbnail'] = $value['snippet']['thumbnails']['high']->url;
            $videos[$key]['id'] = $value['snippet']['resourceId']->videoId;
        }

        return $videos;
    }

    static function getVideos($youtube)
    {
        $channel = self::getChannel($youtube);
        $rawList = self::getVideosUri($channel, $youtube);
        return self::videosList($rawList);
    }

    static public function getLatestAccessTokenFromDB()
    {
        $latest = DB::table('youtube_access_tokens')
            ->latest('created_at')
            ->first();
        return $latest ? (is_array($latest) ? $latest['access_token'] : $latest->access_token) : null;
    }

    static public function tagsToArray($tags) {
        return explode(',', $tags);
    }
}
