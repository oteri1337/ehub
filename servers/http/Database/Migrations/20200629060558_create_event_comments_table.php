<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateEventCommentsTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('eventcomments', function (Blueprint $table) {

            $table->increments('id');

            $table->integer('event_id');

            $table->integer('user_id');

            $table->text('message');

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('eventcomments');
    }
}