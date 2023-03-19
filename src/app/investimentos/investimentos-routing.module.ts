import { InvestimentosPesquisaComponent } from './investimentos-pesquisa/investimentos-pesquisa.component';
import { InvestimentosCadastroComponent } from './investimentos-cadastro/investimentos-cadastro.component';


import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';



const routes: Routes = [
  {
    path: 'investimentos',
    component: InvestimentosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_INVESTIMENTO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InvestimentosRoutingModule { }
