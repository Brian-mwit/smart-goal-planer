
import React from 'react';

function GoalOverview({ goals }) {
  const totalGoals = goals.length;
  const totalSavedAmount = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount);
  const inProgress = goals.filter(g => g.savedAmount < g.targetAmount);

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="goal-overview">
      <h2>Goal Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved Across All Goals: ${totalSavedAmount.toLocaleString()}</p>
      <p>Goals Completed: {completedGoals.length}</p>

  <h3>In Progress Goals:</h3>
  {inProgress.length > 0 ? (
    <ul>
      {inProgress.map(goal => {
        const days = getDaysRemaining(goal.deadline);
        let status = '';
        let cls = '';

        if (days <= 0) {
          status = 'Overdue';
          cls = 'overdue';
        } else if (days <= 30) {
          status = `Due in ${days} days`;
          cls = 'warning';
        } else {
          status = `${days} days remaining`;
        }

        return (
          <li key={goal.id}>
            <strong>{goal.name}</strong> — 
            Saved: ${goal.savedAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}  
            <span className={cls}> ({status})</span>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>All goals completed or no goals in progress.</p>
  )}
</div>
  );
}

export default GoalOverview;