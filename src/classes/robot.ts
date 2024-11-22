import { convertHeadingToString, Heading } from '../types/heading';
import { RobotInput } from '../types/input';
import { Instruction } from '../types/instructions';
import { RobotOutput } from '../types/output';
import { RobotState } from '../types/robot-state';
import { Vec2 } from './vec2';

export class Robot {
  arena: Vec2[];
  position: Vec2;
  heading: Heading;
  path: string[];
  state: RobotState;

  constructor(input: RobotInput) {
    this.arena = [input.arena.corner1, input.arena.corner2];
    this.position = input.location;
    this.heading = input.heading;
    this.path = [];
    this.state = RobotState.Ok;
  }

  /**
   * Attempts to carry out an instruction
   * @param instruction An instruction to carry out
   */
  instruct(instruction: string) {
    // Reset the state
    this.state = RobotState.Ok;
    // Push the instruction to our history
    this.path.push(instruction);
    // Check if this is a valid instruction, if not set the state to error
    if (!(Object.values(Instruction) as string[]).includes(instruction)) {
      this.state = RobotState.Error;
      return;
    }

    if (instruction === Instruction.Forward) this.forwards();
    if (instruction === Instruction.Left || instruction == Instruction.Right) this.turn(instruction);
  }

  /**
   * Turns the robot either left or right
   * @param dir The direction to turn (Left, Right)
   */
  turn(dir: Instruction.Left | Instruction.Right) {
    let newHeading = this.heading as number;
    if (dir == Instruction.Left) {
      newHeading -= 1;
    } else {
      newHeading += 1;
    }
    if (newHeading === -1) newHeading = 3;
    if (newHeading === 4) newHeading = 0;
    this.heading = newHeading;
  }

  /**
   * Moves the robot forwards if possible. If the move would result in a crash, labels the robot as crashed
   * and does not move forwards
   */
  forwards() {
    const position = new Vec2(this.position.x, this.position.y);
    const travelDirection = [new Vec2(0, 1), new Vec2(1, 0), new Vec2(0, -1), new Vec2(-1, 0)][this.heading];
    position.move(travelDirection);
    if (!position.within(this.arena[0], this.arena[1])) {
      this.state = RobotState.Crash;
      return;
    }
    this.position = position;
  }

  /**
   * Converts the robots current state into an output message
   * @param error Was there an error that needs to be handled seperately
   * @returns Standard Robot Output Message
   */
  toOutputMessage(): RobotOutput {
    return {
      status: this.state,
      location: { x: this.position.x, y: this.position.y },
      heading: convertHeadingToString(this.heading),
      path: this.path,
    };
  }
}
