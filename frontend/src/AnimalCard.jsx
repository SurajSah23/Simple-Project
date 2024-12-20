import { Trash2 } from 'lucide-react';
import PropTypes from 'prop-types'; // Import PropTypes for validation

export function AnimalCard({ name, emoji, onDelete }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{emoji}</span>
        <span className="text-xl font-medium capitalize">{name}</span>
      </div>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}

// Add PropTypes validation
AnimalCard.propTypes = {
  name: PropTypes.string.isRequired,  // Ensures name is a required string
  emoji: PropTypes.string.isRequired, // Ensures emoji is a required string
  onDelete: PropTypes.func.isRequired, // Ensures onDelete is a required function
};
