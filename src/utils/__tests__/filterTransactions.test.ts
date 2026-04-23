//bonusupgifter
import { describe, it, expect } from "vitest";
import { filterTransactions } from "../filterTransactions";
import type { Transaction } from "../../types";

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
    description: 'Matbutiken',
    amount: 3000,
    type: 'expense',
    category: 'food',
    date: '2025-04-02',     
  },
];

describe('filterTransactions', () => {
    it('returnerar alla transaktioner om inga filter är satta', () => {
    // Tomt filter-objekt {}
    const result = filterTransactions(testTransactions, {});
    expect(result).toHaveLength(3);
    expect(result).toEqual(testTransactions);
  });

  it('filtrerar på type (income)', () => {
    const result = filterTransactions(testTransactions, { type: 'income' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('filtrerar på category (food)', () => {
    const result = filterTransactions(testTransactions, { category: 'food' });
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('food');
  });

  it('filtrerar på searchTerm (case-insensitive)', () => {
    // Sök efter "mat" (lowercase) ska hitta "Matbutiken"
    const result = filterTransactions(testTransactions, { searchTerm: 'mat' });
    expect(result).toHaveLength(1);
    expect(result[0].description).toBe('Matbutiken');
  });

  it('kombinerar flera filter samtidigt (type + category)', () => {
    const result = filterTransactions(testTransactions, { 
      type: 'expense', 
      category: 'housing' 
    });
    expect(result).toHaveLength(1);
    expect(result[0].description).toBe('Hyra');
  });

  it('returnerar tom array om inget matchar', () => {
    const result = filterTransactions(testTransactions, { searchTerm: 'FinnsInte' });
    expect(result).toHaveLength(0);
  });

});
