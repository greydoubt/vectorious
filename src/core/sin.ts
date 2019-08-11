import { NDArray } from './';

NDArray.sin = <T extends NDArray>(x: T): T => x.copy().sin();

NDArray.prototype.sin = function<T extends NDArray>(this: T): T {
  const { data: d1, length: l1 } = this;

  let i: number;
  for (i = 0; i < l1; i += 1) {
    d1[i] = Math.sin(d1[i]);
  }

  return this;
};