import { AuthService } from './../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { InvestimentoFiltro, InvestimentosService } from './../investimentos.service';

@Component({
  selector: 'app-investimentos-pesquisa',
  templateUrl: './investimentos-pesquisa.component.html',
  styleUrls: ['./investimentos-pesquisa.component.css']
})
export class InvestimentosPesquisaComponent implements OnInit {
  public show = false;
  totalRegistros = 0;
  filtro = new InvestimentoFiltro();
  investimentos = [];
  @ViewChild('tabela') grid;

  constructor(
    private auth: AuthService,
    private investimentoService: InvestimentosService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Investimentos');
    if (this.auth.temPermissao('ROLE_REMOVER_INVESTIMENTO')) {
      /* if block statements */
      this.show = true;
    }
    if (this.auth.temPermissao('ROLE_CADASTRAR_INVESTIMENTO')) {
      /* if block statements */
      this.show = true;
    }
}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.investimentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.investimentos = resultado.investimentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(investimentos: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(investimentos);
      }
    });
  }

  excluir(investimentos: any) {
    this.investimentoService.excluir(investimentos.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('investimento excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



}
