import { apiClient } from './client';
import { getCategoryImage } from '../utils/serviceImages';

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image: string;
  service_count: number;
}

export interface SubcategoryItem {
  id: string;
  category_id: string;
  category_slug: string;
  name: string;
  slug: string;
  service_count: number;
}

export interface AddonItem {
  addon_id: string;
  name: string;
  price: number;
  description?: string;
}

export interface ServiceProcessStep {
  step_number: number;
  title: string;
  description: string;
  duration_minutes: number;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  category_slug: string;
  subcategory: string;
  subcategory_slug: string;
  description: string;
  features: string[];
  base_price: number;
  duration_minutes: number;
  rating: number;
  review_count: number;
  is_emergency: boolean;
  image_url: string;
  suggested_addons: AddonItem[];
  process_steps: ServiceProcessStep[];
  faqs: ServiceFAQ[];
}

export interface RecommendationItem {
  id: string;
  service: ServiceItem;
  reason: string;
}

export interface FetchServicesParams {
  category?: string;
  subcategory?: string;
  q?: string;
  emergency_only?: boolean;
  sort_by?: 'price_asc' | 'price_desc' | 'name_asc' | 'rating';
  page?: number;
  limit?: number;
}

// Mock Catalog Database for offline / 404 resilience
export const MOCK_CATEGORIES: CategoryItem[] = [
  { id: 'cat-1', name: 'AC & Appliance Repair', slug: 'ac-repair', image: getCategoryImage('ac-repair'), service_count: 12 },
  { id: 'cat-2', name: 'Deep Cleaning', slug: 'cleaning', image: getCategoryImage('cleaning'), service_count: 18 },
  { id: 'cat-3', name: 'Plumbing Services', slug: 'plumbing', image: getCategoryImage('plumbing'), service_count: 15 },
  { id: 'cat-4', name: 'Electrician & Wiring', slug: 'electrician', image: getCategoryImage('electrician'), service_count: 14 },
  { id: 'cat-5', name: 'Painting & Waterproofing', slug: 'painting', image: getCategoryImage('painting'), service_count: 8 },
  { id: 'cat-6', name: 'Pest Control', slug: 'pest-control', image: getCategoryImage('pest-control'), service_count: 6 },
  { id: 'cat-7', name: 'Salon for Women', slug: 'salon-women', image: getCategoryImage('salon-women'), service_count: 22 },
  { id: 'cat-8', name: 'Salon for Men', slug: 'salon-men', image: getCategoryImage('salon-men'), service_count: 10 },
  { id: 'cat-9', name: 'Carpentry & Furniture', slug: 'carpentry', image: getCategoryImage('carpentry'), service_count: 9 },
  { id: 'cat-10', name: 'Gardening & Lawn', slug: 'gardening', image: getCategoryImage('gardening'), service_count: 7 },
  { id: 'cat-11', name: 'Water Purifier & RO', slug: 'water-purifier', image: getCategoryImage('water-purifier'), service_count: 5 },
  { id: 'cat-12', name: 'Home Security & CCTV', slug: 'home-security', image: getCategoryImage('home-security'), service_count: 6 },
  { id: 'cat-13', name: 'Car Spa & Detailing', slug: 'car-spa', image: getCategoryImage('car-spa'), service_count: 8 },
  { id: 'cat-14', name: 'Appliance Care', slug: 'appliance-repair', image: getCategoryImage('appliance-repair'), service_count: 11 },
];

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 'srv-ac-101',
    name: 'Split AC Foam Jet Deep Service',
    category: 'AC & Appliance Repair',
    category_slug: 'ac-repair',
    subcategory: 'AC Servicing',
    subcategory_slug: 'ac-servicing',
    description: 'Thorough 360-degree foam jet cleaning for indoor and outdoor AC units. Restores cooling efficiency and eliminates foul odor.',
    features: ['Foam Jet Technology', 'Free gas pressure check', '30-Day post-service warranty', 'Mess-free jacket cover cleaning'],
    base_price: 699,
    duration_minutes: 60,
    rating: 4.8,
    review_count: 420,
    is_emergency: true,
    image_url: getCategoryImage('ac-repair'),
    suggested_addons: [
      { addon_id: 'add-1', name: 'Anti-bacterial spray coating', price: 199, description: 'Long lasting freshness and mold protection' },
      { addon_id: 'add-2', name: 'Outdoor unit deep pressure wash', price: 299, description: 'Removes deep mud and debris build-up' },
    ],
    process_steps: [
      { step_number: 1, title: 'Pre-service inspection', description: 'Technician checks cooling performance and electrical points.', duration_minutes: 10 },
      { step_number: 2, title: 'Foam jet wash', description: 'High-pressure foam jet wash of cooling coils and blower fan.', duration_minutes: 35 },
      { step_number: 3, title: 'Post-service test', description: 'Testing airflow and temperature drop.', duration_minutes: 15 },
    ],
    faqs: [
      { question: 'Does this service include gas refill?', answer: 'Gas pressure check is included. Refilling will be charged separately if gas level is low.' },
      { question: 'What is the warranty period?', answer: 'We offer a 30-day service warranty on cooling and performance.' },
    ],
  },
  {
    id: 'srv-clean-201',
    name: 'Full Home Deep Cleaning (2 BHK)',
    category: 'Deep Cleaning',
    category_slug: 'cleaning',
    subcategory: 'Full Home',
    subcategory_slug: 'full-home',
    description: 'Complete deep cleaning of living rooms, bedrooms, kitchen, bathrooms, balconies, and window tracks using industrial grade vacuums.',
    features: ['Machine scrubbing of floors', 'Kitchen degreasing', 'Bathroom sanitation', 'Hard-to-reach window cleaning'],
    base_price: 3499,
    duration_minutes: 240,
    rating: 4.9,
    review_count: 310,
    is_emergency: false,
    image_url: getCategoryImage('cleaning'),
    suggested_addons: [
      { addon_id: 'add-3', name: 'Sofa shampooing (5 seater)', price: 799, description: 'Deep upholstery extraction cleaning' },
      { addon_id: 'add-4', name: 'Balcony pressure washing', price: 399, description: 'High pressure water blast for floor tiles' },
    ],
    process_steps: [
      { step_number: 1, title: 'Dusting & Vacuuming', description: 'Removing dust from ceiling fans, walls, and light fixtures.', duration_minutes: 60 },
      { step_number: 2, title: 'Kitchen & Bath Scrubbing', description: 'Deep tile scrubbing and grease extraction.', duration_minutes: 120 },
      { step_number: 3, title: 'Floor Buffing', description: 'Single-disc machine floor buffing and mopping.', duration_minutes: 60 },
    ],
    faqs: [
      { question: 'Do I need to supply cleaning materials?', answer: 'No, our team carries all specialized equipment and eco-friendly chemicals.' },
    ],
  },
  {
    id: 'srv-[#2563EB]-301',
    name: 'Emergency Pipe Leak Repair',
    category: 'Plumbing Services',
    category_slug: 'plumbing',
    subcategory: 'Leaks & Repairs',
    subcategory_slug: 'leaks-repairs',
    description: 'Urgent emergency plumber visit for burst pipes, leaking valves, overflowing flush tanks, or severe drain blockages.',
    features: ['Arrives in under 45 mins', 'All fitting tools included', 'Instant sealant application'],
    base_price: 399,
    duration_minutes: 45,
    rating: 4.7,
    review_count: 180,
    is_emergency: true,
    image_url: getCategoryImage('plumbing'),
    suggested_addons: [
      { addon_id: 'add-5', name: 'Heavy-duty brass valve replace', price: 450, description: 'Commercial grade angle valve replacement' },
    ],
    process_steps: [
      { step_number: 1, title: 'Main valve shutoff', description: 'Locating source leak and securing main line pressure.', duration_minutes: 10 },
      { step_number: 2, title: 'Pipe patch & replacement', description: 'Replacing broken thread segment or applying teflon tape seal.', duration_minutes: 35 },
    ],
    faqs: [
      { question: 'How quickly does the plumber arrive for emergency calls?', answer: 'Emergency calls are assigned highest dispatch priority for rapid arrival.' },
    ],
  },
  {
    id: 'srv-elec-401',
    name: 'Switchboard & Short Circuit Repair',
    category: 'Electrician & Wiring',
    category_slug: 'electrician',
    subcategory: 'Switches & Wiring',
    subcategory_slug: 'switches-wiring',
    description: 'Diagnostic inspection and replacement of burnt switches, tripping MCBs, socket sparking, or main line wiring faults.',
    features: ['Certified electricians', 'Safety insulated tools', 'Same day service'],
    base_price: 249,
    duration_minutes: 30,
    rating: 4.8,
    review_count: 290,
    is_emergency: true,
    image_url: getCategoryImage('electrician'),
    suggested_addons: [
      { addon_id: 'add-6', name: 'Anchor Modular Switch (16A)', price: 120, description: 'Original high-load modular switch' },
    ],
    process_steps: [
      { step_number: 1, title: 'Voltage test', description: 'Multimeter voltage check and circuit tracing.', duration_minutes: 10 },
      { step_number: 2, title: 'Wiring fix', description: 'Re-terminating loose wires and fitting new socket unit.', duration_minutes: 20 },
    ],
    faqs: [
      { question: 'Are spare switches included in base price?', answer: 'Labor is included in base price. Spare parts are billed transparently as per rate card.' },
    ],
  },
];

export const getCategories = async (): Promise<CategoryItem[]> => {
  try {
    const res = await apiClient.get<CategoryItem[]>('/customer/catalog/categories');
    return Array.isArray(res.data) ? res.data : MOCK_CATEGORIES;
  } catch {
    return MOCK_CATEGORIES;
  }
};

export const getServices = async (params?: FetchServicesParams): Promise<ServiceItem[]> => {
  try {
    const res = await apiClient.get<ServiceItem[]>('/customer/catalog/services', { params });
    if (Array.isArray(res.data)) return res.data;
  } catch {
    // Fall through to mock filtering
  }

  let filtered = [...MOCK_SERVICES];
  if (params?.category) {
    const cat = params.category;
    filtered = filtered.filter((s) => s.category_slug === cat || s.category.toLowerCase().includes(cat.toLowerCase()));
  }
  if (params?.emergency_only) {
    filtered = filtered.filter((s) => s.is_emergency);
  }
  if (params?.q) {
    const q = params.q.toLowerCase();
    filtered = filtered.filter(
      (s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    );
  }
  if (params?.sort_by === 'price_asc') {
    filtered.sort((a, b) => a.base_price - b.base_price);
  } else if (params?.sort_by === 'price_desc') {
    filtered.sort((a, b) => b.base_price - a.base_price);
  } else if (params?.sort_by === 'name_asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }
  return filtered;
};

export const getServiceById = async (id: string): Promise<ServiceItem> => {
  try {
    const res = await apiClient.get<ServiceItem>(`/customer/catalog/services/${id}`);
    if (res.data && typeof res.data === 'object' && res.data.id) {
      return res.data;
    }
  } catch {
    // Fall through to mock
  }

  const found = MOCK_SERVICES.find((s) => s.id === id);
  if (found) return found;
  return MOCK_SERVICES[0]!;
};

export const getRecommendations = async (): Promise<RecommendationItem[]> => {
  try {
    const res = await apiClient.get<RecommendationItem[]>('/customer/recommendations');
    if (Array.isArray(res.data)) return res.data;
  } catch {
    // Fall through to mock
  }

  return [
    { id: 'rec-1', service: MOCK_SERVICES[0]!, reason: 'Based on seasonal AC usage in your area' },
    { id: 'rec-2', service: MOCK_SERVICES[1]!, reason: 'Popular with home owners this month' },
  ];
};
