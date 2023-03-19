import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Investimento } from '../core/model';

export class InvestimentoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class InvestimentosService {

  investimentosUrl: string;

  constructor(private http: AuthHttp) {
    this.investimentosUrl = `${environment.apiUrl}/investimentos`;
  }

  pesquisar(filtro: InvestimentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.investimentosUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const investimentos = responseJson.content;

        const resultado = {
            investimentos,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.investimentosUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.investimentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }


  adicionar(investimento: Investimento): Promise<Investimento> {
    return this.http.post(this.investimentosUrl, JSON.stringify(investimento))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(investimento: Investimento): Promise<Investimento> {
    return this.http.put(`${this.investimentosUrl}/${investimento.codigo}`,
        JSON.stringify(investimento))
      .toPromise()
      .then(response => response.json() as Investimento);
  }

  buscarPorCodigo(codigo: number): Promise<Investimento> {
    return this.http.get(`${this.investimentosUrl}/${codigo}`)
      .toPromise()
      .then(response => response.json() as Investimento);
  }

}
