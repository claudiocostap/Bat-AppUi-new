
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { LojasFiltro, LojasService } from './../lojas.service';

@Component({
  selector: 'app-lojas-pesquisa',
  templateUrl: './lojas-pesquisa.component.html',
  styleUrls: ['./lojas-pesquisa.component.css']
})
export class LojasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LojasFiltro();
  lojas = [];
  @ViewChild('tabela') grid;

  constructor(
    private lojasService: LojasService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Lojas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lojasService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lojas = resultado.lojas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(loja: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir ?',
      accept: () => {
        this.excluir(loja);
      }
    });
  }

  excluir(loja: any) {
    this.lojasService.excluir(loja.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Loja excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



}
