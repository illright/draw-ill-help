import { dataset } from './dataset';

/** Remove the last image from the global dataset. */
export function removeLastImage(): void {
	dataset.update(($dataset) => {
		$dataset.pop();
		return $dataset;
	});
}
