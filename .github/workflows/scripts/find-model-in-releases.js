const modelFileName = 'model.json';

/**
 * Search through the assets of the latest release to find a YOLOv5 model.
 *
 * Outputs the asset ID of the model file for downloading
 * or 'null' if it wasn't found.
 */
module.exports = function findModelInReleases({ github, context, core }) {
  const release = github.rest.repos.getLatestRelease(context.repo);
  const modelAsset = release?.assets.find((asset) => asset.name === modelFileName);

  core.setOutput('model-asset-id', modelAsset?.id ?? 'null');

  if (modelAsset === undefined) {
    core.warning('YOLOv5 model not found in releases, skipping build');
  }
};
