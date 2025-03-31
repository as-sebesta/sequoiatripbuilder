import React, { useState } from 'react';
import styled from '@emotion/styled';

interface SavingsFormProps {
  onSubmit: (amount: number, reason: string) => void;
}

const FormContainer = styled.form`
  width: 300px;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 220px; // Align with the trunk
`;

const FormTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #2E7D32;
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
  }
`;

const Button = styled.button`
  background-color: #2E7D32;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background-color: #1B5E20;
  }
`;

const SavingsForm: React.FC<SavingsFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !reason) return;

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    onSubmit(numericAmount, reason);
    setAmount('');
    setReason('');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Add New Savings</FormTitle>
      <InputGroup>
        <Label htmlFor="amount">Amount Saved ($)</Label>
        <Input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="reason">How did you save this?</Label>
        <Input
          id="reason"
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter your savings method"
          required
        />
      </InputGroup>
      <Button type="submit">Add Savings</Button>
    </FormContainer>
  );
};

export default SavingsForm; 