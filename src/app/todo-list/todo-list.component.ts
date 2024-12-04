import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  task: string = ''; // Tarefa digitada pelo usuário
  tasks: { name: string; done: boolean }[] = []; // Lista de tarefas

  constructor() {}

  ngOnInit(): void {
    this.loadTasks(); // Carrega as tarefas do localStorage ao iniciar
  }

  // Adiciona uma nova tarefa
  addTask(): void {
    if (this.task.trim()) {
      this.tasks.push({ name: this.task.trim(), done: false });
      this.task = ''; // Limpa o campo de entrada
      this.saveTasks(); // Salva no localStorage
    }
  }

  // Remove uma tarefa da lista
  deleteTask(taskToDelete: { name: string; done: boolean }): void {
    this.tasks = this.tasks.filter(task => task !== taskToDelete);
    this.saveTasks(); // Atualiza o localStorage
  }

  // Salva as tarefas no localStorage
  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Carrega as tarefas do localStorage
  loadTasks(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }
}
