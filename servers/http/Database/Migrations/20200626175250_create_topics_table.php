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

            $table->string("slug")->unique();

            $table->string("next_page_url")->default("");

            $table->text("data");

            $table->string("icon")->default("rocket1");

            $table->string("color")->default("#2588ed");

            $table->integer('comments_count')->default(0);

            $table->boolean('allow_comments')->default(1);

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('topics');
    }
}
