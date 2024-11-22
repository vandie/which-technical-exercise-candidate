/**
 * The expected output format for the robot
 */
export type RobotOutput = {
  status: string;
  location: { x: number; y: number };
  heading: string;
  path: string[];
};
