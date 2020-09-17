import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Checkbox } from 'ionic-angular';
import { Carro } from '../../models/carro-models';
import { CadastroPage } from '../cadastro/cadastro';

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  carro: Carro;
  acessorios = [];
  private _precoTotal: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
      this.carro = this.navParams.get('carroSelect');
    }


    ionViewDidLoad() {
      this._precoTotal = this.carro.preco;

      this.acessorios = [
        {nome: 'Freio ABS', preco: 800},
        {nome: 'Ar condicionado',  preco: 1000},
        {nome: 'MP3 Player',  preco: 500}
      ]
  };

  somaValorAcessorio(checkbox: Checkbox, preco: number) {
    checkbox.value ?  this._precoTotal += preco:
                      this._precoTotal -= preco;
  }

  get precoTotal() {
    return this._precoTotal;
  }

  avancarCadastro() {
    this.navCtrl.push(CadastroPage.name, {
      carroSelect: this.carro,
      valorTotal: this._precoTotal
    });
  }

}
