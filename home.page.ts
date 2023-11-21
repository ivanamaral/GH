import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  resultado: string = '0';
  checa_operador: boolean = false;
  comeca_segundo_elemento: boolean = false;
  resultado_concluido: boolean = false;
  primeiro_elemento: string = '';
  segundo_elemento: string = '';
  operador_selecionado: string = '';
  memoria: string = '';
  guarda_resultado: string = '';

  constructor() { }

  digito(valor: string) {
    if (this.resultado_concluido) {
      this.resultado = valor;
      this.resultado_concluido = false;
      this.checa_operador = false;
      this.segundo_elemento = "";
    } else {
      if (this.comeca_segundo_elemento) {
        if (!this.segundo_elemento.includes('.')) {
          this.segundo_elemento = this.segundo_elemento + valor;
          this.resultado = this.resultado + valor;
        } else if (this.segundo_elemento.includes('.')) {
          this.segundo_elemento = this.segundo_elemento + valor;
          this.resultado = this.resultado + valor;
          if (valor == '.') {
            this.resultado = this.resultado.slice(0, this.resultado.length - 1);
            this.segundo_elemento = this.segundo_elemento.slice(0, this.segundo_elemento.length - 1);
          }
        }
      } else {
        if (this.resultado == "0") {
          if (valor == '.'){
            this.resultado = '0' + valor;
          } else {
            this.resultado = valor;
          }
        } else {
          if (!this.resultado.includes('.')) {
            this.resultado = this.resultado + valor;
          } else if (this.resultado.includes('.')) {
            this.resultado = this.resultado + valor;
            if (valor == '.') {
              this.resultado = this.resultado.slice(0, this.resultado.length - 1);
            }
          }
        }
      }
    }
  }

  negativo() {
    if (this.checa_operador == false) {
      this.resultado = (parseFloat(this.resultado) * (-1)).toString();
    } else if (this.resultado_concluido == true) {
      this.resultado = (parseFloat(this.resultado) * (-1)).toString();
      this.guarda_resultado = this.resultado;
    } else if (this.checa_operador == true && this.segundo_elemento != '') {
      this.segundo_elemento = (parseFloat(this.segundo_elemento) * (-1)).toString();
      this.resultado = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento;
    }

  }

  operador(valor: string) {
    if (this.resultado_concluido) {
      this.resultado = this.guarda_resultado;
      this.resultado_concluido = false;
      this.checa_operador = false;
      this.segundo_elemento = "";
      this.resultado_concluido = false;
    }
    if (!this.checa_operador) {
      this.primeiro_elemento = this.resultado;
      this.resultado += valor;
      this.checa_operador = true;
      this.comeca_segundo_elemento = true;
      this.operador_selecionado = valor;
    }

  }

  redefinir() {
    this.resultado = "0";
    this.checa_operador = false;
    this.primeiro_elemento = '';
    this.segundo_elemento = '';
    this.operador_selecionado = '';
    this.comeca_segundo_elemento = false;
    this.memoria = '';
    this.guarda_resultado = '';
  }

  apagar() {
    if (!this.resultado.includes('+' || '-' || '*' || '/' || '^')) {
      this.resultado = this.resultado.slice(0, this.resultado.length - 1);
      this.checa_operador = false;
    }
    if (this.resultado.includes('+' || '-' || '*' || '/' || '^')) {
      this.resultado = this.resultado.slice(0, this.resultado.length - 1);
      this.segundo_elemento = this.segundo_elemento.slice(0, this.segundo_elemento.length - 1);
      if (!this.resultado.includes('+' || '-' || '*' || '/' || '^')) {
        this.checa_operador = false;
        this.segundo_elemento = '';
      }
    }
  }

  calcular() {
    if (this.segundo_elemento == '') {
      this.memoria = 'Formato inválido';
      this.resultado = '';
      this.checa_operador = false;
      this.primeiro_elemento = '';
      this.segundo_elemento = '';
      this.operador_selecionado = '';
      this.comeca_segundo_elemento = false;
    }
    if (this.operador_selecionado == "+" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) + parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + "=" + this.resultado;
      this.resultado_concluido = true;
      this.guarda_resultado = this.resultado;
    } else if (this.operador_selecionado == "-" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) - parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + "=" + this.resultado;
      this.resultado_concluido = true;
      this.guarda_resultado = this.resultado;
    } else if (this.operador_selecionado == "*" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + "=" + this.resultado;
      this.resultado_concluido = true;
      this.guarda_resultado = this.resultado;
    } else if (this.operador_selecionado == "/" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) / parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + "=" + this.resultado;
      if (this.resultado == 'Infinity') {
        this.memoria = 'Impossível dividir por 0';
        this.resultado = '';
        this.checa_operador = false;
        this.primeiro_elemento = '';
        this.segundo_elemento = '';
        this.operador_selecionado = '';
        this.comeca_segundo_elemento = false;
      }
      this.resultado_concluido = true;
      this.guarda_resultado = this.resultado;
    } else if (this.operador_selecionado == "^" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) ** parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + "=" + this.resultado;
      this.resultado_concluido = true;
      this.guarda_resultado = this.resultado;
    }
  }
}