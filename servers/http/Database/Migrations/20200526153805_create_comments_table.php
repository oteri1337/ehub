<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateCommentsTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('comments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('topic_id');
            $table->string('user_name')->nullable();
            $table->text('content');
            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('comments');
    }
}
