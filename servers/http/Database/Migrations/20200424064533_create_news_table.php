<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateNewsTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('news', function (Blueprint $table) {
            $table->increments('id');
            $table->string("title");
            $table->string("slug")->unique();
            $table->string("image")->default("image.png");
            $table->text("content");
            $table->text("content_html");
            $table->string("content_short");
            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('news');
    }
}
