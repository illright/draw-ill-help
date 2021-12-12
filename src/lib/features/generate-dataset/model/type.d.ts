export type SampleClass = 'Circle' | 'Rectangle' | 'Nothing';

export interface Sample {
  data: Blob;
  /** `[[left, top], [left + width, top + height]]` */
  coordinates: [[number, number], [number, number]];
  className: SampleClass;
}
