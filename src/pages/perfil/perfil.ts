import { Camera, CameraOptions } from '@ionic-native/camera';
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

  foto: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userDAO:  UserDaoProvider, private camera: Camera) {
  }

  ionViewDidLoad() {

  }

  get userLogin():User {
    return this.userDAO.getUser();
  }

  tirarFoto() {
    const  optionCamera: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera
      .getPicture(optionCamera)
      .then(imageData => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.userDAO.salvarAvatar(base64Image);
    })
      .catch(err => {
        console.log(err)
      });
  }

  get avatar() {
    return this.userDAO.obtemAvatar();
  }

}
