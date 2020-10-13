# main stuff

notification takes you to page in app

group notifications on android

schedule notification for event

reduce message chat to avoid

add percentage donwloaded pdf read page

improve ux pdf upload - percentage, view image

optimistic image and document send

page numbers scrolling

sub cateories for books

set time zone from php

clear notifications after view

cache image pdf group page

cache image pdf read page

refresh chat list alot

move books to last tab search page

fix github vunlerabilites

start chat optimistic

unsubscribe from notifications when logout

forum notifications -- NEEDS TESTING

event notifications -- NEEDS TESTING

block chat notifications -- NEEDS TESTING

resize uploaded pdf and profile images

unread messages forum

set allow comments when creating topics

more control of the forum

failed request reconcilation

refactor admin panel - request fetching errors and message

new screenshots - singup and password

Google Play Registration

zoomable fullscreen images

Dark Mode

integrate hermes

# Animations

profile image animations

message animations chat

image animations chat

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
