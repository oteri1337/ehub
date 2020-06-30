<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateChatUserTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('chat_user', function (Blueprint $table) {

            $table->increments('id');

            $table->integer('chat_id');

            $table->integer('user_id');

            $table->integer('recvr_id');

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('chat_user');
    }
}
