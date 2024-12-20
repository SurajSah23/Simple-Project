import { useEffect, useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';
import { getTasks, createTask, updateTask, deleteTask } from './api/tasks';
import { ClipboardList } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (title, description) => {
    try {
      const newTask = await createTask({ title, description, status: 'pending' });
      setTasks([newTask, ...tasks]);
    } catch {
      setError('Failed to create task');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const updatedTask = await updateTask(id, { status });
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
    } catch {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <ClipboardList className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <p className="mt-2 text-gray-600">Manage your tasks efficiently</p>
        </div>

        <TaskForm onSubmit={handleCreateTask} />

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-4">
          {loading ? (
            <div className="text-center text-gray-600">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center text-gray-600">No tasks yet. Create one above!</div>
          ) : (
            tasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
