/**
 * Determine a motion vector combinations of the color component difference on
 * the x axis, y axis, and temporal axis.
 * @param {number} A2 - a sum of x axis squared
 * @param {number} A1B2 - a sum of x axis times y axis
 * @param {number} B1 - a sum of y axis squared
 * @param {number} C2 - a sum of x axis times temporal axis
 * @param {number} C1 - a sum of y axis times temporal axis
 * @param {UV} out - optional object to store return UV info in
 * @returns {UV} a uv vector representing the motion for the given input
 */
export function motionVector(A2: number, A1B2: number, B1: number, C2: number, C1: number, out?: any): any;
/**
 * Translate an angle in degrees with the range -180 to 180 rotated to
 * Scratch's reference angle.
 * @param {number} degrees - angle in range -180 to 180
 * @returns {number} angle from Scratch's reference angle
 */
export function scratchDegrees(degrees: number): number;
/**
 * Get the angle of the y and x component of a 2d vector in degrees in
 * Scratch's coordinate plane.
 * @param {number} y - the y component of a 2d vector
 * @param {number} x - the x component of a 2d vector
 * @returns {number} angle in degrees in Scratch's coordinate plane
 */
export function scratchAtan2(y: number, x: number): number;
