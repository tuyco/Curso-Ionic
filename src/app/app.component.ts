import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListarAgendamentoPage } from '../pages/listar-agendamento/listar-agendamento';
import { PerfilPage } from '../pages/perfil/perfil';
import { UserDaoProvider } from '../providers/user-dao/user-dao';
import { User } from '../models/user-models';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  @ViewChild(Nav) public nav:  Nav;
  public paginas = [
    {'Titulo': 'Agendamento', conteudo: ListarAgendamentoPage.name, icon: 'calendar'},
    {'Titulo': 'Perfil', conteudo: PerfilPage.name, icon: 'person'},
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private userDAO:  UserDaoProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToPage(component) {
    this.nav.push(component);
  }

  get userLogin(): User {
    return this.userDAO.getUser();
  }

  get avatar() {
    return this.userDAO.obtemAvatar();
  }
}

