import React from 'react';
import styled from '@emotion/styled';

interface SavingsEntry {
  id: string;
  amount: number;
  reason: string;
  date: string;
}

interface SavingsListProps {
  savings: SavingsEntry[];
  onDelete: (id: string) => void;
}

const ListContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
`;

const Title = styled.h2`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  background-color: #2E7D32;
  color: white;
  padding: 1rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 1rem;
  border-top: 1px solid #dee2e6;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #c82333;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-style: italic;
`;

const SavingsList: React.FC<SavingsListProps> = ({ savings, onDelete }) => {
  if (savings.length === 0) {
    return (
      <ListContainer>
        <Title>Savings History</Title>
        <EmptyState>No savings entries yet. Start saving!</EmptyState>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <Title>Savings History</Title>
      <Table>
        <thead>
          <tr>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>How You Saved</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {savings.map((entry) => (
            <tr key={entry.id}>
              <Td>{entry.date}</Td>
              <Td>${entry.amount.toLocaleString()}</Td>
              <Td>{entry.reason}</Td>
              <Td>
                <DeleteButton onClick={() => onDelete(entry.id)}>
                  Delete
                </DeleteButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ListContainer>
  );
};

export default SavingsList; 