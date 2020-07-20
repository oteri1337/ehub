<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateChatmessagesTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('chatmessages', function (Blueprint $table) {

            $table->increments('id');

            $table->integer('chat_id');

            $table->integer('user_id');

            $table->integer('type')->default(0);

            $table->text('data');

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('chatmessages');
    }
}
