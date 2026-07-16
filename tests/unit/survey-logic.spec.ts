import { describe, expect, it, vi } from "vitest";

// Mock @nestjs/common to avoid needing the full package during workspace unit tests.
vi.mock("@nestjs/common", () => ({
  BadRequestException: class BadRequestException extends Error {
    constructor(message?: string) {
      super(message);
      this.name = "BadRequestException";
    }
  },
}));

import { getStatusFromPeriod } from "@/modules/pesquisa/helpers/get-status-from-period";
import { validatePesquisaDisponivel } from "@/modules/pesquisa/helpers/validate-pesquisa-disponivel";
import { validateRequiredFields } from "@/modules/pesquisa/helpers/validate-required-fields";
import { validateFieldValues } from "@/modules/pesquisa/helpers/validate-field-values";
import { validateAllowedFields } from "@/modules/pesquisa/helpers/validate-allowed-fields";
import { validateAnswersDuplicates } from "@/modules/pesquisa/helpers/validate-answers-duplicates";
import type { PerguntaInput, RespostaInput } from "@/modules/pesquisa/helpers/types";

describe("Survey helper logic", () => {
  const makePergunta = (
    tipo: PerguntaInput["tipo"],
    overrides?: Partial<PerguntaInput>,
  ): PerguntaInput => ({
    id: 1,
    tipo,
    respostaObrigatoria: true,
    justificarResposta: false,
    permitirOutro: false,
    opcoes: [],
    ...overrides,
  });

  const makeResposta = (
    perguntaId = 1,
    overrides?: Partial<RespostaInput>,
  ): RespostaInput => ({
    perguntaId,
    ...overrides,
  });

  it("returns false when the survey has not started yet", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const result = getStatusFromPeriod(tomorrow, null);
    expect(result).toBe(false);
  });

  it("returns false when the survey period is already finished", () => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 8);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const result = getStatusFromPeriod(lastWeek, yesterday);
    expect(result).toBe(false);
  });

  it("returns true when the survey is active during the current period", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const result = getStatusFromPeriod(yesterday, tomorrow);
    expect(result).toBe(true);
  });

  it("throws when validating availability for an inactive survey", () => {
    expect(() =>
      validatePesquisaDisponivel({
        estaAtiva: false,
        dataLancamento: new Date(),
        dataEncerramento: null,
      }),
    ).toThrow("Essa pesquisa não está ativa.");
  });

  it("throws when validating availability for a survey outside its period", () => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    expect(() =>
      validatePesquisaDisponivel({
        estaAtiva: true,
        dataLancamento: lastMonth,
        dataEncerramento: lastWeek,
      }),
    ).toThrow("Essa pesquisa não está disponível para respostas no momento.");
  });

  it("throws when a required text response is missing", () => {
    const pergunta = makePergunta("texto_grande");
    const resposta = makeResposta(1);

    expect(() => validateRequiredFields(pergunta, resposta)).toThrow(
      "A pergunta 1 é obrigatória e não foi respondida.",
    );
  });

  it("accepts a valid multiple choice answer", () => {
    const pergunta = makePergunta("multipla_escolha", {
      opcoes: [{ id: 10 }],
      respostaObrigatoria: true,
    });
    const resposta = makeResposta(1, { opcaoId: 10 });

    expect(() => validateRequiredFields(pergunta, resposta)).not.toThrow();
  });

  it("throws when justificativa is required but missing", () => {
    const pergunta = makePergunta("multipla_escolha", {
      opcoes: [{ id: 10 }],
      respostaObrigatoria: true,
      justificarResposta: true,
    });
    const resposta = makeResposta(1, { opcaoId: 10 });

    expect(() => validateRequiredFields(pergunta, resposta)).toThrow(
      "A pergunta 1 exige justificativa.",
    );
  });

  it("throws for out-of-range pontuacao_0_a_5 values", () => {
    const pergunta = makePergunta("pontuacao_0_a_5");
    const resposta = makeResposta(1, { valorNumerico: 7 });

    expect(() => validateFieldValues(pergunta, resposta)).toThrow(
      "A pontuação deve estar entre 0 e 5.",
    );
  });

  it("throws for an invalid qualidade_percebida option", () => {
    const pergunta = makePergunta("qualidade_percebida");
    const resposta = makeResposta(1, {
      valorOpcaoPadronizada: "ruimissimo" as any,
    });

    expect(() => validateFieldValues(pergunta, resposta)).toThrow(
      "Valor inválido para qualidade percebida.",
    );
  });

  it("throws when a response contains a field not allowed for the question type", () => {
    const pergunta = makePergunta("multipla_escolha", {
      opcoes: [{ id: 2 }],
    });
    const resposta = makeResposta(1, { valorNumerico: 3 });

    expect(() => validateAllowedFields(pergunta, resposta)).toThrow(
      "O campo \"valorNumerico\" não é compatível com perguntas do tipo \"multipla_escolha\".",
    );
  });

  it("throws when the same question is answered more than once", () => {
    const perguntasMap = new Map<number, PerguntaInput>();
    perguntasMap.set(1, makePergunta("texto_grande"));

    expect(() =>
      validateAnswersDuplicates(perguntasMap, [
        makeResposta(1, { valorOpcaoTexto: "texto 1" }),
        makeResposta(1, { valorOpcaoTexto: "texto 2" }),
      ]),
    ).toThrow("A pergunta 1 foi respondida mais de uma vez.");
  });
});
