import { AgendamentosServiceProvider } from './../../providers/agendamentos-service/agendamentos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { Carro } from '../../models/carro-models';
import { Agendamento } from '../../models/agenda-models';
import { HomePage } from '../home/home';
import { HttpErrorResponse } from '@angular/common/http';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;
  public agendamento: Agendamento = new Agendamento();

  private alert: Alert;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private agendaService: AgendamentosServiceProvider, private _alertCtrl: AlertController,
    private agendamentoDAO: AgendamentoDaoProvider, private viber: Vibration) {

      this.carro = this.navParams.get('carroSelect');
      this.precoTotal = this.navParams.get('valorTotal');
      this.agendamento.modelo = this.carro.nome;
  }

  ionViewDidLoad() {
  }

  submitAgenda() {


    if(!this.agendamento.nome || !this.agendamento.endereco || !this.agendamento.emailCliente || !this.agendamento.data) {

      this.viber.vibrate(1000);

      this._alertCtrl.create({
        title: 'Aviso',
        subTitle: 'Campo a ser preenchido',
        buttons: [
          {text: 'Ok'}
        ]
      }).present();
      return;
    }

    this.alert = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        {text: 'Ok', handler: () => {this.navCtrl.setRoot(HomePage)}}
      ]
    })

    this.agendamentoDAO.ehDuplicado(this.agendamento)
        .mergeMap(ehDuplicado => {
          if(ehDuplicado) {
            throw new Error('informa erro se cadastro já existir')
          }
          return this.agendaService.salvar(this.agendamento)
        })
        .mergeMap((valor) => {
          let observable = this.agendamentoDAO.salvar(this.agendamento);
          if(valor instanceof Error) {
            throw valor;
          }
          return observable;
        }
        )
        .subscribe(
          (onSuccess) => {
            this.alert.setSubTitle('Agendamento realizado');
            this.alert.present();
          },
          (onErr: HttpErrorResponse) => {
            this.alert.setSubTitle(onErr.message);
            this.alert.present();}
            );
          }
}
