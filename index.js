#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
console.log(chalk.bold.green('Welcome to the TNA CLI Countdown Timer!'));
const { time } = await inquirer.prompt([
    {
        type: 'input',
        name: 'time',
        message: 'Enter the countdown time in hours, minutes, and seconds (HH:MM:SS):',
        validate: (input) => {
            const [hours, minutes, seconds] = input.split(':');
            if (!hours || !minutes || !seconds) {
                return 'Please enter a valid time in HH:MM:SS format.';
            }
            if (isNaN(Number(hours)) || isNaN(Number(minutes)) || isNaN(Number(seconds))) {
                return 'Please enter a valid time in HH:MM:SS format.';
            }
            return true;
        },
    },
]);
const [hours, minutes, seconds] = time.split(':');
let timeInSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
console.log(chalk.bold(`Countdown started for ${hours} hours, ${minutes} minutes, and ${seconds} seconds!`));
while (timeInSeconds > 0) {
    const hoursLeft = Math.floor(timeInSeconds / 3600);
    const minutesLeft = Math.floor((timeInSeconds % 3600) / 60);
    const secondsLeft = timeInSeconds % 60;
    console.log(chalk.yellow(`Time left: ${hoursLeft} hours, ${minutesLeft} minutes, and ${secondsLeft} seconds`));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    timeInSeconds--;
}
console.log(chalk.green('Countdown finished!'));
