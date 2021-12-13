const { writeFile } = require('fs/promises');

const modelFileName = 'model.json';

module.exports = function downloadModel(assetID, { github, context, core }) {
  const release = github.rest.repos.getReleaseAsset({
    ...context.repo,
    asset_id: assetID,
    headers: {
      accept: 'application/octet-stream',
    },
  });
  const modelAsset = release?.assets.find((asset) => asset.name === modelFileName);

  core.setOutput('model-asset-id', modelAsset?.id ?? 'null');

  if (modelAsset === undefined) {
    core.warning('YOLOv5 model not found in releases, skipping build');
  }
};
