import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Loja } from '../core/model';

export class LojasFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LojasService {

  lojasUrl: string;

  constructor(private http: AuthHttp) {
    this.lojasUrl = `${environment.apiUrl}/lojas`;
  }

  pesquisar(filtro: LojasFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.lojasUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lojas = responseJson.content;

        const resultado = {
          lojas,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.lojasUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lojasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }


  adicionar(loja: Loja): Promise<Loja> {
    return this.http.post(this.lojasUrl, JSON.stringify(loja))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(loja: Loja): Promise<Loja> {
    return this.http.put(`${this.lojasUrl}/${loja.codigo}`,
        JSON.stringify(loja))
      .toPromise()
      .then(response => response.json() as Loja);
  }

  buscarPorCodigo(codigo: number): Promise<Loja> {
    return this.http.get(`${this.lojasUrl}/${codigo}`)
      .toPromise()
      .then(response => response.json() as Loja);
  }

}
