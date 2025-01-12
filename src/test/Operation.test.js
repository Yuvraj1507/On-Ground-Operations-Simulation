import { expect, test } from 'vitest';
import { Operation } from '../models/Operation.js';
import { Task } from '../models/Task.js';

test('Operation simulation executes tasks in correct order', () => {
  const operation = new Operation('Test Operation');
  
  const task1 = new Task('task1', 'First task', 5);
  const task2 = new Task('task2', 'Second task', 3, ['task1']);
  const task3 = new Task('task3', 'Third task', 4, ['task2']);
  
  operation.addTask(task1);
  operation.addTask(task2);
  operation.addTask(task3);
  
  const timeline = operation.simulate();
  
  expect(timeline.length).toBe(3);
  expect(timeline[0].taskId).toBe('task1');
  expect(timeline[1].taskId).toBe('task2');
  expect(timeline[2].taskId).toBe('task3');
});