
import { useState, useEffect, useMemo } from 'react';
import GoalList   from './components/GoalList';
import GoalForm   from './components/GoalForm';
import DepositForm from './components/DepositForm';  

function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [depositTarget, setDepositTarget] = useState(null); 

  const API_URL = `${import.meta.env.VITE_BACKEND_URL}/goals`;

  
  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(setGoals)
      .catch(e => {
        console.error(e);
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  /* add ------------------------------------------------------------------- */
  const addGoal = async (data) => {
    const goal = { ...data, savedAmount: 0, createdAt: new Date().toISOString().split('T')[0] };
    const res  = await fetch(API_URL, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(goal)
    });
    const saved = await res.json();
    setGoals(prev => [...prev, saved]);
  };

  /* delete ---------------------------------------------------------------- */
  const deleteGoal = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  /* deposit --------------------------------------------------------------- */
  const handleDeposit = async (goalId, amount) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;

    const updated = { ...goal, savedAmount: goal.savedAmount + amount };
    const res = await fetch(`${API_URL}/${goalId}`, {
      method : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(updated)
    });
    const saved = await res.json();
    setGoals(prev => prev.map(g => (g.id === saved.id ? saved : g)));
    setDepositTarget(null);           // close inline panel
  };

  /* sort goals (active first) -------------------------------------------- */
  const sortedGoals = useMemo(() => {
    return [...goals].sort((a, b) => {
      const aDone = a.savedAmount >= a.targetAmount;
      const bDone = b.savedAmount >= b.targetAmount;
      if (aDone && !bDone) return 1;
      if (!aDone && bDone) return -1;
      return new Date(a.deadline) - new Date(b.deadline);
    });
  }, [goals]);

  /* ----------------------------------------------------------------------- */
  if (loading) return <div className="loading">Loading…</div>;
  if (error)   return <div className="error">{error}</div>;

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>

      <GoalForm onAddGoal={addGoal} />

      {depositTarget && (
        <div className="deposit-panel">
          <DepositForm
            goal={depositTarget}
            onSubmit={handleDeposit}
            onCancel={() => setDepositTarget(null)}
          />
        </div>
      )}

      <GoalList
        goals={sortedGoals}
        onDeposit={setDepositTarget}   // open panel for this goal
        onDelete={deleteGoal}
      />
    </div>
  );
}

export default App;