import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WidgetType = 
  | 'healthScore'
  | 'activeBenefits'
  | 'healthClaims'
  | 'fsaBalance'
  | 'hsaBalance'
  | 'nextAppointment'
  | 'dependentCount'
  | 'claimsInProgress';

interface Widget {
  id: string;
  type: WidgetType;
  position: number;
}

interface DashboardState {
  widgets: Widget[];
  updateWidget: (id: string, type: WidgetType) => void;
  reorderWidgets: (widgets: Widget[]) => void;
}

const defaultWidgets: Widget[] = [
  { id: 'widget1', type: 'healthScore', position: 0 },
  { id: 'widget2', type: 'activeBenefits', position: 1 },
  { id: 'widget3', type: 'healthClaims', position: 2 },
  { id: 'widget4', type: 'fsaBalance', position: 3 },
];

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      widgets: defaultWidgets,
      updateWidget: (id, type) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, type } : widget
          ),
        })),
      reorderWidgets: (widgets) => set({ widgets }),
    }),
    {
      name: 'dashboard-storage',
    }
  )
);