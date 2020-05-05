<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreatePdfGroupsTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('pdfgroups', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('slug')->unique();
            $table->timestamps();
            $table->integer('pdfs_count')->nullable();
            $table->string('pdfs')->default("");
        });
    }

    public function down()
    {
        $this->schema->drop('pdfgroups');
    }
}
