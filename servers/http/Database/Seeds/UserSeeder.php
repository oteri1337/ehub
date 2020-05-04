<?php


use Phinx\Seed\AbstractSeed;
use Server\Database\Models\User;

class UserSeeder extends AbstractSeed
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
        // for ($i = 0; $i <= 1; $i++) {
            $data[] = [
                'email' => "test@gmail.com",
                'password' => sha1("password"),
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'mobile_number' => $faker->e164PhoneNumber,
                'department'=>"Petroleum Engineering",
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ];

            User::create($data[0]);
        // }

        // $this->table('users')->insert($data)->save();
    }
}
