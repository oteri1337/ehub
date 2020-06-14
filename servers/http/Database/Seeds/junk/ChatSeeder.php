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
        $data = [];
        // for ($i = 0; $i < 1; $i++) {
        $data[] = [
            'user_id' => 1,
            'recvr_id' => 2,
            'title' => "test chat",
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];
        // }

        $data[] = [
            'user_id' => 3,
            'recvr_id' => 4,
            'title' => "another test chat",
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $data[] = [
            'user_id' => 5,
            'recvr_id' => 6,
            'title' => "rytuy test chat",
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];


        $this->table('chats')->insert($data)->save();
    }
}
