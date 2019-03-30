# LaraTube
Light Youtube video manager working on Larave and React
  - *Light*
  - *Fancy*
  - *Magic*

# Configuration
## Apache
Configure virtual host DocumentRoot to **public** directory of project, set **AllowOverride all** and **Require all granted**. Set necessary permissions for virtual host directory.   
Dont forget about **LimitRequestBody** for virtual host configuration for increase max data uploading.

## PHP
Change **upload_max_filesize** for upload large files

## .env
Fill ID and Secret of YouTube API in .env file  
```GOOGLE_CLIENT_ID=ID```  
```GOOGLE_CLIENT_SECRET=SECRET```

# Deploying
For production version and compile project use

    $ npm run-script prod
    
Do migration

    $ php artisan migrate
    

If you use MySQL < v5.7.7 add to
```/app/Providers/AppServiceProvider.php```

```
public function boot()
{
    Schema::defaultStringLength(191);
}
```

# Using packages
  - Composer
    - [barryvdh/laravel-ide-helper](https://github.com/barryvdh/laravel-ide-helper)
    - [dawson/youtube](https://github.com/JoeDawson/youtube)
  - NPM
    - [axios](https://www.npmjs.com/package/axios)
    - [react-toastify](https://www.npmjs.com/package/react-toastify/v/1.4.3)
    - [react-router-dom](https://www.npmjs.com/package/react-router-dom)
    - [react-modal](https://www.npmjs.com/package/react-modal)

# Using application
When you first visit the main page will happen redirect to Authorization in Youtube. If you need to log in to another application that uses other API keys, click on the authorization button on the main page.

  -```Delete``` - For delete video just click delete button  
  -```Upload``` - For upload video click to "+" button in the upper left corner  
  -```Edit``` - For edit title place the cursor on title of video and click to Edit button  