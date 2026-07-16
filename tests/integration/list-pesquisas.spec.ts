import { describe, it, expect } from 'vitest';

describe('API - Listagem de Pesquisas', () => {
  // Teste 1: Caso de sucesso (Já existente)
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
    expect(data).toHaveProperty('items');
    expect(Array.isArray(data.items)).toBe(true);
  });

  // Teste 2: Caso de falha (Novo!)
  it('deve retornar erro 400 ao tentar listar as pesquisas sem enviar o id da empresa', async () => {
    const response = await fetch('http://localhost:3000/pesquisas?page=1', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Validamos que a API negou a requisição com Bad Request (400)
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.message).toBe('Validation failed');
    expect(data.errors[0].path).toContain('empresaId');
  });
});