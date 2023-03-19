
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

import { SharedModule } from './../shared/shared.module';
import { InvestimentosRoutingModule } from './investimentos-routing.module';
import { InvestimentosPesquisaComponent } from './investimentos-pesquisa/investimentos-pesquisa.component';
import { InvestimentosCadastroComponent } from './investimentos-cadastro/investimentos-cadastro.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputMaskModule,

    SharedModule,
    InvestimentosRoutingModule
  ],
  declarations: [
    InvestimentosCadastroComponent,
    InvestimentosPesquisaComponent
  ],
  exports: []
})
export class InvestimentosModule { }
