<?php


use Phinx\Seed\AbstractSeed;

class CommentSeeder extends AbstractSeed
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
                'topic_id' => 1,
                'user_id' => rand(1, 20),
                'message' => $faker->text,
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ];
        }

        $this->table('comments')->insert($data)->save();
    }
}
