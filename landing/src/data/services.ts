import {
  Zap,
  Wrench,
  Sparkles,
  Leaf,
  Brain,
  MapPin,
  type LucideIcon,
} from 'lucide-react';

export type MockupKey =
  | 'emergency'
  | 'maintenance'
  | 'wellness'
  | 'cleaning'
  | 'aimatch'
  | 'tracking';

export type ServiceShowcase = {
  id: MockupKey;
  label: string;
  icon: LucideIcon;
  tagline: string;
  heading: string;
  description: string;
  bullets: string[];
  gradient: { from: string; via: string; to: string };
  accent: string;
  mockup: MockupKey;
};

export const SERVICES: ServiceShowcase[] = [
  {
    id: 'emergency',
    label: 'Emergency Repairs',
    icon: Zap,
    tagline: 'Priority Dispatch',
    heading: 'Priority dispatch in minutes',
    description:
      'Short circuits, pipe bursts, gas leaks — flagged for immediate priority dispatch with the nearest verified professional alerted instantly.',
    bullets: [
      'Auto-flagged emergencies skip the queue',
      'Nearest verified pro alerted instantly',
      'Live ETA shared with your family',
    ],
    gradient: { from: '#FEE2E2', via: '#FCA5A5', to: '#FDBA74' },
    accent: '#DC2626',
    mockup: 'emergency',
  },
  {
    id: 'maintenance',
    label: 'Home Maintenance',
    icon: Wrench,
    tagline: 'Smart Scheduling',
    heading: 'Book the exact slot you want',
    description:
      'Plumbing, electrical, carpentry, and painting — scheduled at your convenience with real-time availability and instant confirmation.',
    bullets: [
      'Live slot availability across 85+ pros',
      'Reschedule up to 2h before the job',
      'No-show guarantee or full refund',
    ],
    gradient: { from: '#DCFCE7', via: '#86EFAC', to: '#A7F3D0' },
    accent: '#16A34A',
    mockup: 'maintenance',
  },
  {
    id: 'wellness',
    label: 'Beauty & Wellness',
    icon: Sparkles,
    tagline: 'Premium At-Home',
    heading: 'Salon-grade care, delivered',
    description:
      'Salon-grade facials, haircare, and grooming — delivered to your home by OCR-verified beauty professionals with 4.9★ ratings.',
    bullets: [
      'OCR-verified professional credentials',
      'Premium product kits brought to you',
      'Satisfaction guaranteed or rebooked free',
    ],
    gradient: { from: '#FCE7F3', via: '#F9A8D4', to: '#FBCFE8' },
    accent: '#DB2777',
    mockup: 'wellness',
  },
  {
    id: 'cleaning',
    label: 'Cleaning & Hygiene',
    icon: Leaf,
    tagline: 'Deep Clean',
    heading: 'Spotless — every time',
    description:
      'Deep cleaning, sanitisation, and pest control by background-verified pros with a structured checklist and transparent progress reporting.',
    bullets: [
      '47-point quality checklist per visit',
      'Eco-safe certified cleaning products',
      'Real-time photo progress updates',
    ],
    gradient: { from: '#E0F2FE', via: '#7DD3FC', to: '#BAE6FD' },
    accent: '#0284C7',
    mockup: 'cleaning',
  },
  {
    id: 'aimatch',
    label: 'AI-Powered Matching',
    icon: Brain,
    tagline: 'AI Confidence',
    heading: '96% match accuracy, every time',
    description:
      'OCR-verified credentials, AI confidence scoring, and smart provider recommendations ensure the best-fit professional for every job.',
    bullets: [
      'Multi-factor credential verification via OCR',
      'Intent-to-profile AI matching engine',
      'Confidence score shown before booking',
    ],
    gradient: { from: '#EDE9FE', via: '#C4B5FD', to: '#DDD6FE' },
    accent: '#7C3AED',
    mockup: 'aimatch',
  },
  {
    id: 'tracking',
    label: 'Real-Time Tracking',
    icon: MapPin,
    tagline: 'Live Updates',
    heading: 'See every step, in real time',
    description:
      'Live booking status, OTP-verified job completion, and transparent pricing — know exactly where your professional is and when the job is done.',
    bullets: [
      'Live status: accepted → en route → on job',
      'OTP-verified completion — no disputes',
      'Full price breakdown before and after',
    ],
    gradient: { from: '#CCFBF1', via: '#5EEAD4', to: '#99F6E4' },
    accent: '#0D9488',
    mockup: 'tracking',
  },
];
