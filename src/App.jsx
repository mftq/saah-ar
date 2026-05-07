import { useState, useRef, useCallback, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { startCamera, stopCamera } from './ar/cameraProvider';
import SplashScreen from './components/SplashScreen';
import TopBar from './components/TopBar';
import SpaceCanvas from './components/SpaceCanvas';
import FitAnalysisPanel from './components/FitAnalysisPanel';
import MeasurementsOverlay from './components/MeasurementsOverlay';
import BottomPanel from './components/BottomPanel';

/**
 * CameraBackground — renders the live camera feed as a full-screen video
 */
function CameraBackground({ stream }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="fixed inset-0 z-0 h-screen w-screen object-cover"
    />
  );
}

/**
 * MainUI — the AR workspace shown after camera starts
 */
function MainUI({ stream }) {
  return (
    <>
      <CameraBackground stream={stream} />
      <SpaceCanvas />
      <TopBar />
      <FitAnalysisPanel />
      <MeasurementsOverlay />
      <BottomPanel />
    </>
  );
}

/**
 * App — root component
 */
export default function App() {
  const [started, setStarted] = useState(false);
  const [stream, setStream] = useState(null);

  const handleStart = useCallback(async () => {
    const mediaStream = await startCamera();
    setStream(mediaStream);
    setStarted(true);
  }, []);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (stream) stopCamera(stream);
    };
  }, [stream]);

  return (
    <AppProvider>
      {!started ? (
        <SplashScreen onStart={handleStart} />
      ) : (
        <MainUI stream={stream} />
      )}
    </AppProvider>
  );
}
