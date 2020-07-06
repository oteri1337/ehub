<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateTopicCommentsTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('topiccomments', function (Blueprint $table) {

            $table->increments('id');

            $table->integer('topic_id');

            $table->integer('user_id');

            $table->integer('type')->default(0);

            $table->text('message');

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('topiccomments');
    }
}
