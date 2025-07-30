// DepositForm.jsx
import React, { useState } from "react";

const DepositForm = ({ onSubmit, onCancel, goal }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const depositAmount = parseInt(amount, 10);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      alert("Please enter a valid deposit amount.");
      return;
    }
    onSubmit(goal.id, depositAmount);
  };

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <h2>Make a Deposit</h2>

      <p>
        For: <strong>{goal.name}</strong>
      </p>

      <label htmlFor="amount">Deposit Amount ($)</label>
      <input
        type="number"
        id="amount"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="1"
        step="1"
        autoFocus
        required
      />

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Deposit</button>
      </div>
    </form>
  );
};

export default DepositForm;