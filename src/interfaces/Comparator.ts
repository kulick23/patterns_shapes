import { IShape } from "./IShape";

export interface Comparator {
    compare(a: IShape, b: IShape): number;
}
