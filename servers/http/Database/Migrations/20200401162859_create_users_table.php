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

            $table->string('photo_profile')->default("human.png");
            $table->string('mobile_number')->unique()->nullable();

            $table->boolean('verified')->default(0);
            $table->integer('pin')->nullable();
            $table->text('push_subscription')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('users');
    }
}
