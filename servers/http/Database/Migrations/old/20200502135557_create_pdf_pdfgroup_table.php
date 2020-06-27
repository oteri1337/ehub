<?php 

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreatePdfPdfgroupTable extends ParentMigration {

    public function up() {
        $this->schema->create('pdf_pdfgroup', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('pdf_id');
            $table->integer('pdfgroup_id');
            $table->timestamps();
        });
    }

    public function down() {
        $this->schema->drop('pdf_pdfgroup');
    }
}