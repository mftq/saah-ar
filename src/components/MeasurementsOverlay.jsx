import { useApp } from '../context/AppContext';

/**
 * MeasurementsOverlay — shows placement hints and drag instructions
 * overlaid on the 3D scene. Actual per-box dimension labels are
 * rendered inside SpaceCanvas via R3F's <Html>.
 */
export default function MeasurementsOverlay() {
  const { state } = useApp();

  return (
    <>
      {/* Place Button — visible when an object is queued */}
      {state.queuedObject && (
        <div className="pointer-events-none fixed bottom-[220px] left-1/2 z-20 -translate-x-1/2">
          <div className="pointer-events-auto animate-glow rounded-full bg-saah-blue px-6 py-3 text-center font-[var(--font-body)] text-[14px] font-semibold text-white">
            👆 اضغط لوضع &quot;{state.queuedObject.name}&quot;
          </div>
        </div>
      )}

      {/* Drag Hint — visible when objects exist and nothing is queued */}
      {!state.queuedObject && state.objects.length > 0 && (
        <div className="pointer-events-none fixed bottom-[220px] left-1/2 z-20 -translate-x-1/2">
          <div className="glass whitespace-nowrap rounded-full px-4 py-2 font-[var(--font-display)] text-[12px] text-saah-text">
            ✋ اضغط على صندوق لتحديده · اسحب لتحريكه
          </div>
        </div>
      )}
    </>
  );
}
