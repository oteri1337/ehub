<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreatePdfparentgroupsTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('pdfparentgroups', function (Blueprint $table) {
            $table->increments('id');

            $table->string('title');

            $table->string('slug')->unique();

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('pdfparentgroups');
    }
}
