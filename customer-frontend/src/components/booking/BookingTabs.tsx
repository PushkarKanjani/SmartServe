import { FC } from 'react';
import { Tabs, TabItem } from '../ui/Tabs';

export interface BookingTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
  counts: {
    upcoming: number;
    active: number;
    completed: number;
    cancelled: number;
  };
}

export const BookingTabs: FC<BookingTabsProps> = ({ activeTab, onChange, counts }) => {
  const items: TabItem[] = [
    { id: 'upcoming', label: 'Upcoming', count: counts.upcoming },
    { id: 'active', label: 'In Progress', count: counts.active },
    { id: 'completed', label: 'Completed', count: counts.completed },
    { id: 'cancelled', label: 'Cancelled', count: counts.cancelled },
  ];

  return <Tabs activeTab={activeTab} onChange={onChange} items={items} />;
};
