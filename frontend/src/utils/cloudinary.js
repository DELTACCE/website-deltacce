const DEFAULT_CLOUD_NAME = 'dt9kum1nb';
const DEFAULT_RESOURCE_TYPE = 'image';
const DEFAULT_RESOURCE_TYPES = [DEFAULT_RESOURCE_TYPE, 'video'];
const RESPONSIVE_IMAGE_WIDTHS = [480, 720, 960, 1280, 1600];

function getCloudinaryCloudName() {
  return process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUD_NAME;
}

export function buildCloudinaryListUrl(tag, resourceType = DEFAULT_RESOURCE_TYPE) {
  if (!tag) {
    throw new Error('A Cloudinary tag is required.');
  }

  const cloudName = getCloudinaryCloudName();
  const encodedTag = encodeURIComponent(tag);

  return `https://res.cloudinary.com/${cloudName}/${resourceType}/list/${encodedTag}.json`;
}

function extractCloudinaryResources(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.resources)) {
    return payload.resources;
  }

  return [];
}

function normalizeDimension(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : 0;
}

function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.id || seen.has(item.id)) {
      return false;
    }

    seen.add(item.id);
    return true;
  });
}

export function buildCloudinaryAssetUrl(resourceType, publicId, format) {
  const cloudName = getCloudinaryCloudName();
  const normalizedResourceType = resourceType === 'video' ? 'video' : 'image';
  const normalizedPublicId = typeof publicId === 'string' ? publicId.replace(/^\/+/, '') : '';
  const normalizedFormat = typeof format === 'string' ? format.replace(/^\./, '') : '';

  if (!normalizedPublicId || !normalizedFormat) {
    return '';
  }

  return `https://res.cloudinary.com/${cloudName}/${normalizedResourceType}/upload/${normalizedPublicId}.${normalizedFormat}`;
}

export function normalizeCloudinaryAsset(asset, resourceType = DEFAULT_RESOURCE_TYPE) {
  const width = normalizeDimension(asset?.width);
  const height = normalizeDimension(asset?.height);
  const normalizedResourceType = resourceType === 'video' ? 'video' : 'image';
  const format = typeof asset?.format === 'string' ? asset.format : '';
  const publicId = typeof asset?.public_id === 'string' ? asset.public_id : '';
  const url = buildCloudinaryAssetUrl(normalizedResourceType, publicId, format);

  return {
    id: asset?.asset_id || publicId || `${normalizedResourceType}:${width}x${height}`,
    type: normalizedResourceType,
    resourceType: normalizedResourceType,
    publicId,
    format,
    width,
    height,
    aspectRatio: width > 0 && height > 0 ? width / height : 1,
    url,
  };
}

export function buildCloudinaryDeliveryUrl(url, transformation = '') {
  if (!url) {
    return '';
  }

  const uploadMarker = '/upload/';
  const uploadIndex = url.indexOf(uploadMarker);

  if (uploadIndex === -1) {
    return url;
  }

  const prefix = url.slice(0, uploadIndex + uploadMarker.length);
  const suffix = url.slice(uploadIndex + uploadMarker.length);
  const normalizedTransformation = transformation ? `${transformation.replace(/^\/+|\/+$/g, '')}/` : '';

  return `${prefix}${normalizedTransformation}${suffix}`;
}

export function buildCloudinaryImageSrcSet(url, widths = RESPONSIVE_IMAGE_WIDTHS) {
  if (!url) {
    return '';
  }

  return widths
    .map((width) => {
      const transformedUrl = buildCloudinaryDeliveryUrl(url, `f_auto,q_auto,c_limit,w_${width}`);
      return `${transformedUrl} ${width}w`;
    })
    .join(', ');
}

async function fetchCloudinaryList(tag, resourceType) {
  const response = await fetch(buildCloudinaryListUrl(tag, resourceType));

  if (!response.ok) {
    throw new Error(`Cloudinary ${resourceType} list request failed with status ${response.status}.`);
  }

  const payload = await response.json();

  const resources = extractCloudinaryResources(payload);

  return resources;
}

export async function loadCloudinaryAssets(tag) {
  const settledResults = await Promise.allSettled(
    DEFAULT_RESOURCE_TYPES.map((resourceType) => fetchCloudinaryList(tag, resourceType))
  );

  const errors = settledResults
    .filter((result) => result.status === 'rejected')
    .map((result) => result.reason);

  const normalizedAssets = uniqueById(
    settledResults.flatMap((result, index) => {
      if (result.status !== 'fulfilled') {
        return [];
      }

      return (result.value || []).map((resource) =>
        normalizeCloudinaryAsset(resource, DEFAULT_RESOURCE_TYPES[index])
      );
    })
  );

  const hasHardFailure = errors.length > 0 && normalizedAssets.length === 0;

  return {
    assets: normalizedAssets,
    error: hasHardFailure ? errors[0] : null,
    status: hasHardFailure ? 'error' : normalizedAssets.length > 0 ? 'loaded' : 'empty',
  };
}

export async function getCloudinaryAssets(tag) {
  const result = await loadCloudinaryAssets(tag);
  return result.assets;
}
