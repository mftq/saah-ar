import { useApp, ActionTypes } from '../context/AppContext';

export default function ObjectList() {
  const { state, dispatch } = useApp();

  const handleSelect = (id) => {
    dispatch({ type: ActionTypes.SELECT_OBJECT, payload: id });
  };

  const handleRemove = (id, e) => {
    e.stopPropagation();
    dispatch({ type: ActionTypes.REMOVE_OBJECT, payload: id });
  };

  const handleRemoveSelected = () => {
    if (!state.selectedId) { alert('اختر غرضًا أولاً!'); return; }
    dispatch({ type: ActionTypes.REMOVE_OBJECT, payload: state.selectedId });
  };

  const handleClearAll = () => {
    if (!state.objects.length) return;
    if (!confirm('هل تريد حذف جميع الأغراض؟')) return;
    dispatch({ type: ActionTypes.CLEAR_ALL });
  };

  return (
    <div className="p-3.5">
      <div className="mb-2.5 flex max-h-[115px] flex-col gap-1.5 overflow-y-auto">
        {state.objects.length === 0 ? (
          <div className="py-3 text-center font-[var(--font-display)] text-[12px] text-saah-muted">
            لم يتم وضع أي أغراض بعد!
          </div>
        ) : (
          state.objects.map((obj) => (
            <div
              key={obj.id}
              onClick={() => handleSelect(obj.id)}
              className={`flex cursor-pointer items-center gap-2.5 rounded-[7px] border px-2.5 py-2 transition-all ${obj.id === state.selectedId
                  ? 'border-saah-blue bg-[rgba(74,158,255,0.08)]'
                  : 'border-saah-border bg-saah-surface hover:border-[rgba(74,158,255,0.4)]'
                }`}
            >
              <div className="h-[11px] w-[11px] flex-shrink-0 rounded-[3px]" style={{ background: obj.color }} />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium">{obj.name}</div>
                <div className="font-[var(--font-display)] text-[10px] text-saah-muted">{obj.w}×{obj.d}×{obj.h} سم</div>
              </div>
              <button onClick={(e) => handleRemove(obj.id, e)} className="border-none bg-transparent px-1.5 py-0.5 text-[15px] text-saah-muted cursor-pointer hover:text-saah-red">×</button>
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2">
        <button id="btn-remove-selected" onClick={handleRemoveSelected} className="flex-1 rounded-[9px] border border-saah-border bg-transparent px-3 py-2.5 text-[12px] text-saah-muted hover:opacity-90">✕ إزالة المحدد</button>
        <button id="btn-clear-all" onClick={handleClearAll} className="flex-1 rounded-[9px] border border-saah-red/30 bg-saah-red/10 px-3 py-2.5 text-[12px] text-saah-red hover:opacity-90">🗑 مسح الكل</button>
      </div>
    </div>
  );
}
