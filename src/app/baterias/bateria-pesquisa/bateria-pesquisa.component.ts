import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { BateriaFiltro, BateriaService } from './../bateria.service';

@Component({
  selector: 'app-bateria-pesquisa',
  templateUrl: './bateria-pesquisa.component.html',
  styleUrls: ['./bateria-pesquisa.component.css']
})
export class BateriaPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new BateriaFiltro();
  baterias = [];
  @ViewChild('tabela') grid;

  constructor(
    private bateriaService: BateriaService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de baterias');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.bateriaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.baterias = resultado.baterias;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(bateria: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(bateria);
      }
    });
  }

  excluir(bateria: any) {
    this.bateriaService.excluir(bateria.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Bateria excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



}
