/**
 * Which cardinal direction is the robot facing
 *
 * Mapped as numbers for simpler turning
 * */
export enum Heading {
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}

/**
 * Because the headings are stored as numbers within the robot, this function converts it back to the output format
 * @param heading The heading to convert
 * @returns the heading as a string
 */
export function convertHeadingToString(heading: Heading): string {
  return {
    [Heading.North]: 'north',
    [Heading.East]: 'east',
    [Heading.South]: 'south',
    [Heading.West]: 'west',
  }[heading];
}
