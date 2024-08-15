import { Component, OnInit } from '@angular/core';
import { ConexaoApiService } from '../../service/conexao-api.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  users: any[] = [];  // Array que armazena os usuários
  currentUser: any = {};  // Armazena o usuário atual 
  editIndex: number | null = null;  // Índice do usuário sendo editado
  MessageValidationCpf: string = ''; // menssagem da validação do cpf
  ValidationCpf: boolean = false; // validação

  ngOnInit() {
    this.loadFromLocalStorage();  // Carrega dados do localStorage ao iniciar
  }
  constructor(private apiService: ConexaoApiService) { }

  onSubmit(form: any) {
    const user = form.value;
    user.idade = this.calculateAge(new Date(user.data));
  
    // Verificar se o CPF é válido antes de salvar o usuário
    this.ValidationCpf = true;
    this.apiService.ValidateCpf(user.cpf).subscribe(
      (response: any) => {
        this.ValidationCpf = false;
        
        // Adicione um log para verificar a resposta
        console.log('Resposta da API:', response);
  
        // Ajuste a validação de acordo com a estrutura da resposta
        if (response && response.valid) {
          // CPF é válido, salva o usuário
          if (this.editIndex !== null) {
            this.users[this.editIndex] = user;  // Atualiza o usuário existente no array
            this.editIndex = null;
          } else {
            this.users.push(user);  // Adiciona um novo usuário ao array
          }
  
          this.saveToLocalStorage();  // Salva os dados no localStorage
          form.reset();  // Reseta o formulário após submissão
          this.currentUser = {};  // Limpa o objeto de edição
          this.MessageValidationCpf = '';  // Limpa a mensagem de validação
        } else {
          // CPF inválido, exibe mensagem de erro
          this.MessageValidationCpf = 'CPF inválido!';
        }
      },
      (error) => {
        console.error('Erro ao validar CPF:', error);
        this. ValidationCpf = false;
        this.MessageValidationCpf = 'Erro ao validar o CPF. Tente novamente mais tarde.';
      }
    );
  }
  
  calculateAge(birthDate: Date): number { //função que calcula idade
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  }

  saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users)); // salva no localStorage
  }

  loadFromLocalStorage() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  editUser(index: number) {
    // Preenche o formulário com os dados do usuário a ser editado
    this.currentUser = { ...this.users[index] };  // Faz uma cópia dos dados para edição
    this.editIndex = index;  // Define o índice do usuário a ser editado
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);  // Remove o usuário do array
    this.saveToLocalStorage();    // Atualiza o localStorage
  }
}
