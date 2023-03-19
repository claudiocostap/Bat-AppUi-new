export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;

}

export class Pessoa {
  codigo: number;
  nome: string;
  cargo: string;
  endereco = new Endereco();
  ativo = true;
}

export class Loja {
  codigo: number;
  nome: string;
  cnpj: string;
  endereco = new Endereco();
  razaoSocial: string;
  fone1: number;
  ativo = true;
}

export class Categoria {
  codigo: number;
  nome: string;
  loja = new Loja();
}

export class Lancamento {
  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}

export class Bateria {
  codigo: number;
  descricao: string;
  nome: string;
  peso: number;
  quantidade: number;
  sucata: boolean;
  usadinha: boolean;
  v_apraso: number;
  v_avista: number;
  v_ctroca: number;
  v_total: number;
}


export class Investimento {
  codigo: number;
  descricao: string;
  nome: string;
  pessoa = new Pessoa();
  loja = new Loja();
  peso: number;
  valor: number;
}

