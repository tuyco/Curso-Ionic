import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agendamento } from '../../models/agenda-models';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AgendamentosServiceProvider {

  constructor(public http: HttpClient) {}

  salvar(agendamento: Agendamento) {
    return this.http.post('http://192.168.1.130:8181/api/agendamento/agenda', agendamento)
                    .do(() => {agendamento.enviado = true; console.log('Passou aqui')})
                    .catch((err)=> Observable.of(new Error('informa erro se não consegue salvar no banco')));
  }
}
