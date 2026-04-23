import { describe, it, expect } from "vitest";
import { calculateTotal, calculateTotalByType, calculateByCategory } from "../calculations";
import type { Transaction } from "../../types";
//Skapa en const med testdata högst upp i filen, t.ex:
const testTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Lön',
    amount: 25000,
    type: 'income',
    category: 'salary',
    date: '2025-04-01',
  },
  {
    id: '2',
    description: 'Hyra',
    amount: 8000,
    type: 'expense',
    category: 'housing',
    date: '2025-04-01',
  },
  {
    id: '3',
    description: 'Mat',
    amount: 3000,
    type: 'expense',
    category: 'food',
    date: '2025-04-02',     
  },
  {   
    id: '4',
    description: 'Transport',
    amount: 1500,
    type: 'expense',
    category: 'other',
    date: '2025-04-03', 
  } 
];

describe('calculateTotal', () => {
  it('returnerar korrekt balans', () => {
    expect(calculateTotal(testTransactions)).toBe(12500); //Returnerar korrekt balans (inkomster minus utgifter)
  });
  it('returnerar 0 för en tom lista', () => {
    expect(calculateTotal([])).toBe(0); //Returnerar 0 för en tom array
    });
  it('hanterar endast inkomster korrekt', () => {
    const onlyIncome = [testTransactions[0]];
    expect(calculateTotal(onlyIncome)).toBe(25000); //Hanterar enbart inkomster
  });
});
describe('calculateTotalByType', () => {
  it('summerar korrekt för income', () => {
    expect(calculateTotalByType(testTransactions, 'income')).toBe(25000); //Summerar korrekt för income
  });
  it('summerar korrekt för expense', () => {
    expect(calculateTotalByType(testTransactions, 'expense')).toBe(12500); //Summerar korrekt för expense
  });
  it('returnerar 0 om inga transaktioner av typen finns', () => {
    const noExpenses : Transaction[] = [testTransactions[0]];
    expect(calculateTotalByType(noExpenses, 'expense')).toBe(0); //Returnerar 0 om inga transaktioner av den typen finns
  });
});
describe('calculateByCategory', () => {
  it('returnerar ett objekt med summerade värden per kategori', () => {
    const result = calculateByCategory(testTransactions);
    expect(result).toEqual({
      salary: 0,
      housing: 8000,
      food: 3000,
      transport: 0,
      entertainment: 0,
      other: 1500,    
    });
  });
});
//Returnerar ett objekt med rätt summor per kategori
//Räknar bara utgifter (inte inkomster)
//Returnerar 0 för kategorier utan transaktioner