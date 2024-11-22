import { Robot } from './classes/robot';
import { validateAndNormaliseRobotInput } from './types/input';
import { RobotState } from './types/robot-state';

export function runRobot(robotInput: unknown) {
  if (typeof robotInput === 'string') robotInput = JSON.parse(robotInput);
  if (!validateAndNormaliseRobotInput(robotInput)) return { status: 'error' };

  const robot = new Robot(robotInput);

  for (const instruction of robotInput.directions) {
    robot.instruct(instruction);
    if (robot.state != RobotState.Ok) break;
  }

  return robot.toOutputMessage();
}
