
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { LojasService } from './../lojas.service';
import { Loja } from './../../core/model';

@Component({
  selector: 'app-lojas-cadastro',
  templateUrl: './lojas-cadastro.component.html',
  styleUrls: ['./lojas-cadastro.component.css']
})
export class LojasCadastroComponent implements OnInit {

  loja = new Loja();

  constructor(
    private lojasService: LojasService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoLoja = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova loja');

    if (codigoLoja) {
      this.carregarLoja(codigoLoja);
    }
  }

  get editando() {
    return Boolean(this.loja.codigo)
  }

  carregarLoja(codigo: number) {
    this.lojasService.buscarPorCodigo(codigo)
      .then(loja => {
        this.loja = loja;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLoja(form);
    } else {
      this.adicionarLoja(form);
    }
  }

  adicionarLoja(form: FormControl) {
    this.lojasService.adicionar(this.loja)
      .then(lojaAdicionada => {
        this.toasty.success('Loja adicionada com sucesso!');
        this.router.navigate(['/lojas', lojaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLoja(form: FormControl) {
    this.lojasService.atualizar(this.loja)
      .then(loja => {
        this.loja = loja;

        this.toasty.success('Loja alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function () {
      this.loja = new Loja();
    }.bind(this), 1);

    this.router.navigate(['/lojas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de loja: ${this.loja.nome}`);
  }

}
