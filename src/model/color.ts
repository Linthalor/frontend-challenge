import * as t from 'io-ts';

export const ColorCodex = t.string;
export type Color = t.TypeOf<typeof ColorCodex>;

export const ColorArrayCodex = t.array(ColorCodex);