import { saveAs } from 'file-saver';
import JSZip from 'jszip';

import type { Sample, SampleClass } from './type';

/**
 * The annotation format of Supervisely.
 *
 * **Note**: this type is not representative
 * of the actual annotation format, it is only a subset
 * that is sufficient for the current task.
 */
interface SuperviselyAnnotation {
  size: {
    width: number;
    height: number;
  };
  objects: Array<{
    labelerLogin: string;
    geometryType: 'rectangle';
    classTitle: SampleClass;
    points: {
      exterior: Array<[number, number]>;
      interior: Array<[number, number]>;
    };
  }>;
}

function buildAnnotation(sample: Sample): string {
  const annotation: SuperviselyAnnotation = {
      size: {
        height: 416,
        width: 416,
      },
      objects: [],
    };

  if (sample.className !== 'Nothing') {
    annotation.objects.push({
      labelerLogin: '_',
      geometryType: 'rectangle',
      classTitle: sample.className,
      points: {
        exterior: sample.coordinates,
        interior: [],
      },
    });
  }

  return JSON.stringify(annotation, null, 2);
}

export async function exportData($dataset: Sample[]): Promise<void> {
  const datasetID = Math.random().toString(36).substring(2, 9);
  const zip = new JSZip();
  const ann = zip.folder('ann');
  const img = zip.folder('img');

  $dataset.forEach((sample, index) => {
    const imageFileName = `image-${datasetID}-${index}.jpg`;
    ann?.file(`${imageFileName}.json`, buildAnnotation(sample));
    img?.file(imageFileName, sample.data);
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, `dataset-${datasetID}.zip`);
}
