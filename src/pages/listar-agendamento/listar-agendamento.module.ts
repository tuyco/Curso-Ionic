import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarAgendamentoPage } from './listar-agendamento';

@NgModule({
  declarations: [
    ListarAgendamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarAgendamentoPage),
  ],
  exports: [
    ListarAgendamentoPage
  ]
})
export class ListarAgendamentoPageModule {}
