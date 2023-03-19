import { CategoriaProdutoModule } from './categoria-produto/categoria-produto.module';



import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { InvestimentosModule } from './investimentos/investimentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { VendasModule } from './vendas/vendas.module';
import { BateriasModule } from './baterias/baterias.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { LojasModule } from './lojas/lojas.module'
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';







@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    LancamentosModule,
    PessoasModule,
    SegurancaModule,
    BateriasModule,
    VendasModule,
    LojasModule,
    DashboardModule,
    InvestimentosModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
