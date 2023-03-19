import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';
import { LojasPesquisaComponent } from './lojas-pesquisa/lojas-pesquisa.component';
import { LojasCadastroComponent } from './lojas-cadastro/lojas-cadastro.component';

const routes: Routes = [
  {
    path: 'lojas',
    component: LojasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LOJA'] }
  },
  {
    path: 'lojas/nova',
    component: LojasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LOJA'] }
  },
  {
    path: 'lojas/:codigo',
    component: LojasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LOJA'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LojasRoutingModule { }
