import { BateriaPesquisaComponent } from './bateria-pesquisa/bateria-pesquisa.component';
import { BateriaCadastroComponent } from './bateria-cadastro/bateria-cadastro.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';



const routes: Routes = [
  {
    path: 'baterias',
    component: BateriaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
  },
  {
    path: 'baterias/nova',
    component: BateriaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  },
  {
    path: 'baterias/:codigo',
    component: BateriaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BateriasRoutingModule { }
