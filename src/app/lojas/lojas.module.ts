
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule, PanelModule } from 'primeng/primeng';


import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

import { SharedModule } from './../shared/shared.module';
import { LojasPesquisaComponent } from './lojas-pesquisa/lojas-pesquisa.component';
import { LojasCadastroComponent } from './lojas-cadastro/lojas-cadastro.component';
import { LojasRoutingModule } from './lojas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputMaskModule,
    PanelModule,
    ChartModule,

    SharedModule,
    LojasRoutingModule,
  ],
  declarations: [
    LojasCadastroComponent,
    LojasPesquisaComponent
  ],
  exports: []
})
export class LojasModule { }
