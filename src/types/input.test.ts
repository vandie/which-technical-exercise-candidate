import { describe, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { validateAndNormaliseRobotInput } from './input';
import { Vec2 } from '../classes/vec2';

describe('Input', () => {
  test('Correctly validates and noramalises a valid input', () => {
    const input = JSON.parse(readFileSync(`${__dirname}/../../examples/01-walk-through/input.json`, 'utf8'));
    expect(validateAndNormaliseRobotInput(input)).toEqual(true);
    expect(input).toEqual({
      arena: {
        corner1: new Vec2(-3, -3),
        corner2: new Vec2(3, 3),
      },
      directions: input.directions,
      heading: 0,
      location: new Vec2(0, 0),
    });
  });

  test('Correctly validates and noramalises a valid input with arena in the wrong order', () => {
    const input = JSON.parse(readFileSync(`${__dirname}/../../examples/01-walk-through/input.json`, 'utf8'));

    // Quick and dirty lazy swap for the test
    const temp = input.arena.corner1;
    input.arena.corner1 = input.arena.corner2;
    input.arena.corner2 = temp;

    expect(validateAndNormaliseRobotInput(input)).toEqual(true);
    expect(input).toEqual({
      arena: {
        corner1: new Vec2(-3, -3),
        corner2: new Vec2(3, 3),
      },
      directions: input.directions,
      heading: 0,
      location: new Vec2(0, 0),
    });
  });

  test('Correctly validates an invalid input', () => {
    const input = {
      bad: 'example',
    };
    expect(validateAndNormaliseRobotInput(input)).toEqual(false);
  });
});
