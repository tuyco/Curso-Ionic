import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { UserDaoProvider } from '../../providers/user-dao/user-dao';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = 'sauloddiniz@gmail.comm';
  senha: string = 'merda22';
  alert: Alert;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userDao: UserDaoProvider,
    private _alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

  }

  public getUser() {

    this.alert = this._alertCtrl.create({
      title: 'Erro de login',
      buttons:[{
        text: 'Ok'
      }]
    });

    if(!this.email || !this.senha) {
      this.alert.setSubTitle('Usuario e Senha obrigatórios')
      this.alert.present();
      return;
    }

    return this.userDao.getUserLogin(this.email, this.senha)
    .subscribe(
      () => {
        this.navCtrl.setRoot(HomePage);
      },
      () => {
        this.alert.setSubTitle('Usuario e Senha invalidos')
        this.alert.present();
      }
    );
  }

}
