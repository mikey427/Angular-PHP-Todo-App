<?php

namespace Database\Factories;

use App\Models\Subtask;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubtaskFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Subtask::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
					'name' => $this->faker->name(),
					'isDone' => $this->faker->boolean(),
					'todoId' => $this->faker->numberBetween(0, 4)
        ];
    }
}
