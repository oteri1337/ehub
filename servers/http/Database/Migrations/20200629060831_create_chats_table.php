<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateChatsTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('chats', function (Blueprint $table) {

            $table->increments('id');

            $table->integer('chat_id');

            $table->integer('user_id');

            $table->integer('recvr_id');

            $table->integer('comments_count')->default(0);

            $table->string('next_page_url')->default("");

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('chats');
    }
}
