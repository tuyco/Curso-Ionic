import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Agendamento } from '../../models/agenda-models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private storage: Storage) {
  }

  private gerarChave(agendamento: Agendamento){
    return agendamento.emailCliente + agendamento.data.substr(0,10);
  }

  public salvar(agendamento: Agendamento) {
    let promise = this.storage.set(this.gerarChave(agendamento),  agendamento);

    return Observable.fromPromise(promise);
  }

  ehDuplicado(agendamento: Agendamento) {
    let chave = this.gerarChave(agendamento);
    let promise = this.storage.get(chave)
    .then(agendamentoCadastrado => {return agendamentoCadastrado ? true : false});

    return Observable.fromPromise(promise);
  }

  listarTodos() {
    let agendamentos: Agendamento[] = [];
    let promise = this.storage.forEach((agendamento: Agendamento) => {
      agendamentos.push(agendamento)
    }).then(()=> agendamentos)
    return Observable.fromPromise(promise);
  }

  getAgendamentoById(agendamentoId) {
    let promise =  this.storage.get(agendamentoId);
    return Observable.fromPromise(promise);
  }
}
