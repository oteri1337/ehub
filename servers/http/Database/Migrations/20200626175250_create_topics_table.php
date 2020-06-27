<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateTopicsTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('topics', function (Blueprint $table) {

            $table->increments('id');

            $table->integer('user_id');

            $table->string("title");

            $table->string("icon")->default("rocket1");

            $table->string("color")->default("#2588ed");

            $table->string("slug")->unique();

            $table->text("content");

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('topics');
    }
}
