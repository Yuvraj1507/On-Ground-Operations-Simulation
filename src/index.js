import chalk from 'chalk';
import { Operation } from './models/Operation.js';
import { Task } from './models/Task.js';

// Scenario 1: Hotel Group Check-in Process
const hotelGroupCheckIn = new Operation('Hotel Group Check-in Process');
const hotelTasks = [
  new Task('group-arrival', 'Tour group arrives at hotel', 10),
  new Task('document-collection', 'Collect group documents', 15, ['group-arrival']),
  new Task('room-list-verification', 'Verify room allocation list', 8, ['group-arrival']),
  new Task('key-preparation', 'Prepare room key cards in bulk', 12, ['room-list-verification']),
  new Task('welcome-drinks', 'Serve welcome drinks', 10, ['group-arrival']),
  new Task('luggage-sorting', 'Sort group luggage by room numbers', 20, ['room-list-verification']),
  new Task('room-distribution', 'Distribute room keys to guests', 15, ['key-preparation', 'document-collection']),
  new Task('luggage-delivery', 'Deliver luggage to rooms', 25, ['luggage-sorting', 'room-distribution'])
];

// Scenario 2: Flight Transfer Operation
const flightTransfer = new Operation('Airport Transfer Operation');
const transferTasks = [
  new Task('flight-landing', 'Flight lands at airport', 5),
  new Task('passenger-count', 'Count and verify all passengers', 10, ['flight-landing']),
  new Task('luggage-collection', 'Collect luggage from carousel', 25, ['flight-landing']),
  new Task('immigration-process', 'Process immigration for group', 30, ['flight-landing']),
  new Task('bus-preparation', 'Prepare transfer buses', 15, ['flight-landing']),
  new Task('luggage-loading', 'Load luggage into buses', 20, ['luggage-collection', 'bus-preparation']),
  new Task('passenger-boarding', 'Board passengers onto buses', 15, ['immigration-process', 'bus-preparation']),
  new Task('transfer-to-hotel', 'Transfer to hotel', 45, ['luggage-loading', 'passenger-boarding'])
];

// Simulate Hotel Check-in Process
console.log(chalk.blue.bold('\nSimulating Hotel Group Check-in Process\n'));
hotelTasks.forEach(task => hotelGroupCheckIn.addTask(task));
const hotelTimeline = hotelGroupCheckIn.simulate();

console.log(chalk.yellow('Hotel Check-in Timeline:'));
hotelTimeline.forEach(event => {
  console.log(chalk.green(`${event.time} mins: ${event.description}`));
});
console.log(chalk.yellow('\nTotal Hotel Check-in Time:', hotelTimeline[hotelTimeline.length - 1].time, 'minutes'));

// Simulate Flight Transfer Process
console.log(chalk.blue.bold('\n\nSimulating Airport Transfer Operation\n'));
transferTasks.forEach(task => flightTransfer.addTask(task));
const transferTimeline = flightTransfer.simulate();

console.log(chalk.yellow('Transfer Operation Timeline:'));
transferTimeline.forEach(event => {
  console.log(chalk.green(`${event.time} mins: ${event.description}`));
});
console.log(chalk.yellow('\nTotal Transfer Time:', transferTimeline[transferTimeline.length - 1].time, 'minutes'));