<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('users', function (Blueprint $table) {

            $table->increments('id');

            $table->string('expo_push_token')->default("");

            $table->string('email')->unique();

            $table->string('password');

            $table->string('first_name');

            $table->string('last_name');

            $table->string('department');

            $table->string('phone_number')->default("");

            $table->string('nse_number')->default("");

            $table->string('link')->default("");

            $table->integer('pin')->nullable();

            $table->boolean('verified')->default(0);

            $table->string('photo_profile')->default("human.png");

            $table->string('bio')->default("");

            $table->string('topics_count')->default(0);

            $table->string('next_page_url')->default("");


            $table->text('web_push_token')->default("");

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('users');
    }
}
