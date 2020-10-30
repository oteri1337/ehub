<?php


use Phinx\Seed\AbstractSeed;

class PdfparentgroupsSeeder extends AbstractSeed
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

        $data = [
            [
                'title'         => "Marine Engineering",
                'slug'      => "mar",
                'icon' => 'anchor',
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ],
            [
                'title'         => "Chemical Engineering",
                'slug'      => "chem",
                'icon' => "droplet",
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ],
            [
                'title'         => "Electrical Engineering",
                'icon' => 'cpu',
                'slug'      => "elect",
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ],
            [
                'title'         => "Petroleum Engineering",
                'slug'      => "pet",
                'icon' => 'thermometer',
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ],
            [
                'title'         => "Mechanical Engineering",
                'slug'      => "mech",
                'icon'  => 'settings',
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ]
        ];

        $this->table('pdfparentgroups')->insert($data)->save();
    }
}
