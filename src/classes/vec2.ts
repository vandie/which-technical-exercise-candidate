/** A Position within an arena consisting of an x & y coordinate */
export class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /** Is this Vec2 within the expected bounds */
  within(start: Vec2, end: Vec2): boolean {
    return start.x <= this.x && this.x <= end.x && start.y <= this.y && this.y <= end.y;
  }

  /**
   * Moves a vector position relative to a given one.
   *
   * eg. (x: 0, y: 1) will move this vector 1 position in the y axis
   * @param vec A relative vector by which to move this vector.
   */
  move(vec: Vec2) {
    this.x += vec.x;
    this.y += vec.y;
  }

  /**
   * Attempts to create a Vec2 from a given object
   * @param input
   * @returns Either a Vec2 or null depending on if it's possible to create a Vec2 from the given input
   */
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  static tryFrom(input: any): Vec2 | null {
    if (!input || typeof input.x != 'number' || typeof input.y != 'number') return null;
    return new Vec2(input.x, input.y);
  }
}

/**
 * Validates that a Vec2 is valid. See input
 * @param input An object to test
 * @returns {boolean} A boolean indicating if this this object a valid Vec2
 */

/**
 * A helpful function to use with javascript's Array.sort to sort Vec2s
 */
export function vec2Sorting(vecA: Vec2, vecB: Vec2): number {
  return vecA.x < vecB.x ? vecA.y - vecB.y : vecA.x - vecB.x;
}
