import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Produto } from '../core/model';

export class ProdutoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class ProdutoService {

  produtosUrl: string;

  constructor(private http: AuthHttp) {
    this.produtosUrl = `${environment.apiUrl}/produtos`;
  }

  pesquisar(filtro: ProdutoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.produtosUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const produtos = responseJson.content;

        const resultado = {
          produtos,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.produtosUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.produtosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }


  adicionar(produto: Produto): Promise<Produto> {
    return this.http.post(this.produtosUrl, JSON.stringify(produto))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(produto: Produto): Promise<Produto> {
    return this.http.put(`${this.produtosUrl}/${produto.codigo}`,
        JSON.stringify(produto))
      .toPromise()
      .then(response => response.json() as Produto);
  }

  mudarStatus(codigo: number, quantidade: number): Promise<void> {
    return this.http.put(`${this.produtosUrl}/${codigo}`,`/${quantidade}`)
      .toPromise()
      .then(() => null);
  }


  buscarPorCodigo(codigo: number): Promise<Produto> {
    return this.http.get(`${this.produtosUrl}/${codigo}`)
      .toPromise()
      .then(response => response.json() as Produto);
  }

}
