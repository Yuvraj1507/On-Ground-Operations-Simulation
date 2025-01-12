import { Task } from './Task.js';

export class Operation {
  constructor(name) {
    this.name = name;
    this.tasks = new Map();
    this.timeline = [];
  }

  addTask(task) {
    this.tasks.set(task.id, task);
  }

  getReadyTasks() {
    return Array.from(this.tasks.values()).filter(task => {
      if (task.status !== 'pending') return false;
      return task.dependencies.every(depId => 
        this.tasks.get(depId)?.status === 'completed'
      );
    });
  }

  simulate() {
    let currentTime = 0;
    let completedTasks = 0;

    while (completedTasks < this.tasks.size) {
      const readyTasks = this.getReadyTasks();
      
      if (readyTasks.length === 0 && completedTasks < this.tasks.size) {
        console.log('Warning: Possible deadlock detected');
        break;
      }

      for (const task of readyTasks) {
        task.start();
        currentTime += task.duration;
        task.complete();
        completedTasks++;
        
        this.timeline.push({
          time: currentTime,
          taskId: task.id,
          description: task.description
        });
      }
    }

    return this.timeline;
  }
}