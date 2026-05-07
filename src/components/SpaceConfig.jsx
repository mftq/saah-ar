import { useState } from 'react';
import { useApp, SPACE_PRESETS, ActionTypes } from '../context/AppContext';

export default function SpaceConfig() {
  const { state, dispatch } = useApp();
  const [w, setW] = useState(String(state.space.w));
  const [d, setD] = useState(String(state.space.d));
  const [h, setH] = useState(String(state.space.h));

  const applyPreset = (preset) => {
    setW(String(preset.w));
    setD(String(preset.d));
    setH(String(preset.h));
    dispatch({ type: ActionTypes.SET_SPACE, payload: { w: preset.w, d: preset.d, h: preset.h } });
  };

  const applyCustom = () => {
    dispatch({
      type: ActionTypes.SET_SPACE,
      payload: { w: +w || 120, d: +d || 100, h: +h || 80 },
    });
  };

  return (
    <div className="p-3.5">
      <p className="mb-2.5 font-[var(--font-display)] text-[11px] text-saah-muted">
        الحجم الحقيقي للمساحة المراد تعبئتها:
      </p>

      {/* Presets */}
      <div className="mb-2.5 flex flex-wrap gap-1.5">
        {SPACE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => applyPreset(preset)}
            className="rounded-[9px] border border-saah-border bg-transparent px-2.5 py-1.5 text-[12px] text-saah-muted transition-all hover:border-saah-blue hover:text-saah-blue"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Custom Dimensions */}
      <div className="mb-2.5 grid grid-cols-3 gap-2">
        <div>
          <label className="mb-1 block font-[var(--font-display)] text-[10px] uppercase tracking-[1px] text-saah-muted">عرض سم</label>
          <input type="number" value={w} onChange={(e) => setW(e.target.value)} inputMode="decimal"
            className="w-full rounded-[7px] border border-saah-border bg-[rgba(10,14,26,0.9)] px-2.5 py-2 text-[14px] text-saah-text" />
        </div>
        <div>
          <label className="mb-1 block font-[var(--font-display)] text-[10px] uppercase tracking-[1px] text-saah-muted">عمق سم</label>
          <input type="number" value={d} onChange={(e) => setD(e.target.value)} inputMode="decimal"
            className="w-full rounded-[7px] border border-saah-border bg-[rgba(10,14,26,0.9)] px-2.5 py-2 text-[14px] text-saah-text" />
        </div>
        <div>
          <label className="mb-1 block font-[var(--font-display)] text-[10px] uppercase tracking-[1px] text-saah-muted">ارتفاع سم</label>
          <input type="number" value={h} onChange={(e) => setH(e.target.value)} inputMode="decimal"
            className="w-full rounded-[7px] border border-saah-border bg-[rgba(10,14,26,0.9)] px-2.5 py-2 text-[14px] text-saah-text" />
        </div>
      </div>

      <button onClick={applyCustom}
        className="w-full rounded-[9px] bg-saah-orange px-3 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90">
        تطبيق حجم المساحة
      </button>
    </div>
  );
}
