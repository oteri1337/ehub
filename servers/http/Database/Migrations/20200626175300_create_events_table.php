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

            $table->string("slug");

            $table->text("data");

            $table->string("image")->default("event.jpg");

            $table->boolean("type")->default(1);

            $table->string("date")->default("");

            $table->string("timestamp")->default("");

            $table->string("time_left")->default("");

            $table->integer('comments_count')->nullable();

            $table->string("next_page_url")->default("");

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('events');
    }
}
