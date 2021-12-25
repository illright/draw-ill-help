import type { BBox } from '../model/type';

/**
 * Taking the system's top-left point as the origin, return
 * the bounding box of the object in a new coordinate system.
 */
export function relativeCoordinates(object: BBox, system: BBox): BBox {
  const [objectLeft, objectTop, objectWidth, objectHeight] = object;
  const [systemLeft, systemTop] = system;

  return [objectLeft - systemLeft, objectTop - systemTop, objectWidth, objectHeight];
}

/**
 * Scale the object to retain its relative position with respect to the system
 * after the system has been resized to a new system.
 */
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
