import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDaoProvider } from '../../providers/user-dao/user-dao';
import { User } from '../../models/user-models';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userDAO:  UserDaoProvider) {
  }

  ionViewDidLoad() {

  }

  get userLogin():User {
    return this.userDAO.getUser();
  }

}
