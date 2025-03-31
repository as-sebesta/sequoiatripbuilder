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

const STORAGE_KEY = 'sequoiaSavings';

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

const App = () => {
  const [savings, setSavings] = useState<SavingsEntry[]>([]);
  const [totalSaved, setTotalSaved] = useState(0);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setSavings(parsedData);
      }
    } catch (error) {
      console.warn('Unable to access localStorage:', error);
    }
  }, []);

  useEffect(() => {
    const newTotal = savings.reduce((sum, entry) => sum + entry.amount, 0);
    setTotalSaved(newTotal);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savings));
    } catch (error) {
      console.warn('Unable to save to localStorage:', error);
    }
  }, [savings]);

  const addSavings = (amount: number, reason: string) => {
    const newEntry: SavingsEntry = {
      id: Date.now().toString(),
      amount,
      reason,
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedSavings = [...savings, newEntry];
    setSavings(updatedSavings);
  };

  const deleteEntry = (id: string) => {
    const entryToDelete = savings.find(entry => entry.id === id);
    if (!entryToDelete) return;

    const updatedSavings = savings.filter(entry => entry.id !== id);
    setSavings(updatedSavings);
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