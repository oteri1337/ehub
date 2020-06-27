<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreatePdfsTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('pdfs', function (Blueprint $table) {
            $table->increments('id');

            $table->string('title');
            $table->string('slug')->unique();
            $table->string('image_name')->default('image.png');
            $table->string('file_name')->nullable();
            $table->float('file_size', 11, 2)->default(0);
            $table->text('description')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('pdfs');
    }
}
