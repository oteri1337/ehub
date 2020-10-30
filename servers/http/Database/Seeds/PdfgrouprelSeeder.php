<?php


use Phinx\Seed\AbstractSeed;

class PdfgrouprelSeeder extends AbstractSeed
{

    public function run()
    {

        $data = [];

        $num = 1;

        for ($j = 1; $j <= 5; $j++) {
            for ($i = 1; $i <= 5; $i++) {
                $data[] =
                    [
                        'pdfparentgroup_id'    =>  $j,
                        'pdfgroup_id'      => $num,
                        'created_at'    => date('Y-m-d H:i:s'),
                        'updated_at'    => date('Y-m-d H:i:s'),
                    ];
                $num++;
            }
        }


        $this->table('pdfgroup_pdfparentgroup')->insert($data)->save();
    }
}
