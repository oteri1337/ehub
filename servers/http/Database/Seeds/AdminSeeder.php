<?php


use Phinx\Seed\AbstractSeed;

class AdminSeeder extends AbstractSeed
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
        // for ($i = 0; $i < 1; $i++) {
        $data[] = [
            'email'         => "admin@ehub.com",
            'password'      => sha1("password"),
            'first_name' => "Jennifer",
            'last_name' => "Ugwu",
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];
        // }

        $this->table('admins')->insert($data)->save();
    }
}
