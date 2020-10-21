<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreatePdfgroupPdfparentgroupTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('pdfgroup_pdfparentgroup', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('pdfgroup_id');

            $table->integer('pdfparentgroup_id');

            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('pdfgroup_pdfparentgroup');
    }
}
