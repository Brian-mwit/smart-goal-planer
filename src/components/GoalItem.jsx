import ProgressBar from './ProgressBar';

function GoalItem({ goal, onDelete }) {
  const progress = Math.min(
    (goal.savedAmount / goal.targetAmount) * 100, 
    100
  );
  const remaining = goal.targetAmount - goal.savedAmount;

  return (
    <div className="goal-item">
      <div className="goal-header">
        <h3>{goal.name}</h3>
        <span className="goal-category">{goal.category}</span>
      </div>
      <p className="goal-deadline">Deadline: {goal.deadline}</p>
      
      <ProgressBar progress={progress} />
      
      <div className="goal-amounts">
        <span>Saved: ${goal.savedAmount.toLocaleString()}</span>
        <span>Target: ${goal.targetAmount.toLocaleString()}</span>
        <span>Remaining: ${remaining.toLocaleString()}</span>
      </div>
      
      <button 
        onClick={() => onDelete(goal.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  );
}

export default GoalItem;