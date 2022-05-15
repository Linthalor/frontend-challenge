import * as tPromise from 'io-ts-promise';
import { Color, ColorArrayCodex } from '../../model/color';
import { appGet, baseUrl } from '../api';

export const getColors = (): Promise<Color[]> => appGet(`${baseUrl}colors`)
  .then(tPromise.decode(ColorArrayCodex));