export interface BundleServiceItem {
  id: string;
  name: string;
  category: string;
  base_price: number;
  image_url?: string;
}

const STORAGE_KEY = 'smartserve_bundle_cart';

export const getBundleItems = (): BundleServiceItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addBundleItem = (item: BundleServiceItem): BundleServiceItem[] => {
  const current = getBundleItems();
  if (current.some((x) => x.id === item.id)) {
    return current;
  }
  const updated = [...current, item];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('smartserve_bundle_updated'));
  } catch (err) {
    console.error('Failed to save bundle item:', err);
  }
  return updated;
};

export const removeBundleItem = (id: string): BundleServiceItem[] => {
  const current = getBundleItems();
  const updated = current.filter((x) => x.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('smartserve_bundle_updated'));
  } catch (err) {
    console.error('Failed to remove bundle item:', err);
  }
  return updated;
};

export const clearBundle = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('smartserve_bundle_updated'));
  } catch (err) {
    console.error('Failed to clear bundle:', err);
  }
};

export const isInBundle = (id: string): boolean => {
  const current = getBundleItems();
  return current.some((x) => x.id === id);
};
