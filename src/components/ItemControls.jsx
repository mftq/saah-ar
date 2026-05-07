import { useState } from 'react';
import { useApp, OBJECT_COLORS, ActionTypes } from '../context/AppContext';

export default function ItemControls() {
  const { state, dispatch } = useApp();
  const [name, setName] = useState('');
  const [w, setW] = useState('');
  const [d, setD] = useState('');
  const [h, setH] = useState('');

  const handleQueue = () => {
    const wVal = parseFloat(w);
    const dVal = parseFloat(d);
    const hVal = parseFloat(h);

    if (!wVal || !dVal || !hVal) {
      alert('يرجى إدخال العرض والعمق والارتفاع!');
      return;
    }

    dispatch({
      type: ActionTypes.SET_QUEUED,
      payload: {
        name: name.trim() || 'صندوق',
        w: wVal,
        d: dVal,
        h: hVal,
        color: state.currentColor,
      },
    });
  };

  const handlePlace = () => {
    if (!state.queuedObject) return;

    dispatch({
      type: ActionTypes.ADD_OBJECT,
      payload: state.queuedObject,
    });

    // Reset form
    setName('');
    setW('');
    setD('');
    setH('');
  };

  return (
    <div className="p-3.5">
      {/* Input Grid */}
      <div className="mb-2.5 grid grid-cols-[2fr_1fr_1fr_1fr] gap-2">
        <div>
          <label className="mb-1 block font-[var(--font-display)] text-[10px] uppercase tracking-[1px] text-saah-muted">
            الاسم
          </label>
          <input
            id="input-object-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="صندوق ملابس"
            className="w-full rounded-[7px] border border-saah-border bg-[rgba(10,14,26,0.9)] px-2.5 py-2 font-[var(--font-body)] text-[14px] text-saah-text"
          />
        </div>
        <div>
          <label className="mb-1 block font-[var(--font-display)] text-[10px] uppercase tracking-[1px] text-saah-muted">
            عرض سم
          </label>
          <input
            id="input-object-width"
            type="number"
            value={w}
            onChange={(e) => setW(e.target.value)}
            placeholder="50"
            min="5"
            inputMode="decimal"
            className="w-full rounded-[7px] border border-saah-border bg-[rgba(10,14,26,0.9)] px-2.5 py-2 font-[var(--font-body)] text-[14px] text-saah-text"
          />
        </div>
        <div>
          <label className="mb-1 block font-[var(--font-display)] text-[10px] uppercase tracking-[1px] text-saah-muted">
            عمق سم
          </label>
          <input
            id="input-object-depth"
            type="number"
            value={d}
            onChange={(e) => setD(e.target.value)}
            placeholder="40"
            min="5"
            inputMode="decimal"
            className="w-full rounded-[7px] border border-saah-border bg-[rgba(10,14,26,0.9)] px-2.5 py-2 font-[var(--font-body)] text-[14px] text-saah-text"
          />
        </div>
        <div>
          <label className="mb-1 block font-[var(--font-display)] text-[10px] uppercase tracking-[1px] text-saah-muted">
            ارتفاع (سم)
          </label>
          <input
            id="input-object-height"
            type="number"
            value={h}
            onChange={(e) => setH(e.target.value)}
            placeholder="30"
            min="5"
            inputMode="decimal"
            className="w-full rounded-[7px] border border-saah-border bg-[rgba(10,14,26,0.9)] px-2.5 py-2 font-[var(--font-body)] text-[14px] text-saah-text"
          />
        </div>
      </div>

      {/* Color Swatches */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <label className="font-[var(--font-display)] text-[10px] uppercase tracking-[1px] text-saah-muted">
          اللون
        </label>
        {OBJECT_COLORS.map((color) => (
          <div
            key={color}
            onClick={() => dispatch({ type: ActionTypes.SET_COLOR, payload: color })}
            className={`h-[23px] w-[23px] cursor-pointer rounded-full transition-transform duration-150 hover:scale-120 ${state.currentColor === color
                ? 'scale-120 border-2 border-white'
                : 'border-2 border-transparent'
              }`}
            style={{ background: color }}
          />
        ))}
      </div>

      {/* Action Buttons */}
      {!state.queuedObject ? (
        <button
          id="btn-queue-object"
          onClick={handleQueue}
          className="w-full rounded-[9px] bg-saah-blue px-3 py-2.5 font-[var(--font-body)] text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          ← ضع الغرض
        </button>
      ) : (
        <button
          id="btn-place-object"
          onClick={handlePlace}
          className="w-full rounded-[9px] bg-saah-green px-3 py-2.5 font-[var(--font-body)] text-[14px] font-semibold text-white transition-opacity animate-glow hover:opacity-90"
          style={{ '--tw-shadow-color': 'rgba(74, 222, 128, 0.4)' }}
        >
          👆 ضع &quot;{state.queuedObject.name}&quot;
        </button>
      )}
    </div>
  );
}
