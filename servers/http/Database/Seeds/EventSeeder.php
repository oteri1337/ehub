<?php


use Phinx\Seed\AbstractSeed;

class EventSeeder extends AbstractSeed
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
        for ($i = 1; $i < 12; $i++) {
            $data[] = [
                'slug' => $faker->slug,
                'title' => $faker->name,
                'content' => $faker->text(1000),
                'image' => 'event' . $i . '.jpg',
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ];
        }

        $this->table('events')->insert($data)->save();
    }
}
