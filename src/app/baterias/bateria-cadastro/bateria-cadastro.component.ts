import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { BateriaService } from '../bateria.service';
import { Bateria } from './../../core/model';

@Component({
  selector: 'app-bateria-cadastro',
  templateUrl: './bateria-cadastro.component.html',
  styleUrls: ['./bateria-cadastro.component.css']
})
export class BateriaCadastroComponent implements OnInit {


  bateria = new Bateria();

  constructor(
    private bateriaService: BateriaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoBateria = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova bateria');

    if (codigoBateria) {
      this.carregarBateria(codigoBateria);
    }
  }

  get editando() {
    return Boolean(this.bateria.codigo)
  }

  carregarBateria(codigo: number) {
    this.bateriaService.buscarPorCodigo(codigo)
      .then(bateria => {
        this.bateria = bateria;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarBateria(form);
    } else {
      this.adicionarBateria(form);
    }
  }

  adicionarBateria(form: FormControl) {
    this.bateriaService.adicionar(this.bateria)
      .then(bateriaAdicionada => {
        this.toasty.success('Bateria adicionada com sucesso!');
        this.router.navigate(['/baterias', bateriaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarBateria(form: FormControl) {
    this.bateriaService.atualizar(this.bateria)
      .then(bateria => {
        this.bateria = bateria;

        this.toasty.success('Bateria alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.bateria = new Bateria();
    }.bind(this), 1);

    this.router.navigate(['/baterias/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de bateria: ${this.bateria.nome}`);
  }

}
