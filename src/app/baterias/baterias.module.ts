import { BateriaPesquisaComponent } from './bateria-pesquisa/bateria-pesquisa.component';
import { BateriasRoutingModule } from './baterias-routing.module';
import { BateriaCadastroComponent } from './bateria-cadastro/bateria-cadastro.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

import { SharedModule } from './../shared/shared.module';


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
    BateriasRoutingModule
  ],
  declarations: [
    BateriaCadastroComponent,
    BateriaPesquisaComponent
  ],
  exports: []
})
export class BateriasModule { }
