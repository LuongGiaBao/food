"use client";
import { useState } from "react";

const dishes: string[] = ["Pizza", "Burger", "Sushi", "Pasta", "Salad"];

export default function Home() {
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);

  const handleSelectDish = (dish: string) => {
    if (selectedDishes.includes(dish)) {
      setSelectedDishes(selectedDishes.filter((item) => item !== dish));
    } else {
      setSelectedDishes([...selectedDishes, dish]);
    }
  };

 
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">Select the dishes you want to eat</h1>
      <ul className="mb-4">
        {dishes.map((dish) => (
          <li key={dish}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={dish}
                checked={selectedDishes.includes(dish)}
                onChange={() => handleSelectDish(dish)}
              />
              <span>{dish}</span>
            </label>
          </li>
        ))}
      </ul>
     
    </div>
  );
}
