import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { analyzeFit } from '../utils/fitAlgorithm';

const STATUS_STYLES = {
  idle: 'text-saah-green',
  ok: 'text-saah-green',
  warn: 'text-saah-yellow',
  bad: 'text-saah-red',
};

export default function FitAnalysisPanel() {
  const { state } = useApp();

  const analysis = useMemo(
    () => analyzeFit(state.objects, state.space),
    [state.objects, state.space]
  );

  return (
    <div className="glass pointer-events-none fixed top-[70px] left-3 z-20 min-w-[150px] rounded-[11px] p-3 font-[var(--font-display)] text-[11px] leading-relaxed animate-fade-in">
      <h4 className="mb-1.5 text-[9px] uppercase tracking-[2px] text-saah-muted">
        تحليل المساحة
      </h4>
      <div className={STATUS_STYLES[analysis.status] || 'text-saah-green'}>
        {analysis.message}
      </div>

      {state.objects.length > 0 && (
        <div className="mt-2 border-t border-saah-border pt-2 text-[9px] text-saah-muted">
          <div>المساحة: {state.space.w}×{state.space.d}×{state.space.h} سم</div>
          <div>المستخدم: {analysis.usedVolume.toLocaleString()} سم³</div>
          <div>المتاح: {(analysis.spaceVolume - analysis.usedVolume).toLocaleString()} سم³</div>
        </div>
      )}

      {/* Progress Bar */}
      {state.objects.length > 0 && (
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${analysis.percentage}%`,
              background:
                analysis.status === 'ok' ? '#4ade80'
                : analysis.status === 'warn' ? '#facc15'
                : '#f87171',
            }}
          />
        </div>
      )}
    </div>
  );
}
