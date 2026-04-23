import { render, screen } from '@testing-library/react' //No interaction → render + screen
import { describe, it, expect} from 'vitest'
import type { Transaction } from '../../types'
import { Balance } from '../Balance';

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
//render(<Balance transactions={testTransactions} />) aren't just testing one single thing. it testing a collaboration:

describe('Balance component', () => {
    it('visar korrekt balans baserat på transaktioner', () => {
        render(<Balance transactions={mockTransactions} />); //Renderar komponenten med mock-transaktioner

        const balanceElement = screen.getByText('14000.00 kr'); //Hämtar elementet som visar balansen
        expect(balanceElement).toBeInTheDocument(); //Kontrollerar att elementet finns i dokumentet
        
    })
    it('visar total inkomster och utgifter och utgift separat', () => {
        render(<Balance transactions={mockTransactions} />); //Renderar komponenten med mock-transaktioner

        expect(screen.getByText('25000.00 kr')).toBeInTheDocument() // Inkomst
        expect(screen.getByText('11000.00 kr')).toBeInTheDocument()  // Utgift
  })

  it('visar "0.00 kr" när inga transaktioner skickas med', () => {
    render(<Balance transactions={[]} />)
    
    // getAllByText returns an array because "0.00 kr" will appear 3 times 
    // (Total balance, total income, total expense)
    const zeroTexts = screen.getAllByText('0.00 kr')
    expect(zeroTexts).toHaveLength(3)
  })
})
