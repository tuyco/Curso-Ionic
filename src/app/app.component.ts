import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListarAgendamentoPage } from '../pages/listar-agendamento/listar-agendamento';
import { PerfilPage } from '../pages/perfil/perfil';
import { UserDaoProvider } from '../providers/user-dao/user-dao';
import { User } from '../models/user-models';
import { OneSignal, OSNotification } from '@ionic-native/onesignal';
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../models/agenda-models';

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

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private userDAO: UserDaoProvider, private oneSignal: OneSignal, private agendamentoDAO: AgendamentoDaoProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.initOneSignal();

      // let iosConfigs = {
      //   kOSSettingsKeyAutoPrompt: true,
      //   kOSSetiingsKeyInAppLaunchURL: false
      // };

      // this.oneSignal
      // .startInit('c66673ef-8eda-4f43-9e3a-08652d90190a', '263586346145')
      // .iosSettings(iosConfigs);

      // this.oneSignal.inFocusDisplaying(
      //   this.oneSignal.OSInFocusDisplayOption.Notification
      // );

      // this.oneSignal.handleNotificationReceived()
      //               .subscribe(
      //                 (notificacao: OSNotification) => {

      //                   let dadosAdicionais  = notificacao.payload.additionalData;

      //                   let agendamentoId = dadosAdicionais['agendamento-id'];

      //                   this.agendamentoDAO.getAgendamentoById(agendamentoId)
      //                                       .subscribe(
      //                                         (agendamento: Agendamento) => {
      //                                           agendamento.confirmado = true;
      //                                           this.agendamentoDAO.salvar(agendamento);
      //                                         },
      //                                         () => {}
      //                                       )
      //                 },
      //               );

      // this.oneSignal.endInit();
    });


  }

  initOneSignal() {
    this.oneSignal.startInit('c66673ef-8eda-4f43-9e3a-08652d90190a', '263586346145');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived()
                  .subscribe((notificacao: OSNotification) => {
                    let dadosAdicionais  = notificacao.payload.additionalData;

                        let agendamentoId = dadosAdicionais['agendamento-id'];

                        this.agendamentoDAO.getAgendamentoById(agendamentoId)
                                            .subscribe(
                                              (agendamento: Agendamento) => {
                                                agendamento.confirmado = true;
                                                this.agendamentoDAO.salvar(agendamento);
                                              },
                                            )
                  });

    this.oneSignal.handleNotificationOpened()
                  .subscribe(() => {console.log('Notification opened.')});

    this.oneSignal.enableVibrate(true);
    this.oneSignal.enableSound(true);
    this.oneSignal.endInit();
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

