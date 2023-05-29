import { NDArray } from './';
import { NDIter } from '../iterators';
import { array } from './array';

/**
 * @static
 * @memberof module:Globals
 * @function rank
 * @description Finds the rank of `x` using gaussian elimination.
 * @param {NDArray} x
 * @param {Number} tolerance
 * @returns {Number}
 * @example
 * import { rank } from 'vectorious/core/rank';
 *
 * rank([[1, 1, 1], [2, 2, 2], [3, 3, 3]]); // => 1
 */
export const rank = (x: NDArray | ArrayLike<any>, tolerance: number = 1e-6): number =>
  array(x).rank(tolerance);

/**
 * @function rank
 * @memberof NDArray.prototype
 * @description Finds the rank of current matrix using gaussian elimination.
 * @param {Number} tolerance
 * @returns {Number}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([[1, 1, 1], [2, 2, 2], [3, 3, 3]]).rank(); // => 1
 * @todo Switch to SVD algorithm
 */
export default function (this: NDArray, tolerance: number = 1e-6): number {
  const { data: d1 } = this.copy().gauss();

  const iter = new NDIter(this);

  let rk: number = 0;
  let [ci, cj] = iter.coords;
  for (const i of iter) {
    if (rk <= ci && cj >= ci && Math.abs(d1[i]) > tolerance) {
      rk += 1;
    }

    [ci, cj] = iter.coords;
  }

  return rk;
}
