<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateTopicUserTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('topic_user', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('topic_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('topic_user');
    }
}
