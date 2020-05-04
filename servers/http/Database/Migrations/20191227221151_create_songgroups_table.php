<?php 

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateSonggroupsTable extends ParentMigration {

    public function up() {
        $this->schema->create('songgroups', function(Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('icon')->default('headset');
            $table->string('group')->default('songs');
            $table->timestamps();
        });
    }

    public function down() {
        $this->schema->drop('songgroups');
    }
}