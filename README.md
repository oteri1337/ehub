# Todos

# done similar

image caching chat

complete sub categories pdfs

notification takes you to page in app for forum and events

improve login page on small devices

# other phone

unread messages forum

group notifications on android

clear notifications after view

# Image Caching

resize uploaded pdf and profile images

get image caching to work properly

refactor cached image and cached thumbnail

# Future

Google Play Registration

Dark Mode

integrate hermes - ehub lite

more control of the forum

# Push Notifications Tool

https://expo.io/notifications

# Project Setup

Open client_expo/env.js

Basically you have to configure this file to work on your environment

Make sure php is installed and added to your environment [how-to-add-your-php-to-your-windows-10-path-environment-variables](https://www.forevolve.com/en/articles/2016/10/27/how-to-add-your-php-runtime-directory-to-your-windows-10-path-environment-variable/)

Make sure php-gmp extension in installed [https://www.php.net/manual/en/install.pecl.windows.phphttps://www.php.net/manual/en/install.pecl.windows.php](https://www.php.net/manual/en/install.pecl.windows.php)

Make sure composer is installed and added to your environment [https://getcomposer.org/](https://getcomposer.org/)

Run

`composer install`

You also have to configure the database in .env file and run the migrations using phinx

Okay now run this command in your public_html folder

`php -S 0.0.0.0:1025`

Then go to localhost:1025 on your browser and check if it loads

Connect your android device or emulator and go to 10.0.2.2:1025 and check if it loads

if everything is working congratulations, branch of and start coding.
