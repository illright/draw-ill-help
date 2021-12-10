import { dataset } from './store';

export function removeLastImage(): void {
  dataset.update(($dataset) => {
    $dataset.pop();
    return $dataset;
  });
}
