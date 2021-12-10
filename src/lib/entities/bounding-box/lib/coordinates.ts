import type { BBox } from '../model/type';

export function relativeCoordinates(object: BBox, system: BBox): BBox {
  const [objectLeft, objectTop, objectWidth, objectHeight] = object;
  const [systemLeft, systemTop] = system;

  return [objectLeft - systemLeft, objectTop - systemTop, objectWidth, objectHeight];
}

export function scaledCoordinates(object: BBox, system: BBox, newSystem: BBox): BBox {
  const [objectLeft, objectTop, objectWidth, objectHeight] = object;
  const [_systemLeft, _systemTop, systemWidth, systemHeight] = system;
  const [_newSystemLeft, _newSystemTop, newSystemWidth, newSystemHeight] = newSystem;

  return [
    (objectLeft / systemWidth) * newSystemWidth,
    (objectTop / systemHeight) * newSystemHeight,
    (objectWidth / systemWidth) * newSystemWidth,
    (objectHeight / systemHeight) * newSystemHeight,
  ];
}
