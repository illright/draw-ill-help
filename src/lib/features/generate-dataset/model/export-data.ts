import { saveAs } from 'file-saver';
import JSZip from 'jszip';

import type { Sample } from './type';

function buildAnnotation(sample: Sample): string {
  return JSON.stringify(
    {
      size: {
        height: 416,
        width: 416,
      },
      objects: [
        {
          labelerLogin: 'illright',
          geometryType: 'rectangle',
          classTitle: sample.className,
          points: {
            exterior: sample.coordinates,
            interior: [],
          },
        },
      ],
    },
    null,
    2
  );
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
