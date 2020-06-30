<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateChatsTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('chats', function (Blueprint $table) {

            $table->increments('id');

            $table->integer('user_id');

            $table->integer('recvr_id');

            $table->string('title')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('chats');
    }
}