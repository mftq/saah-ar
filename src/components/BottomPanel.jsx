import { useState } from 'react';
import ItemControls from './ItemControls';
import ObjectList from './ObjectList';
import SpaceConfig from './SpaceConfig';

const TABS = [
  { id: 'add',   label: '➕ إضافة',   component: ItemControls },
  { id: 'list',  label: '📦 الأغراض', component: ObjectList },
  { id: 'space', label: '📐 المساحة', component: SpaceConfig },
];

export default function BottomPanel() {
  const [activeTab, setActiveTab] = useState('add');

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component;

  return (
    <div className="glass pointer-events-auto fixed right-0 bottom-0 left-0 z-20 border-t border-saah-border animate-slide-up">
      {/* Tab Bar */}
      <div className="flex border-b border-saah-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 border-b-2 bg-transparent px-1.5 py-2.5 text-center font-[var(--font-body)] text-[13px] font-medium transition-all ${
              activeTab === tab.id
                ? 'border-saah-blue text-saah-blue'
                : 'border-transparent text-saah-muted hover:text-saah-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      {ActiveComponent && <ActiveComponent />}
    </div>
  );
}
