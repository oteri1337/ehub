<?php


use Phinx\Seed\AbstractSeed;

class PdfrelSeeder extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * http://docs.phinx.org/en/latest/seeding.html
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        // $data = [
        //     [
        //         'pdf_id'         => 1,
        //         'pdfgroup_id'      => 1,
        //         'created_at'    => date('Y-m-d H:i:s'),
        //         'updated_at'    => date('Y-m-d H:i:s'),
        //     ],
        // ];

        $data = [];
        $num = 1;

        for ($j = 1; $j <= 5; $j++) {
            for ($i = 1; $i <= 18; $i++) {
                $data[] =
                    [
                        'pdf_id'    =>  $i,
                        'pdfgroup_id'      => $j,
                        'created_at'    => date('Y-m-d H:i:s'),
                        'updated_at'    => date('Y-m-d H:i:s'),
                    ];
                // $num++;
            }
        }


        $this->table('pdf_pdfgroup')->insert($data)->save();
    }
}
