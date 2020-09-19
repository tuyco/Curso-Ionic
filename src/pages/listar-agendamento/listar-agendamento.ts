import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../../models/agenda-models';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

@IonicPage()
@Component({
  selector: 'page-listar-agendamento',
  templateUrl: 'listar-agendamento.html',
})
export class ListarAgendamentoPage {

  alert: Alert;
  agendamentos: Agendamento[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private agendamentoDAO: AgendamentoDaoProvider,
    private agendamentoService: AgendamentosServiceProvider,
    private _alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.agendamentoDAO.listarTodos()
    .subscribe((agendamentos:Agendamento[]) => this.agendamentos = agendamentos);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.atualizadaAgendamentos();
    }, 10000);
  }

  private atualizadaAgendamentos() {
    this.agendamentos
      .filter((agendamento: Agendamento) => {agendamento.confirmado})
      .forEach((agendamento: Agendamento) => {
        agendamento.visualizado = true;
        this.agendamentoDAO.salvar(agendamento);
      })
  }

  reenviarAgendamento(agendamento: Agendamento) {

    console.log('Reenvio',agendamento)

    this.alert = this._alertCtrl.create({
      title: 'Reenvio',
      buttons: [{
        text: 'Ok'
      }]
    })

    this.agendamentoService.salvar(agendamento)
    .mergeMap(() => this.agendamentoDAO.salvar(agendamento))
    .subscribe(
      (onSuccess) => {
        this.alert.setSubTitle('Efetuado com sucesso');
        this.alert.present();
        this
      },
      (onErr) => {
        this.alert.setSubTitle('Não efetuado');
        this.alert.present();
      }
      );
  }

}
