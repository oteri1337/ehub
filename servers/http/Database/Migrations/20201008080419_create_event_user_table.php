<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateEventUserTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('event_user', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('event_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('event_user');
    }
}
