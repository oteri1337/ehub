<?php


use Phinx\Seed\AbstractSeed;

class ChatmessageSeeder extends AbstractSeed
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
        for ($i = 0; $i < 35; $i++) {
            $data[] = [
                'chat_id' => rand(1, 6),
                'user_id' => rand(1, 6),
                'data' => $faker->text,
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ];
        }

        $this->table('chatmessages')->insert($data)->save();
    }
}
