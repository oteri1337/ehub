<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateEventsTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('events', function (Blueprint $table) {

            $table->increments('id');

            $table->string("title");

            $table->string("image");

            $table->text("content");

            $table->boolean("type")->default(0);

            $table->string("date")->default("");

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('events');
    }
}
