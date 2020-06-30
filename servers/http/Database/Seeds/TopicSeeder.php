<?php


use Phinx\Seed\AbstractSeed;

class TopicSeeder extends AbstractSeed
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

        $color = ['#2588ed', '#fe653b', '#8299cd', '#00adef'];

        $icon = ["rocket1", "bulb1", "wallet", "videocamera", "team", "car"];

        $faker = Faker\Factory::create();
        $data = [];
        for ($i = 0; $i < 85; $i++) {
            $data[] = [
                'slug' => $faker->slug,
                'title' => $faker->name,
                'content' => $faker->text(1000),
                'color' => $color[rand(0, 3)],
                'icon' => $icon[rand(0, 5)],
                'user_id' => rand(1, 10),
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ];
        }

        $this->table('topics')->insert($data)->save();
    }
}
