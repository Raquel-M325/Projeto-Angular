import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from '@openng/optimus-ui/button';
import { TableModule } from '@openng/optimus-ui/table';
import { Instrumento } from './models/instrumento';
import { FormsModule } from '@angular/forms';
import { CardModule } from '@openng/optimus-ui/card';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { InputNumberModule } from '@openng/optimus-ui/inputnumber';
import { DatePickerModule } from '@openng/optimus-ui/datepicker';
import { CheckboxModule } from '@openng/optimus-ui/checkbox';
import { DatePipe } from '@angular/common';

@Component({
  imports: [RouterOutlet, Button, TableModule, FormsModule, CardModule, InputTextModule, InputNumberModule, DatePickerModule, CheckboxModule, DatePipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})


export class App {
  protected readonly title = signal('atividade');

  adicionarInstrumento() {
    if (this.nome && this.preco > 0 && this.dataAquisicao) {
      const novoInstrumento: Instrumento = {
        id: this.instrumentos.length + 1,
        nome: this.nome,
        preco: this.preco,
        dataAquisicao: new Date(this.dataAquisicao),
        disponivel: this.disponivel,
      };

      this.instrumentos.push(novoInstrumento);

    } else {
      alert('Por favor, preencha todos os campos antes de adicionar o instrumento.');
    }
  }

  verificarDisponibilidade(instrumento: Instrumento) {
    if (instrumento.disponivel === true) {
      return 'Sim';
    } else {
      return 'Não';
    }
  }

  excluirInstrumento(instrumento: Instrumento) {
    //ele filtra todos os que forem diferentes ao que escolhi
    this.instrumentos = this.instrumentos.filter((i) => i.id !== instrumento.id);
    alert('Instrumento excluído com sucesso.');

  }

  editarInstrumento(instrumento: Instrumento) {
    this.editandoInstrumento = instrumento;
    this.nome = instrumento.nome;
    this.preco = instrumento.preco;
    this.dataAquisicao = instrumento.dataAquisicao.toISOString().split('T')[0];
    this.disponivel = instrumento.disponivel;

  }

  salvarEdicao() {
    if (this.editandoInstrumento && this.nome && this.preco > 0 && this.dataAquisicao !== null) {
      this.editandoInstrumento.nome = this.nome;
      this.editandoInstrumento.preco = this.preco;
      this.editandoInstrumento.dataAquisicao = new Date(this.dataAquisicao);
      this.editandoInstrumento.disponivel = this.disponivel;

      alert('Instrumento editado com sucesso.');

      this.editandoInstrumento = null; //zera a edicao

    }
  }

  detalhesInstrumento(instrumento: Instrumento) {
    this.instrumentoSelecionado = instrumento;
  }

  //variaveis vazias 
  nome = '';
  preco = 0;
  dataAquisicao = '';
  disponivel = false;
  editandoInstrumento: Instrumento | null = null;
  instrumentoSelecionado: Instrumento | null = null;

  //lista de instrumentos
  instrumentos: Instrumento[] = [
    { id: 1, nome: 'Violão', preco: 1500, dataAquisicao: new Date('2022-01-15'), disponivel: true },
    { id: 2, nome: 'Piano', preco: 5000, dataAquisicao: new Date('2021-05-10'), disponivel: false },
  ];
}
