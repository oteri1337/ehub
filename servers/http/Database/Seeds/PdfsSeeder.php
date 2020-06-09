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
        $faker = Faker\Factory::create();
        $data = [];
        for ($i = 1; $i < 20; $i++) {
            $data[] = [
                'slug' => $faker->email,
                'title' => $faker->firstName . " " . $faker->lastName,
                'description' => $faker->text(1000),
                'image_name' => 'book' . $i . '.jpg',
                'file_name' => 'sample-book.pdf',
                'file_size' => 1000000,
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ];
        }
        $this->table('pdfs')->insert($data)->save();
    }
}
