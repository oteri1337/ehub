<?php 

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateSongsTable extends ParentMigration {

    public function up() {
        $this->schema->create('songs', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('stars')->default(1);
            $table->integer('downloads')->default(0);

            $table->string('by')->nullable();        

            $table->string('title');
            $table->text('description');
            $table->string('slug')->unique();
            $table->string('section')->default('songs');

            $table->string('file_name')->nullable();
            $table->float('file_size',11,2)->default(0);

            $table->string('image_name')->default('default.png');
            $table->integer('image_size')->nullable();

            $table->string('format');

            $table->string('short_title')->nullable();
            $table->string('short_description')->nullable();
            $table->timestamps();
        });
    }

    public function down() {
        $this->schema->drop('songs');
    }
}