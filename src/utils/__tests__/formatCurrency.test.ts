import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../formatCurrency'

// Exempeltest — visar studenterna att setupen fungerar
describe('formatCurrency', () => {
  it('formaterar ett heltal med två decimaler', () => {
    expect(formatCurrency(100)).toBe('100.00 kr') //Formaterar heltal korrekt (t.ex. 100 → "100.00 kr")
  })
  it('formaterar ett decimaltal korrekt', () => {
    expect(formatCurrency(49.9)).toBe('49.90 kr') //Formaterar decimaltal korrekt (t.ex. 49.9 → "49.90 kr")
  })
  it('hanterar siffran 0 korrekt', () => {
    expect(formatCurrency(0)).toBe('0.00 kr') //Hanterar siffran 0 korrekt (0 → "0.00 kr")
  })
  it('hanterar negativa tal korrekt', () => {
    expect(formatCurrency(-50)).toBe('-50.00 kr') //Hanterar negativa tal korrekt (t.ex. -50 → "-50.00 kr")
  })
})
