import { FC, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute } from '../auth/ProtectedRoute';

// Auth Pages
const CustomerLogin = lazy(() => import('../pages/auth/CustomerLogin'));
const CustomerRegister = lazy(() => import('../pages/auth/CustomerRegister'));
const CustomerForgotPassword = lazy(() => import('../pages/auth/CustomerForgotPassword'));
const CustomerResetPassword = lazy(() => import('../pages/auth/CustomerResetPassword'));

// Customer Shell Pages
const Home = lazy(() => import('../pages/customer/Home'));
const Explore = lazy(() => import('../pages/customer/Explore'));
const SubcategoryList = lazy(() => import('../pages/customer/SubcategoryList'));
const ServiceList = lazy(() => import('../pages/customer/ServiceList'));
const ServiceDetail = lazy(() => import('../pages/customer/ServiceDetail'));
const CreateBooking = lazy(() => import('../pages/customer/CreateBooking'));
const BookingsList = lazy(() => import('../pages/customer/BookingsList'));
const BookingDetail = lazy(() => import('../pages/customer/BookingDetail'));
const Support = lazy(() => import('../pages/customer/Support'));
const NewSupportTicket = lazy(() => import('../pages/customer/NewSupportTicket'));
const SupportTicketDetail = lazy(() => import('../pages/customer/SupportTicketDetail'));
const Profile = lazy(() => import('../pages/customer/Profile'));
const ProfileEdit = lazy(() => import('../pages/customer/ProfileEdit'));
const ProfileSecurity = lazy(() => import('../pages/customer/ProfileSecurity'));

// Dev Playground
const UiGallery = lazy(() => import('../pages/dev/UiGallery'));

export const AppRoutes: FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />
        </div>
      }
    >
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<AuthLayout><CustomerLogin /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><CustomerRegister /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><CustomerForgotPassword /></AuthLayout>} />
        <Route path="/reset-password" element={<AuthLayout><CustomerResetPassword /></AuthLayout>} />

        {/* Authenticated Customer Shell Routes */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/category/:category" element={<SubcategoryList />} />
          <Route path="/explore/category/:category/subcategory/:subcategory" element={<ServiceList />} />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
          <Route path="/book/:serviceId" element={<CreateBooking />} />
          <Route path="/bookings" element={<BookingsList />} />
          <Route path="/bookings/:bookingId" element={<BookingDetail />} />
          <Route path="/support" element={<Support />} />
          <Route path="/support/new" element={<NewSupportTicket />} />
          <Route path="/support/:ticketId" element={<SupportTicketDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/profile/security" element={<ProfileSecurity />} />
        </Route>

        {/* Dev Playground */}
        {import.meta.env.DEV && (
          <Route path="/dev/ui" element={<UiGallery />} />
        )}

        {/* Fallback 404 Redirect */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
};
