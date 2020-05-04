<?php 

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateSessionsTable extends ParentMigration {

    public function up() {
        $this->schema->create('sessions', function(Blueprint $table) {
            $table->increments('id');
            $table->string("key");
            $table->text("value");
            $table->string("expires");
            $table->timestamps();
        });
    }

    public function down() {
        $this->schema->drop('sessions');
    }
}