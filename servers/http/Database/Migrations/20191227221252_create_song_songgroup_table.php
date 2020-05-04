<?php 

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateSongSonggroupTable extends ParentMigration {

    public function up() {
        $this->schema->create('song_songgroup', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('song_id');
            $table->integer('songgroup_id');
            $table->timestamps();
        });
    }

    public function down() {
        $this->schema->drop('song_songgroup');
    }
}