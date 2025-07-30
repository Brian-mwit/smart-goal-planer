function ProgressBar({ progress }) {
  return (
    <div className="progress-bar">
      <div 
        className="progress-fill" 
        style={{ width: `${progress}%` }}
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {Math.round(progress)}%
      </div>
    </div>
  );
}

export default ProgressBar;