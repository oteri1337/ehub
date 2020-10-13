<?php


use Phinx\Seed\AbstractSeed;

class TopiccommentSeeder extends AbstractSeed
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

        $images = [
            'boy1.jpg',
            'boy2.jpg',
            'boy3.jpg',
            'girl1.jpg',
            'girl2.jpg'
        ];

        // $faker = Faker\Factory::create();
        $data = [];

        for ($i = 1; $i < 11; $i++) {
            $data[] = [
                'type' => 0,
                'topic_id' => 1,
                'user_id' => rand(1, 20),
                'data' => $images[rand(0, 4)],
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ];
        }

        $this->table('topiccomments')->insert($data)->save();
    }
}
