import { createContext, useContext, useReducer } from 'react';

/**
 * Available colors for objects
 */
export const OBJECT_COLORS = [
  '#4A9EFF', '#FF8C42', '#4ade80', '#f472b6',
  '#facc15', '#a78bfa', '#f87171', '#34d399',
];

/**
 * Space presets for quick configuration
 */
export const SPACE_PRESETS = [
  { label: '🚗 سيارة', w: 120, d: 100, h: 80 },
  { label: '🎒 حقيبة', w: 35, d: 20, h: 45 },
  { label: '🧳 شنطة سفر', w: 50, d: 25, h: 70 },
  { label: '📦 رف', w: 90, d: 40, h: 200 },
];

/**
 * 9 spread-out placement slots on the grid (no overlap)
 */
export const PLACEMENT_SLOTS = [
  { x: -0.8, y: 0, z: -0.8 },
  { x:  0,   y: 0, z: -0.8 },
  { x:  0.8, y: 0, z: -0.8 },
  { x: -0.8, y: 0, z:  0   },
  { x:  0,   y: 0, z:  0   },
  { x:  0.8, y: 0, z:  0   },
  { x: -0.8, y: 0, z:  0.8 },
  { x:  0,   y: 0, z:  0.8 },
  { x:  0.8, y: 0, z:  0.8 },
];

/** Centimeters to scene-units conversion */
export const CM = 0.01;

// ─── Initial State ───────────────────────────────────────────────────────
const initialState = {
  objects: [],           // { id, name, w, d, h, color }
  selectedId: null,
  nextId: 1,
  currentColor: OBJECT_COLORS[0],
  queuedObject: null,   // { name, w, d, h, color } — waiting to be placed
  space: { w: 120, d: 100, h: 80 },
  cameraStarted: false,
};

// ─── Action Types ────────────────────────────────────────────────────────
export const ActionTypes = {
  ADD_OBJECT: 'ADD_OBJECT',
  REMOVE_OBJECT: 'REMOVE_OBJECT',
  CLEAR_ALL: 'CLEAR_ALL',
  SELECT_OBJECT: 'SELECT_OBJECT',
  SET_QUEUED: 'SET_QUEUED',
  CLEAR_QUEUED: 'CLEAR_QUEUED',
  SET_SPACE: 'SET_SPACE',
  SET_COLOR: 'SET_COLOR',
  SET_CAMERA_STARTED: 'SET_CAMERA_STARTED',
  UPDATE_OBJECT_POSITION: 'UPDATE_OBJECT_POSITION',
};

// ─── Reducer ─────────────────────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_OBJECT: {
      const id = state.nextId;
      const slotIndex = state.objects.length % PLACEMENT_SLOTS.length;
      const slot = PLACEMENT_SLOTS[slotIndex];
      const obj = {
        id,
        ...action.payload,
        slot,
      };
      return {
        ...state,
        objects: [...state.objects, obj],
        nextId: id + 1,
        queuedObject: null,
      };
    }

    case ActionTypes.REMOVE_OBJECT:
      return {
        ...state,
        objects: state.objects.filter(o => o.id !== action.payload),
        selectedId: state.selectedId === action.payload ? null : state.selectedId,
      };

    case ActionTypes.CLEAR_ALL:
      return {
        ...state,
        objects: [],
        selectedId: null,
      };

    case ActionTypes.SELECT_OBJECT:
      return {
        ...state,
        selectedId: action.payload,
      };

    case ActionTypes.SET_QUEUED:
      return {
        ...state,
        queuedObject: action.payload,
      };

    case ActionTypes.CLEAR_QUEUED:
      return {
        ...state,
        queuedObject: null,
      };

    case ActionTypes.SET_SPACE:
      return {
        ...state,
        space: { ...state.space, ...action.payload },
      };

    case ActionTypes.SET_COLOR:
      return {
        ...state,
        currentColor: action.payload,
      };

    case ActionTypes.SET_CAMERA_STARTED:
      return {
        ...state,
        cameraStarted: action.payload,
      };

    case ActionTypes.UPDATE_OBJECT_POSITION:
      return {
        ...state,
        objects: state.objects.map(o =>
          o.id === action.payload.id
            ? { ...o, position: action.payload.position }
            : o
        ),
      };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
