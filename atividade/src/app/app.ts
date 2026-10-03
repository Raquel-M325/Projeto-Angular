import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from '@openng/optimus-ui/button';
import { TableModule } from '@openng/optimus-ui/table';
import { Instrumento } from './models/instrumento';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet, Button, TableModule, FormsModule],
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

  nome = '';
  preco = 0;
  dataAquisicao = '';
  disponivel = false;

  instrumentos: Instrumento[] = [
    { id: 1, nome: 'Violão', preco: 1500, dataAquisicao: new Date('2022-01-15'), disponivel: true },
    { id: 2, nome: 'Piano', preco: 5000, dataAquisicao: new Date('2021-05-10'), disponivel: false },
  ];
}


