<?php


use Phinx\Seed\AbstractSeed;

class PdfrelSeeder extends AbstractSeed
{
    public function run()
    {
        $data = [];

        for ($j = 1; $j <= 25; $j++) {
            for ($i = 1; $i <= 18; $i++) {
                $data[] =
                    [
                        'pdf_id'    =>  $i,
                        'pdfgroup_id'      => $j,
                        'created_at'    => date('Y-m-d H:i:s'),
                        'updated_at'    => date('Y-m-d H:i:s'),
                    ];
            }
        }

        $this->table('pdf_pdfgroup')->insert($data)->save();
    }
}
