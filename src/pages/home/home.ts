import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carro } from '../../models/carro-models'
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { HttpErrorResponse } from '@angular/common/http';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public carros: Carro[];

  constructor(public _navCtrl: NavController, private carroService: CarrosServiceProvider,
    private _loadingCtrl: LoadingController, private _alertCtrl: AlertController) {}

  ionViewDidLoad() {

    let loading = this._loadingCtrl.create({
      content: "Aguarde carregamento"
    });

    loading.present();

    this.carroService.lista()
      .subscribe(
      (carros) => {this.carros = carros; loading.dismiss();},
      (err: HttpErrorResponse) => {
        loading.dismiss();

        this._alertCtrl.create({
          title: 'Erro com a conexão',
          subTitle: 'Tente novamente mais tarde',
          buttons: [{
            text : 'Ok'
          }]
        }).present();
      }
      )
    }

    selectCar(carro: Carro) {
      this._navCtrl.push(EscolhaPage.name, {
        carroSelect: carro
      });
    }
}
