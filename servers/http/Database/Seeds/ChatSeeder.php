<?php


use Phinx\Seed\AbstractSeed;

class ChatSeeder extends AbstractSeed
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
        // $faker = Faker\Factory::create();
        $data = [];
        // for ($i = 0; $i < 1; $i++) {
        $data[] = [
            'chat_id' => 1,
            'user_id' => 1,
            'recvr_id' => 2,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $data[] = [
            'chat_id' => 1,
            'user_id' => 2,
            'recvr_id' => 1,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $data[] = [
            'chat_id' => 2,
            'user_id' => 1,
            'recvr_id' => 3,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $data[] = [
            'chat_id' => 2,
            'user_id' => 3,
            'recvr_id' => 1,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $data[] = [
            'chat_id' => 3,
            'user_id' => 1,
            'recvr_id' => 4,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $data[] = [
            'chat_id' => 3,
            'user_id' => 4,
            'recvr_id' => 1,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $data[] = [
            'chat_id' => 4,
            'user_id' => 1,
            'recvr_id' => 5,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $data[] = [
            'chat_id' => 4,
            'user_id' => 5,
            'recvr_id' => 1,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $data[] = [
            'chat_id' => 5,
            'user_id' => 1,
            'recvr_id' => 6,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $data[] = [
            'chat_id' => 5,
            'user_id' => 6,
            'recvr_id' => 1,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $this->table('chats')->insert($data)->save();
    }
}
