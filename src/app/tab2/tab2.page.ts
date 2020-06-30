import { Component } from '@angular/core';
import { evaluate } from 'mathjs';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public calculo = '';
  public resultado: string;

  private ponto = false;

  private operacoes = ['+', '-', '*', '/']
  // variável que impede adicionar operações constantemente 

  constructor(public alertController: AlertController) {}
  // utilizar as funções do alert

  public adicionarNumero(valor: string) {
  if(this.resultado) {
    this.apagarTudo;
  }
  // limpar para próximos cálculos

  this.calculo = this.calculo + valor;
  }

  public adicionarPonto() {
  if(this.ponto) {
    return;
  }

  this.calculo += ".";
  this.ponto = true;
  }
  // não permitir que ponto se repita

  public adicionarOperacao(operador: string) {

    if(this.resultado){
      this.calculo = this.resultado.toString();
      this.resultado = null;
    }
    // pular de linha

    const ultimo = this.calculo.slice(-1);
    if(this.operacoes.indexOf(ultimo) > -1) {
      return;
    }

    this.calculo += operador
    this.ponto = false // permitir que o ponto se repita após operações 
    }

    public apagarTudo(){
    this.calculo = '';
    this.resultado = null;
    this.ponto = false
    }

    public apagarUltimo() {
      const ultimo = this.calculo.slice(-1);
      if(ultimo == '.') {
        this.ponto = false;
      }
      // reconhecer que o último caractere foi um ponto

      this.calculo = this.calculo.slice(0, -1);
    }
    // método slice

    public calcularResultado() {
      try { 
      this.resultado = evaluate(this.calculo);
     }catch(e) {
       this.resultado = '';
       this.presentAlert(`ERRO!!!`, `Cálculo inválido, verifique!`);
     }
    }
    // obter resultados das operações 
    // try catch para avisar erros

    async presentAlert(titulo: string, mensagem: string) {
      const alert = await this.alertController.create({
       
        header: titulo,
        message: mensagem,
        buttons: ['OK']
      });
  
      await alert.present();
    }
    // configurações do alert

}
