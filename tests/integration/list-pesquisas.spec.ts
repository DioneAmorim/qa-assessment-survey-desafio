import { describe, it, expect } from 'vitest';

describe('API - Listagem de Pesquisas', () => {
  it('deve retornar a lista de pesquisas com sucesso e status 200', async () => {
    const response = await fetch('http://localhost:3000/pesquisas?page=1&empresaId=emp-001', {
      headers: {
        'x-empresa-id': 'emp-001',
        'Content-Type': 'application/json'
      }
    });
    
    expect(response.status).toBe(200);
    
    const data = await response.json();
    
    expect(data).toBeDefined();
    
    // Validamos se veio a propriedade 'items' (que contém as 4 pesquisas)
    expect(data).toHaveProperty('items');
    expect(Array.isArray(data.items)).toBe(true);
    expect(data.items.length).toBeGreaterThan(0);
  });
});