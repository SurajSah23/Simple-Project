import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import PropTypes from 'prop-types'; // Import PropTypes for validation

// List of available animal emojis
const ANIMAL_EMOJIS = ['🐶', '🐱', '🐰', '🐨', '🦁', '🐯', '🐮', '🐷', '🦊', '🐸'];

export function AddAnimalForm({ onAdd }) {
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(ANIMAL_EMOJIS[0]);

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      // Calling the onAdd function passed as prop with the name and emoji
      onAdd(name.trim(), selectedEmoji);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Add New Animal</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Pick an emoji:</label>
        <div className="flex flex-wrap gap-2">
          {ANIMAL_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setSelectedEmoji(emoji)}
              className={`text-2xl p-2 rounded-lg ${
                selectedEmoji === emoji ? 'bg-purple-100 ring-2 ring-purple-500' : 'hover:bg-gray-100'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Animal Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter animal name"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 flex items-center justify-center gap-2"
      >
        <PlusCircle size={20} />
        Add Animal
      </button>
    </form>
  );
}

// Add PropTypes validation
AddAnimalForm.propTypes = {
  onAdd: PropTypes.func.isRequired, // Ensures onAdd is a required function
};
