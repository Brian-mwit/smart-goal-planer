import { useState } from 'react';

const categories = [
  'Travel', 'Emergency', 'Electronics', 
  'Real Estate', 'Vehicle', 'Education'
];

function GoalForm({ onAddGoal }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: 'Travel',
    deadline: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.targetAmount) return;
    
    onAddGoal({
      ...formData,
      targetAmount: Number(formData.targetAmount)
    });
    
    setFormData({
      name: '',
      targetAmount: '',
      category: 'Travel',
      deadline: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Goal name"
        required
      />
      <input
        type="number"
        value={formData.targetAmount}
        onChange={(e) => setFormData({...formData, targetAmount: e.target.value})}
        placeholder="Target amount ($)"
        min="1"
        required
      />
      <select
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value})}
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({...formData, deadline: e.target.value})}
        required
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;