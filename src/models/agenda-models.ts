export class Agendamento {
  constructor(
    public nome?: String,
    public emailCliente?: string,
    public endereco?:  string,
    public data?: string,
    public modelo?: string,
    public enviado?: boolean,
    public confirmado?: boolean
  ){}
}