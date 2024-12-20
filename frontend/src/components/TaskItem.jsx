import PropTypes from 'prop-types';
import { CheckCircle2, Trash2, XCircle } from 'lucide-react';

export const TaskItem = ({ task, onStatusChange, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex-1">
        <h3 className={`text-lg font-medium ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="mt-1 text-sm text-gray-500">{task.description}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onStatusChange(task._id, task.status === 'completed' ? 'pending' : 'completed')}
          className={`p-1 rounded-full ${
            task.status === 'completed' 
              ? 'text-green-600 hover:text-green-700' 
              : 'text-gray-400 hover:text-gray-500'
          }`}
        >
          {task.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="p-1 text-red-600 hover:text-red-700 rounded-full"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// PropTypes validation
TaskItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.oneOf(['pending', 'completed']).isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
