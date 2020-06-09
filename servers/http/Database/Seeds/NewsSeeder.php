<?php


use Phinx\Seed\AbstractSeed;

class NewsSeeder extends AbstractSeed
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
        for ($i = 0; $i < 85; $i++) {
            $data[] = [
                'slug' => $faker->slug,
                'title' => $faker->name,
                'content' => $faker->text,
                'content_html' => $faker->randomHtml(2, 3),
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ];
        }

        $this->table('news')->insert($data)->save();
    }
}
