<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateCommentsTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('comments', function (Blueprint $table) {

            $table->increments('id');

            $table->integer('topic_id');

            $table->integer('user_id');

            $table->text('message');

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('comments');
    }
}
