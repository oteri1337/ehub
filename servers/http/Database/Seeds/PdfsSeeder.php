<?php


use Phinx\Seed\AbstractSeed;

class PdfsSeeder extends AbstractSeed
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
        $data = [];
        // for ($i = 0; $i < 1; $i++) {
        $data[] = [
            'title' => "Advanced Mathematcis For Applications",
            'slug' => "advanced-mathematics",
            'image_name' => 'sample-book.jpg',
            'file_name' => 'sample-book.pdf',
            'file_size' => 1000000,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];
        // }
        $this->table('pdfs')->insert($data)->save();
    }
}
