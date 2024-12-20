import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  // Fetch tasks from backend
  useEffect(() => {
    axios.get('https://simple-project-api.vercel.app/api/tasks')
      .then((response) => {
        setTasks(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  // Add new task
  const addTask = () => {
    const newTask = { title: task };

    axios.post('https://simple-project-api.vercel.app/api/tasks', newTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setTask('');
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`https://simple-project-api.vercel.app/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((t) => t._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>To-Do List</h1>
      
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ padding: '10px', width: '80%' }}
        />
        <button onClick={addTask} style={{ padding: '10px', marginLeft: '10px' }}>Add Task</button>
      </div>
      
      <ul>
        {tasks.map((t) => (
          <li key={t._id} style={{ margin: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
            <span>{t.title}</span>
            <button onClick={() => deleteTask(t._id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
