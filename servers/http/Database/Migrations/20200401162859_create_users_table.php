<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('users', function (Blueprint $table) {

            $table->increments('id');

            // auth
            $table->string('email')->unique();

            $table->string('password');

            $table->string('first_name');

            $table->string('last_name');

            $table->string('department');

            $table->string('bio')->default("");

            $table->string('link')->default("");

            $table->string('phone_number')->nullable();

            $table->integer('pin')->nullable();

            $table->boolean('verified')->default(0);

            $table->text('push_subscription')->nullable();

            $table->string('photo_profile')->default("human.png");


            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('users');
    }
}
