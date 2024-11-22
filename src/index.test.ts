import { readFileSync } from 'fs';
import { describe, expect, test } from '@jest/globals';
import { runRobot } from './robot-wrapper';

function exampleTest(name: string) {
  const loadJson = (p: string) => JSON.parse(readFileSync(`${__dirname}/../examples/${name}/${p}`, 'utf8'));

  test(`handles walk through example "${name}"`, () => {
    const input = loadJson('input.json');
    const expected = loadJson('expected.json');

    // The test by default uses .toBe which can sometimes be funny with objects
    // as such I've replaced with .toEqual which does a deep comparison.
    // The example tests are otherwise unmodified
    expect(runRobot(input)).toEqual(expected);
  });
}

describe('Candidate robot', () => {
  exampleTest('01-walk-through');
  exampleTest('02-error');
  exampleTest('03-crash');
});
