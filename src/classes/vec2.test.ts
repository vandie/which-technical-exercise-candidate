import { describe, expect, test } from '@jest/globals';
import { Vec2, vec2Sorting } from './vec2';

describe('Vec2', () => {
  test('Simple move works as expected', () => {
    const pos = new Vec2(1, 1);
    pos.move(new Vec2(1, -1));
    expect(pos).toEqual(new Vec2(2, 0));
  });

  test('Vec2.within works as expected', () => {
    const pos = new Vec2(2, 2);
    expect(pos.within(new Vec2(0, 0), new Vec2(2, 2))).toBe(true);
    expect(pos.within(new Vec2(0, 0), new Vec2(1, 1))).toBe(false);
    expect(pos.within(new Vec2(3, 2), new Vec2(3, 3))).toBe(false);
    expect(pos.within(new Vec2(0, 1), new Vec2(2, 1))).toBe(false);
    expect(pos.within(new Vec2(-2, -2), new Vec2(2, 2))).toBe(true);
  });

  test('tryFrom returns null when given invalid position', () => {
    expect(Vec2.tryFrom({ x: 10, z: 5 })).toBe(null);
  });

  test('tryFrom returns a Vec2 when given a valid position', () => {
    expect(Vec2.tryFrom({ x: 10, y: 5 })).toEqual(new Vec2(10, 5));
  });

  test('sort helper works as expected', () => {
    const input = [new Vec2(0, 0), new Vec2(5, 3), new Vec2(1, 1), new Vec2(6, 3), new Vec2(1, 2)];
    const output = [new Vec2(0, 0), new Vec2(1, 1), new Vec2(1, 2), new Vec2(5, 3), new Vec2(6, 3)];
    expect(input.sort(vec2Sorting)).toEqual(output);
  });
});
