//bonusupgifter - unit testing av TransactionList komponenten. Testa att den renderar transaktioner korrekt, visar rätt information och anropar onDelete
// Integration tests: React components like Transaction.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event' //För att simulera användarinteraktioner som klick
import { describe, it, expect, vi } from 'vitest'
import { TransactionList } from '../TransactionList'  
import type { Transaction } from '../../types'

const mockTransactions: Transaction[] = [
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
];

describe('TransactionList', () => {
    it('visar meddelandet "Inga transaktioner att visa" när listan är tom', () => {
        render(<TransactionList transactions={[]} onDeleteTransaction={vi.fn()} />)
    expect(screen.getByText(/inga transaktioner att visa/i)).toBeInTheDocument()
    })

  it('renderar alla transaktioner i listan', () => {
    render(<TransactionList transactions={mockTransactions} onDeleteTransaction={vi.fn()} />)

    // Verifiera att alla transaktioner renderas
    expect(screen.getAllByRole('listitem')).toHaveLength(3)

    // Verifiera att rätt knappar finns för varje transaktion
    expect(screen.getByRole('button', { name: 'Ta bort Lön' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ta bort Hyra' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ta bort Mat' })).toBeInTheDocument()
  })

  it('visar beskrivning, belopp och kategori för varje transaktion', () => {
    render(<TransactionList transactions={mockTransactions} onDeleteTransaction={vi.fn()} />)
    
    // Kolla specifika detaljer för en transaktion
    expect(screen.getByText('Hyra')).toBeInTheDocument()
    expect(screen.getByText('-8000.00 kr')).toBeInTheDocument()
    expect(screen.getByText('Boende')).toBeInTheDocument()
  })

  it('anropar onDeleteTransaction med rätt id när man klickar "Ta bort"', async () => {
    const user = userEvent.setup()
    const mockDelete = vi.fn() // Vår spion-funktion
    
    render(<TransactionList transactions={mockTransactions} onDeleteTransaction={mockDelete} />)
    
    
    const deleteButtons = screen.getAllByRole('button', { name: /ta bort/i })
    
    // Klicka på den andra knappen (index 1 = Hyra)
    await user.click(deleteButtons[1])
    
    // Kontrollera att funktionen anropades med ID '2' (Hyran)
    expect(mockDelete).toHaveBeenCalledWith('2')
  })
})