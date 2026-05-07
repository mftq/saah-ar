import { useApp } from '../context/AppContext';

export default function TopBar() {
  const { state } = useApp();
  const count = state.objects.length;

  return (
    <div className="glass pointer-events-auto fixed top-0 right-0 left-0 z-20 flex items-center justify-between border-b border-saah-border px-4 py-3">
      {/* Logo */}
      <div className="font-[var(--font-display)] text-[17px] text-saah-blue">
        سعة <span className="text-saah-orange" style={{ fontStyle: 'normal' }}>·</span>{' '}
        <span className="text-saah-text text-[14px]">Sa'ah</span>
      </div>

      {/* Object Count Badge */}
      <div className="rounded-full border border-saah-border bg-saah-blue-light px-3 py-1 font-[var(--font-display)] text-[11px] text-saah-blue transition-all">
        {count === 0
          ? '٠ أغراض'
          : count === 1
            ? 'غرض واحد'
            : count === 2
              ? 'غرضين'
              : `${count} أغراض`}
      </div>
    </div>
  );
}
