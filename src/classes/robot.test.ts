import { describe, expect, test } from '@jest/globals';
import { RobotInput } from '../types/input';
import { Heading } from '../types/heading';
import { Vec2 } from './vec2';
import { Robot } from './robot';
import { Instruction } from '../types/instructions';
import { RobotState } from '../types/robot-state';

describe('Robot', () => {
  test('can process forward instructions', () => {
    const config: RobotInput = {
      arena: {
        corner1: new Vec2(-2, -2),
        corner2: new Vec2(2, 2),
      },
      location: new Vec2(0, 0),
      heading: Heading.North,
      directions: [],
    };

    const robot = new Robot(config);
    expect(robot.position).toEqual(config.location);
    expect(robot.heading).toEqual(config.heading);
    robot.forwards();
    expect(robot.position).toEqual(new Vec2(0, 1));
  });

  test('can process turn instructions', () => {
    const config: RobotInput = {
      arena: {
        corner1: new Vec2(-2, -2),
        corner2: new Vec2(2, 2),
      },
      location: new Vec2(0, 0),
      heading: Heading.North,
      directions: [],
    };

    const robot = new Robot(config);
    robot.turn(Instruction.Right);
    expect(robot.heading).toEqual(Heading.East);
    robot.turn(Instruction.Right);
    expect(robot.heading).toEqual(Heading.South);
    robot.turn(Instruction.Right);
    expect(robot.heading).toEqual(Heading.West);
    robot.turn(Instruction.Right);
    expect(robot.heading).toEqual(Heading.North);
    robot.turn(Instruction.Left);
    expect(robot.heading).toEqual(Heading.West);
  });

  test('can process instructions via instruct method', () => {
    const config: RobotInput = {
      arena: {
        corner1: new Vec2(-2, -2),
        corner2: new Vec2(2, 2),
      },
      location: new Vec2(0, 0),
      heading: Heading.North,
      directions: [],
    };

    const robot = new Robot(config);
    expect(robot.position).toEqual(config.location);
    expect(robot.heading).toEqual(config.heading);
    robot.instruct(Instruction.Forward);
    expect(robot.position).toEqual(new Vec2(0, 1));
    robot.instruct(Instruction.Right);
    expect(robot.heading).toEqual(Heading.East);
  });

  test('knows when it has crashed', () => {
    const config: RobotInput = {
      arena: {
        corner1: new Vec2(-2, -2),
        corner2: new Vec2(2, 2),
      },
      location: new Vec2(1, 1),
      heading: Heading.East,
      directions: [],
    };
    const robot = new Robot(config);
    expect(robot.position).toEqual(new Vec2(1, 1));
    expect(robot.state).toBe('ok');
    robot.instruct(Instruction.Forward);
    expect(robot.position).toEqual(new Vec2(2, 1));
    expect(robot.state).toBe('ok');
    robot.instruct(Instruction.Forward);
    expect(robot.position).toEqual(new Vec2(2, 1));
    expect(robot.state).toBe('crash');
  });

  test('creates valid output if theres an error', () => {
    const config: RobotInput = {
      arena: {
        corner1: new Vec2(-2, -2),
        corner2: new Vec2(2, 2),
      },
      location: new Vec2(0, 0),
      heading: Heading.East,
      directions: [],
    };
    const robot = new Robot(config);
    robot.instruct(Instruction.Forward);
    robot.instruct(Instruction.Forward);
    expect(robot.toOutputMessage()).toEqual({
      status: 'ok',
      heading: 'east',
      location: { x: 2, y: 0 },
      path: ['forward', 'forward'],
    });
    robot.state = RobotState.Error;
    expect(robot.toOutputMessage()).toEqual({
      status: 'error',
      heading: 'east',
      location: { x: 2, y: 0 },
      path: ['forward', 'forward'],
    });
    robot.state = RobotState.Ok;
    robot.instruct(Instruction.Forward);
    expect(robot.toOutputMessage()).toEqual({
      status: 'crash',
      heading: 'east',
      location: { x: 2, y: 0 },
      path: ['forward', 'forward', 'forward'],
    });
  });
});
