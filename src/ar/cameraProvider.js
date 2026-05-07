/**
 * cameraProvider.js — Camera stream management
 *
 * Handles starting and stopping the device camera
 * for the AR background feed.
 */

/**
 * Start the rear-facing camera and return the MediaStream.
 * Falls back to any available camera if rear is unavailable.
 *
 * @returns {Promise<MediaStream>}
 * @throws {Error} If camera access is denied or unavailable
 */
export async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: false,
    });
    return stream;
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      throw new Error('يرجى السماح بالوصول إلى الكاميرا لاستخدام الواقع المعزز');
    } else if (error.name === 'NotFoundError') {
      throw new Error('لم يتم العثور على كاميرا في هذا الجهاز');
    } else {
      throw new Error(`خطأ في الكاميرا: ${error.message}`);
    }
  }
}

/**
 * Stop all tracks on the given MediaStream.
 *
 * @param {MediaStream} stream
 */
export function stopCamera(stream) {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
}
