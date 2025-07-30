import { useState, useEffect } from 'react';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';

function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/goals')
      .then(res => res.json())
      .then(data => {
        setGoals(data);
        setLoading(false);
      });
  }, []);

  const addGoal = (newGoal) => {
    fetch('http://localhost:3001/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newGoal,
        savedAmount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      })
    })
      .then(res => res.json())
      .then(data => setGoals([...goals, data]));
  };

  const deleteGoal = (id) => {
    fetch(`http://localhost:3001/goals/${id}`, {
      method: 'DELETE'
    })
      .then(() => setGoals(goals.filter(goal => goal.id !== id)));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      <GoalForm onAddGoal={addGoal} />
      <GoalList goals={goals} onDelete={deleteGoal} />
    </div>
  );
}

export default App;