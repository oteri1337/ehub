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
            'email' => "oteri2021@gmail.com",
            'password' => sha1("password"),
            'first_name' => "Oteri",
            'last_name' => "Avwunudiogba",
            'photo_profile' => "boy1.jpg",
            'verified' => 1,
            'expo_push_token' => 'ExponentPushToken[UmcboSPh62DUU2LLouAmCt]',
            'phone_number' => $faker->e164PhoneNumber,
            'bio' => $faker->text,
            'link' => $faker->url,
            'department' => "Physics",
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $known[] = [
            'email' => "kosohills@gmail.com",
            'password' => "7ce53d858f7cc529a4f4bde3734cf1a04c499361",
            'verified' => 1,
            'first_name' => "Jennifer",
            'last_name' => "Ugwu",
            'photo_profile' => "girl1.jpg",
            'phone_number' => $faker->e164PhoneNumber,
            'bio' => $faker->text,
            'link' => $faker->url,
            'department' => "Petroleum Engineering",
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
            'expo_push_token' => 'ExponentPushToken[2Os-IGCLcG8hRq-FFahk0c]'
        ];

        $known[] = [
            'email' => "kemzo14@gmail.com",
            'password' => "7b4646101d535a9af75f1841d223459136b73f98",
            'verified' => 1,
            'first_name' => "Chukwubuokem",
            'last_name' => "Mordi",
            'photo_profile' => "boy3.jpg",
            'phone_number' => $faker->e164PhoneNumber,
            'bio' => $faker->text,
            'link' => $faker->url,
            'department' => "Marine Engineering",
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
            'expo_push_token' => 'ExponentPushToken[1yQSlEH-rmTwrqxfGlUU9_]'
        ];

        $known[] = [
            'email' => "max@gmail.com",
            'password' => sha1("password"),
            'verified' => 1,
            'first_name' => "Maxwell",
            'last_name' => "Akpati",
            'expo_push_token' => 'ExponentPushToken[Qd3rvHN9jD0r9xBSXubMjK]',
            'photo_profile' => "boy3.jpg",
            'department' => "Pharmacy",
            'phone_number' => $faker->e164PhoneNumber,
            'bio' => $faker->text,
            'link' => $faker->url,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        $this->table('users')->insert($known)->save();

        // User::create($known[0]);
        // User::create($known[1]);
        // User::create($known[2]);

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

        for ($i = 0; $i <= 20; $i++) {
            $data[] = [
                'email' => $faker->email,
                'password' => sha1("password2"),
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'phone_number' => $faker->e164PhoneNumber,
                'department' => $departments[rand(0, 4)],
                'photo_profile' => $images[rand(0, 4)],
                'bio' => $faker->text,
                'link' => $faker->url,
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => date('Y-m-d H:i:s'),
            ];
        }

        $this->table('users')->insert($data)->save();
    }
}
