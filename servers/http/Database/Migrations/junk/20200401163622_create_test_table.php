<?php

use Server\Database\Migrations\ParentMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateTestTable extends ParentMigration
{

    public function up()
    {
        $this->schema->create('tests', function (Blueprint $table) {
            $table->increments('id');
            $table->string('test');
            $table->timestamps();
        });
    }

    public function down()
    {
        $this->schema->drop('tests');
    }
}
