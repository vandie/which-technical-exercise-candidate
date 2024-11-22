import fs from 'fs';
import { runRobot } from './robot-wrapper';

// If running this application directly from the commandline, expect a piped file to
// meet task requirements
const robotOtuput = runRobot(fs.readFileSync(0).toString());
console.log(JSON.stringify(robotOtuput, null, 2));
