<?php


use Phinx\Seed\AbstractSeed;

class PdfgrouprelSeeder extends AbstractSeed
{

    public function run()
    {

        $data = [];

        for ($j = 1; $j < 5; $j++) {
            for ($i = 1; $i < 5; $i++) {
                $data[] =
                    [
                        'pdfgroup_id'      => $j,
                        'pdfparentgroup_id'    =>  $i,
                        'created_at'    => date('Y-m-d H:i:s'),
                        'updated_at'    => date('Y-m-d H:i:s'),
                    ];
                // $num++;
            }
        }


        $this->table('pdfgroup_pdfparentgroup')->insert($data)->save();
    }
}
