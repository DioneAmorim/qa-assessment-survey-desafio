export type PerguntaTipo =
  | "texto_grande"
  | "multipla_escolha"
  | "opcoes_diversas"
  | "pontuacao_0_a_5"
  | "pontuacao_0_a_10"
  | "nivel_satisfacao"
  | "qualidade_percebida";

export type ResponseField =
  | "opcaoId"
  | "valorOpcaoPadronizada"
  | "valorOpcaoTexto"
  | "valorNumerico";

export type PerguntaInput = {
  id: number;
  tipo: PerguntaTipo;
  respostaObrigatoria: boolean;
  justificarResposta: boolean;
  permitirOutro: boolean;
  opcoes: { id: number }[];
};

export type RespostaInput = {
  perguntaId: number;
} & Partial<{
  opcaoId: number | null;
  valorOpcaoPadronizada: string | null;
  valorOpcaoTexto: string | null;
  valorNumerico: number | null;
  outroTexto: string | null;
  justificativaTexto: string | null;
}>;

export const ALLOWED_FIELD_BY_TYPE: Record<pergunta_tipo, ResponseField> = {
  texto_grande: "valorOpcaoTexto",
  multipla_escolha: "opcaoId",
  opcoes_diversas: "opcaoId",
  pontuacao_0_a_5: "valorNumerico",
  pontuacao_0_a_10: "valorNumerico",
  nivel_satisfacao: "valorOpcaoPadronizada",
  qualidade_percebida: "valorOpcaoPadronizada",
};
