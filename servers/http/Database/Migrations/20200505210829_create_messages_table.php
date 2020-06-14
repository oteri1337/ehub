<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateMessagesTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('messages', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('chat_id');

            $table->integer('user_id');

            $table->text('message');

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('messages');
    }
}
