import { describe, it, expect } from 'vitest';

const API_BASE = 'http://localhost:3000';

function uniqueSurveyName() {
  return `Pesquisa Vitest ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function makeCreatePayload(name: string) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  return {
    empresaId: 'emp-001',
    nome: name,
    descricao: 'Pesquisa criada pelo teste de integração do Vitest.',
    dataLancamento: tomorrow.toISOString(),
    dataEncerramento: dayAfterTomorrow.toISOString(),
    perguntas: [
      {
        nome: 'Como você avalia o teste?',
        tipo: 'texto_grande',
        respostaObrigatoria: true,
      },
    ],
  };
}

describe('API - Criação de Pesquisas', () => {
  it('deve criar pesquisa com sucesso e retornar 201', async () => {
    const nome = uniqueSurveyName();
    const response = await fetch(`${API_BASE}/pesquisas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-empresa-id': 'emp-001',
      },
      body: JSON.stringify(makeCreatePayload(nome)),
    });

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toBeDefined();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('idPublico');
    expect(data.nome).toBe(nome);
    expect(data.empresaId).toBe('emp-001');
  });

  it('deve retornar 400 ao tentar criar pesquisa sem nome', async () => {
    const payload = makeCreatePayload('');
    // @ts-expect-error: intentionally omit nome for validation coverage
    delete payload.nome;

    const response = await fetch(`${API_BASE}/pesquisas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-empresa-id': 'emp-001',
      },
      body: JSON.stringify(payload),
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toHaveProperty('message', 'Validation failed');
    expect(Array.isArray(data.errors)).toBe(true);
    expect(data.errors.some((error: any) => error.path?.includes('nome'))).toBe(true);
  });

  it('deve retornar 400 ao tentar criar pesquisa sem perguntas', async () => {
    const payload = makeCreatePayload(uniqueSurveyName());
    payload.perguntas = [];

    const response = await fetch(`${API_BASE}/pesquisas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-empresa-id': 'emp-001',
      },
      body: JSON.stringify(payload),
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.message).toBe('Validation failed');
    expect(data.errors.some((error: any) => error.path?.includes('perguntas'))).toBe(true);
  });

  it('deve retornar 400 ao tentar criar pesquisa com data de encerramento anterior à data de lançamento', async () => {
    const payload = makeCreatePayload(uniqueSurveyName());
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    payload.dataLancamento = today.toISOString();
    payload.dataEncerramento = yesterday.toISOString();

    const response = await fetch(`${API_BASE}/pesquisas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-empresa-id': 'emp-001',
      },
      body: JSON.stringify(payload),
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toHaveProperty('message');
    expect(String(data.message)).toContain('data de encerramento não pode ser anterior à data de lançamento');
  });

  it('deve retornar 409 ao tentar criar pesquisa com nome duplicado para a mesma empresa', async () => {
    const nomeDuplicado = uniqueSurveyName();
    const payload = makeCreatePayload(nomeDuplicado);

    const firstResponse = await fetch(`${API_BASE}/pesquisas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-empresa-id': 'emp-001',
      },
      body: JSON.stringify(payload),
    });

    expect(firstResponse.status).toBe(201);

    const secondResponse = await fetch(`${API_BASE}/pesquisas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-empresa-id': 'emp-001',
      },
      body: JSON.stringify(payload),
    });

    expect(secondResponse.status).toBe(409);
    const data = await secondResponse.json();
    expect(data).toHaveProperty('message');
    expect(String(data.message)).toContain('Já existe uma pesquisa com este nome para esta empresa');
  });
});
