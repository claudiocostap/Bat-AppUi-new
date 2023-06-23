import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Bateria } from '../core/model';

export class BateriaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class BateriaService {

  bateriasUrl: string;

  constructor(private http: AuthHttp) {
    this.bateriasUrl = `${environment.apiUrl}/baterias`;
  }

  pesquisar(filtro: BateriaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.bateriasUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const baterias = responseJson.content;

        const resultado = {
          baterias,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  pesquisarNome(filtro: BateriaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.bateriasUrl}/pesquisar`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const baterias = responseJson.content;

        const resultado = {
          baterias,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.bateriasUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.bateriasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }


  adicionar(bateria: Bateria): Promise<Bateria> {
    return this.http.post(this.bateriasUrl, JSON.stringify(bateria))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(bateria: Bateria): Promise<Bateria> {
    return this.http.put(`${this.bateriasUrl}/${bateria.codigo}`,
        JSON.stringify(bateria))
      .toPromise()
      .then(response => response.json() as Bateria);
  }

  mudarStatus(codigo: number, quantidade: number): Promise<void> {
    return this.http.put(`${this.bateriasUrl}/${codigo}`,`/${quantidade}`)
      .toPromise()
      .then(() => null);
  }


  buscarPorCodigo(codigo: number): Promise<Bateria> {
    return this.http.get(`${this.bateriasUrl}/${codigo}`)
      .toPromise()
      .then(response => response.json() as Bateria);
  }

}
