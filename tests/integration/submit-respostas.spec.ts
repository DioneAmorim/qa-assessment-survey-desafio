import { describe, it, expect } from 'vitest';

const API_BASE = 'http://localhost:3000';

async function fetchPublicPesquisa(idPublico: string) {
  const response = await fetch(`${API_BASE}/public/${idPublico}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-empresa-id': 'emp-001',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Falha ao buscar pesquisa p�blica ${idPublico}: ${response.status} ${JSON.stringify(data)}`);
  }

  return data;
}

function buildRespostaForPergunta(pergunta: any) {
  const base = { perguntaId: pergunta.id };

  switch (pergunta.tipo) {
    case 'texto_grande':
      return {
        ...base,
        valorOpcaoTexto: 'Minha experi�ncia foi excelente!',
      };
    case 'multipla_escolha':
    case 'opcoes_diversas':
      if (!pergunta.opcoes || pergunta.opcoes.length === 0) {
        throw new Error('N�o h� op��es dispon�veis para a pergunta de escolha.');
      }
      return {
        ...base,
        opcaoId: pergunta.opcoes[0].id,
      };
    case 'pontuacao_0_a_5':
      return {
        ...base,
        valorNumerico: 4,
      };
    case 'pontuacao_0_a_10':
      return {
        ...base,
        valorNumerico: 8,
      };
    case 'nivel_satisfacao':
      return {
        ...base,
        valorOpcaoPadronizada: 'satisfeito',
      };
    case 'qualidade_percebida':
      return {
        ...base,
        valorOpcaoPadronizada: 'bom',
      };
    default:
      throw new Error(`Tipo de pergunta desconhecido: ${pergunta.tipo}`);
  }
}

function makeSubmitPayload(resposta: Record<string, any>) {
  return {
    iniciadoEm: new Date().toISOString(),
    finalizadoEm: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    respostas: [resposta],
  };
}

describe('API - Envio de Respostas P�blicas', () => {
  it('deve registrar respostas em pesquisa p�blica ativa e retornar 201', async () => {
    const pesquisaAtiva = await fetchPublicPesquisa('pub-ativa');

    expect(Array.isArray(pesquisaAtiva.perguntas)).toBe(true);
    expect(pesquisaAtiva.perguntas.length).toBeGreaterThan(0);

    const perguntaValida = pesquisaAtiva.perguntas.find((pergunta: any) =>
      [
        'texto_grande',
        'multipla_escolha',
        'opcoes_diversas',
        'pontuacao_0_a_5',
        'pontuacao_0_a_10',
        'nivel_satisfacao',
        'qualidade_percebida',
      ].includes(pergunta.tipo),
    );

    expect(perguntaValida).toBeDefined();

    const resposta = buildRespostaForPergunta(perguntaValida);
    const payload = makeSubmitPayload(resposta);

    const response = await fetch(`${API_BASE}/public/pub-ativa/respostas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-empresa-id': 'emp-001',
      },
      body: JSON.stringify(payload),
    });

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toEqual({ ok: true, total: 1 });
  });

  it('deve retornar 404 ao enviar respostas para pesquisa inexistente', async () => {
    const payload = makeSubmitPayload({ perguntaId: 9999, valorOpcaoTexto: 'Teste' });

    const response = await fetch(`${API_BASE}/public/pub-inexistente/respostas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-empresa-id': 'emp-001',
      },
      body: JSON.stringify(payload),
    });

    expect(response.status).toBe(404);
    const data = await response.json();
    expect(data).toHaveProperty('message', 'Pesquisa não encontrada.');
  });

  it('deve retornar 400 ao tentar enviar respostas sem respostas', async () => {
    const response = await fetch(`${API_BASE}/public/pub-ativa/respostas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-empresa-id': 'emp-001',
      },
      body: JSON.stringify({
        iniciadoEm: new Date().toISOString(),
        finalizadoEm: new Date().toISOString(),
        respostas: [],
      }),
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toHaveProperty('message', 'Ao menos uma resposta deve ser enviada.');
  });

  it('deve retornar 400 ao enviar resposta inv�lida para pergunta de m�ltipla escolha sem opcaoId', async () => {
    const pesquisaAtiva = await fetchPublicPesquisa('pub-ativa');
    const perguntaMultiplaEscolha = pesquisaAtiva.perguntas.find((pergunta: any) =>
      pergunta.tipo === 'multipla_escolha' || pergunta.tipo === 'opcoes_diversas',
    );

    expect(perguntaMultiplaEscolha).toBeDefined();

    const response = await fetch(`${API_BASE}/public/pub-ativa/respostas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-empresa-id': 'emp-001',
      },
      body: JSON.stringify({
        iniciadoEm: new Date().toISOString(),
        finalizadoEm: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        respostas: [
          {
            perguntaId: perguntaMultiplaEscolha.id,
          },
        ],
      }),
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toHaveProperty('message');
  });

  it('deve retornar 400 ao tentar responder pesquisa inativa', async () => {
    const payload = makeSubmitPayload({ perguntaId: 9999, valorOpcaoTexto: 'Teste' });

    const response = await fetch(`${API_BASE}/public/pub-inativa/respostas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-empresa-id': 'emp-001',
      },
      body: JSON.stringify(payload),
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toHaveProperty('message', 'Essa pesquisa não está ativa.');
  });
});
