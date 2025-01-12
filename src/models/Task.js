export class Task {
  constructor(id, description, duration, dependencies = []) {
    this.id = id;
    this.description = description;
    this.duration = duration; // in minutes
    this.dependencies = dependencies;
    this.status = 'pending';
    this.startTime = null;
    this.endTime = null;
  }

  start() {
    this.status = 'in-progress';
    this.startTime = new Date();
  }

  complete() {
    this.status = 'completed';
    this.endTime = new Date();
  }

  getExecutionTime() {
    if (!this.startTime || !this.endTime) return 0;
    return (this.endTime - this.startTime) / 1000 / 60; // in minutes
  }
}