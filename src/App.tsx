import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import SequoiaGauge from './components/SequoiaGauge';
import SavingsForm from './components/SavingsForm';
import SavingsList from './components/SavingsList';

interface SavingsEntry {
  id: string;
  amount: number;
  reason: string;
  date: string;
}

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
`;

const Header = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const MainContent = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

function App() {
  const [savings, setSavings] = useState<SavingsEntry[]>([]);
  const [totalSaved, setTotalSaved] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem('sequoiaSavings');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setSavings(parsedData);
      setTotalSaved(parsedData.reduce((acc: number, entry: SavingsEntry) => acc + entry.amount, 0));
    }
  }, []);

  const addSavings = (amount: number, reason: string) => {
    const newEntry: SavingsEntry = {
      id: Date.now().toString(),
      amount,
      reason,
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedSavings = [...savings, newEntry];
    setSavings(updatedSavings);
    setTotalSaved(totalSaved + amount);
    localStorage.setItem('sequoiaSavings', JSON.stringify(updatedSavings));
  };

  const deleteEntry = (id: string) => {
    const entryToDelete = savings.find(entry => entry.id === id);
    if (!entryToDelete) return;

    const updatedSavings = savings.filter(entry => entry.id !== id);
    setSavings(updatedSavings);
    setTotalSaved(totalSaved - entryToDelete.amount);
    localStorage.setItem('sequoiaSavings', JSON.stringify(updatedSavings));
  };

  return (
    <AppContainer>
      <Header>Sequoia Trip Savings Tracker</Header>
      <MainContent>
        <SavingsForm onSubmit={addSavings} />
        <SequoiaGauge currentAmount={totalSaved} targetAmount={5000} />
      </MainContent>
      <SavingsList savings={savings} onDelete={deleteEntry} />
    </AppContainer>
  );
}

export default App; 