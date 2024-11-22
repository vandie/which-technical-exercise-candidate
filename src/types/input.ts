import { Heading } from './heading';
import { Vec2, vec2Sorting } from '../classes/vec2';

/** An arena's outer bounds in which a robot can move */
export type Arena = {
  /** The top left arena corner */
  corner1: Vec2;
  /** The bottom right arena corner */
  corner2: Vec2;
};

/** The expected format of data inputted to the robot */
export type RobotInput = {
  /** The available bounds of the arena in which the robot resides */
  arena: Arena;
  /** The current location of the robot */
  location: Vec2;
  /** The currently faced direction of the robot */
  heading: Heading;
  /** A list of instructions that the robot is expected to carry out in string format */
  directions: string[];
};

/**
 * Validates and normalises a given input to see if it's a valid robot input.
 *
 * Warning: Normalisation occurs in place.
 *
 * In a production system, we may wish to replace this with an existing validation library
 * such as [Superstruct](https://docs.superstructjs.org/) or [Zod](https://zod.dev/) as this will be more
 * maintainable in the long run but for this test, we'll avoid bringing in too many dependancies.
 * @param input An object to test
 * @returns {boolean} A boolean indicating if the input is a valid Robot Input
 */
export function validateAndNormaliseRobotInput(input: any): input is RobotInput {
  if (!input || !input.arena) return false;

  // attempt to convert corner1 & corner2 to the Vec2 class and return false if failed
  [input.arena.corner1, input.arena.corner2] = [input.arena.corner1, input.arena.corner2].map(Vec2.tryFrom);
  if ([input.arena.corner1, input.arena.corner2].some((corner) => corner == null)) return false;

  // If corner2 is more north/western than corner1, swap them round for easier processing.
  [input.arena.corner1, input.arena.corner2] = [input.arena.corner1, input.arena.corner2].sort(vec2Sorting);

  // attempt to convert current location to Vec2 class and return false if failed
  input.location = Vec2.tryFrom(input.location);
  if (!input.location) return false;

  // Check the current heading is valid and convert to our enum
  const headingFixedCase = input.heading.charAt(0).toUpperCase() + input.heading.toLowerCase().slice(1);
  if (Heading[headingFixedCase]) return false;
  input.heading = Heading[headingFixedCase];

  // Check that the list of directions is a string.
  // We can't convert these to our enum yet as we still need to process invalid directions for our error handling
  if (!Array.isArray(input.directions)) return false;
  for (const direction of input.directions) {
    if (typeof direction != 'string') return false;
  }

  // The robot is now valid and normalised
  return true;
}
