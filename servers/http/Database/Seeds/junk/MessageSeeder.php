<?php


use Phinx\Seed\AbstractSeed;

class MessageSeeder extends AbstractSeed
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
            'chat_id' => 1,
            'user_id' => 1,
            'message' => "afa",
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];
        // }

        $data[] = [
            'chat_id' => 1,
            'user_id' => 2,
            'message' => "i dey o bros, how u?",
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $this->table('messages')->insert($data)->save();
    }
}
