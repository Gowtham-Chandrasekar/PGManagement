 // App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import TenantDashboard from './pages/TenantDashboard';

import Feedback from './pages/Feedback';
import FoodTimeTable from './pages/FoodTimeTable';
import PGSearch from './pages/PGSearch';

import UpdateAdmin from './pages/Owner/UpdateAdmin';
import DeleteAdmin from './pages/Owner/DeleteAdmin';
import ListAdmins from './pages/Owner/ListAdmins';
import ViewFeedback from './pages/Owner/ViewFeedback';

import AddTenant from './pages/tenant/AddTenant';
import ListTenants from './pages/tenant/ListTenants';
import UpdateTenant from './pages/tenant/UpdateTenant';
import DeleteTenant from './pages/tenant/DeleteTenant';
import FeedbackForm from './pages/tenant/FeedbackForm';
import TenantPaymentStatus from './pages/tenant/TenantPaymentStatus';

import AddPG from './pages/pg/AddPG';
import UpdatePG from './pages/pg/UpdatePG';
import DeletePG from './pages/pg/DeletePG';
import ListPGs from './pages/pg/ListPGs';
import SearchPG from './pages/pg/SearchPG';

import UpdatePaymentStatus from './pages/payment/UpdatePaymentStatus';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* General */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/food-timetable" element={<FoodTimeTable />} />
        <Route path="/pg-search" element={<PGSearch />} />

        {/* Dashboards */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />

        {/* Owner */}
        <Route path="/owner/update-admin" element={<UpdateAdmin />} />
        <Route path="/owner/delete-admin" element={<DeleteAdmin />} />
        <Route path="/owner/list-admins" element={<ListAdmins />} />
        <Route path="/owner/view-feedback" element={<ViewFeedback />} />
        <Route path="/owner/add-pg" element={<AddPG />} />
        <Route path="/owner/update-pg" element={<UpdatePG />} />
        <Route path="/owner/delete-pg" element={<DeletePG />} />

        {/* Admin */}
        <Route path="/admin/add-tenant" element={<AddTenant />} />
        <Route path="/admin/list-tenants" element={<ListTenants />} />
        <Route path="/admin/update-tenant" element={<UpdateTenant />} />
        <Route path="/admin/delete-tenant" element={<DeleteTenant />} />
        <Route path="/admin/update-payment" element={<UpdatePaymentStatus />} />

        {/* PG */}
        <Route path="/pg/list" element={<ListPGs />} />
        <Route path="/pg/search" element={<SearchPG />} />

        {/* Tenant */}
        <Route path="/tenant/feedback" element={<FeedbackForm />} />
        <Route path="/tenant/status" element={<TenantPaymentStatus />} />
      </Routes>
    </div>
  );
};

export default App;
