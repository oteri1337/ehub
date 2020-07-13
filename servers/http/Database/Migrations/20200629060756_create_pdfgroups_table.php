<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreatePdfgroupsTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('pdfgroups', function (Blueprint $table) {

            $table->increments('id');

            $table->string('title');

            $table->string('slug')->unique();

            $table->integer('books_count')->nullable();

            $table->string("next_page_url")->default("");

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('pdfgroups');
    }
}
