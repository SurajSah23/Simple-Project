import { useState } from 'react';
import { Heart } from 'lucide-react';
import { AddAnimalForm } from './AddAnimalForm';
import { AnimalCard } from './AnimalCard';

function App() {
  const [animals, setAnimals] = useState([]);

  // Function to add an animal to the list
  function handleAddAnimal(name, emoji) {
    const newAnimal = {
      id: Math.random().toString(36).substring(2, 9), // Generate a unique ID
      name,
      emoji,
    };
    setAnimals([newAnimal, ...animals]);
  }

  // Function to delete an animal by ID
  function handleDeleteAnimal(id) {
    setAnimals(animals.filter(animal => animal.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600 flex items-center justify-center gap-2">
            <Heart className="text-pink-500" />
            My Favorite Animals
          </h1>
        </header>

        <div className="grid gap-6">
          {/* Form to add animal */}
          <AddAnimalForm onAdd={handleAddAnimal} />

          {/* Displaying animals */}
          <div className="space-y-4">
            {animals.map((animal) => (
              <AnimalCard
                key={animal.id}
                name={animal.name}
                emoji={animal.emoji}
                onDelete={() => handleDeleteAnimal(animal.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
