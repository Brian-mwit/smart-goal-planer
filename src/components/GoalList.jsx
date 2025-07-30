import GoalItem from './GoalItem';

function GoalList({ goals, onDelete }) {
  if (goals.length === 0) {
    return <p className="no-goals">No goals yet. Add your first goal!</p>;
  }

  return (
    <div className="goal-list">
      {goals.map(goal => (
        <GoalItem 
          key={goal.id} 
          goal={goal} 
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default GoalList;