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

        $known[] = [
            'email' => "test@gmail.com",
            'password' => sha1("password"),
            'first_name' => "Oteri",
            'last_name' => "Avwunudiogba",
            'photo_profile' => "boy1.jpg",
            'mobile_number' => $faker->e164PhoneNumber,
            'department' => "Physics",
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        User::create($known[0]);

        $departments = [
            'Petroleum Engineering',
            'Mechanical Engineering',
            'Marine Engineering',
            'Electrical Engineering',
            'Chemical Enginering'
        ];

        $images = [
            'boy1.jpg',
            'boy2.jpg',
            'boy3.jpg',
            'girl1.jpg',
            'girl2.jpg'
        ];

        $data = [];

        for ($i = 0; $i <= 85; $i++) {
            $data[] = [
                'email' => $faker->email,
                'password' => sha1("password2"),
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'mobile_number' => $faker->e164PhoneNumber,
                'department' => $departments[rand(0, 4)],
                'photo_profile' => $images[rand(0, 4)],
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ];
        }

        $this->table('users')->insert($data)->save();
    }
}
