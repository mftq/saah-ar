/**
 * fitAlgorithm.js — "Will it fit?" logic
 * 
 * Pure utility functions for analyzing whether objects
 * will fit inside a given space. Separated from UI for testability.
 */

/**
 * Analyze whether the given objects fit within the space.
 * Uses simple volume comparison as a first-order approximation.
 *
 * @param {Array<{w: number, d: number, h: number}>} objects - Items to fit
 * @param {{w: number, d: number, h: number}} space - Container dimensions (cm)
 * @returns {{percentage: number, usedVolume: number, spaceVolume: number, status: string, message: string}}
 */
export function analyzeFit(objects, space) {
  const spaceVolume = space.w * space.d * space.h;
  const usedVolume = objects.reduce((sum, o) => sum + o.w * o.d * o.h, 0);
  const percentage = spaceVolume > 0
    ? Math.min(100, Math.round((usedVolume / spaceVolume) * 100))
    : 0;

  if (objects.length === 0) {
    return {
      percentage: 0,
      usedVolume: 0,
      spaceVolume,
      status: 'idle',
      message: 'أضف أغراض للبدء',
    };
  }

  let status, message;
  if (percentage < 60) {
    status = 'ok';
    message = `✓ ${percentage}% ممتلئ — يناسب!`;
  } else if (percentage < 85) {
    status = 'warn';
    message = `⚠ ${percentage}% — بدأ يضيق`;
  } else {
    status = 'bad';
    message = `✗ ${percentage}% — لن يناسب!`;
  }

  return { percentage, usedVolume, spaceVolume, status, message };
}

/**
 * Check if a single object can physically fit inside the space
 * by comparing each dimension (considering all 6 orientations).
 *
 * @param {{w: number, d: number, h: number}} object - Item dimensions (cm)
 * @param {{w: number, d: number, h: number}} space - Container dimensions (cm)
 * @returns {{fits: boolean, orientation: [number, number, number] | null}}
 */
export function canObjectFit(object, space) {
  const objDims = [object.w, object.d, object.h].sort((a, b) => a - b);
  const spaceDims = [space.w, space.d, space.h].sort((a, b) => a - b);

  // Object fits if each sorted dimension of the object <= corresponding space dimension
  const fits = objDims[0] <= spaceDims[0]
    && objDims[1] <= spaceDims[1]
    && objDims[2] <= spaceDims[2];

  return {
    fits,
    orientation: fits ? objDims : null,
  };
}

/**
 * Calculate remaining capacity after placing objects.
 *
 * @param {Array<{w: number, d: number, h: number}>} objects
 * @param {{w: number, d: number, h: number}} space
 * @returns {{remainingVolume: number, remainingPercent: number}}
 */
export function remainingCapacity(objects, space) {
  const spaceVolume = space.w * space.d * space.h;
  const usedVolume = objects.reduce((sum, o) => sum + o.w * o.d * o.h, 0);
  const remainingVolume = Math.max(0, spaceVolume - usedVolume);
  const remainingPercent = spaceVolume > 0
    ? Math.round((remainingVolume / spaceVolume) * 100)
    : 0;

  return { remainingVolume, remainingPercent };
}
