import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task?: Task;
  @Output() deleteItemEmiter: EventEmitter<Task> = new EventEmitter();
  @Output() toggleItemEmiter: EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {}

  onDelete(task : Task){
    this.deleteItemEmiter.emit(task);
  }

  onToggle(task : Task){
    this.toggleItemEmiter.emit(task);
  }
}