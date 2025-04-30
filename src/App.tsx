import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { LoginPage } from './pages/auth/LoginPage';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { HomePage } from './pages/HomePage';
import { ThemeColors } from './pages/theme/ThemeColors';
import { ThemeTypography } from './pages/theme/ThemeTypography';
import { ThemeLogo } from './pages/theme/ThemeLogo';
import { ReleaseManagement } from './pages/releases/ReleaseManagement';
import { UserList } from './pages/user-management/UserList';
import { RoleList } from './pages/user-management/RoleList';
import { AccountDetails } from './pages/hsa/AccountDetails';
import { Investments } from './pages/hsa/Investments';
import { Claims } from './pages/hsa/Claims';
import { DependentList } from './pages/dependents/DependentList';
import { Medical } from './pages/benefits/Medical';
import { Dental } from './pages/benefits/Dental';
import { Vision } from './pages/benefits/Vision';
import { LifeInsurance } from './pages/benefits/LifeInsurance';
import { Disability } from './pages/benefits/Disability';
import { Plans } from './pages/plain-setup/Plans';
import { AvailableReports } from './pages/reports/AvailableReports';
import { ReportSubscriptions } from './pages/reports/ReportSubscriptions';
import { MakePayment } from './pages/cobra/MakePayment';
import { PaymentHistory } from './pages/cobra/PaymentHistory';
import { Documents } from './pages/cobra/Documents';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={
          <PrivateRoute>
            <Layout>
              <HomePage />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/theme/colors" element={
          <PrivateRoute>
            <Layout>
              <ThemeColors />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/theme/typography" element={
          <PrivateRoute>
            <Layout>
              <ThemeTypography />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/theme/logo" element={
          <PrivateRoute>
            <Layout>
              <ThemeLogo />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/releases" element={
          <PrivateRoute>
            <Layout>
              <ReleaseManagement />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/user-management/users" element={
          <PrivateRoute>
            <Layout>
              <UserList />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/user-management/roles" element={
          <PrivateRoute>
            <Layout>
              <RoleList />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/hsa/account" element={
          <PrivateRoute>
            <Layout>
              <AccountDetails />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/hsa/investments" element={
          <PrivateRoute>
            <Layout>
              <Investments />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/hsa/claims" element={
          <PrivateRoute>
            <Layout>
              <Claims />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/cobra/payments" element={
          <PrivateRoute>
            <Layout>
              <MakePayment />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/cobra/history" element={
          <PrivateRoute>
            <Layout>
              <PaymentHistory />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/cobra/documents" element={
          <PrivateRoute>
            <Layout>
              <Documents />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/dependents" element={
          <PrivateRoute>
            <Layout>
              <DependentList />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/health/medical" element={
          <PrivateRoute>
            <Layout>
              <Medical />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/health/dental" element={
          <PrivateRoute>
            <Layout>
              <Dental />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/health/vision" element={
          <PrivateRoute>
            <Layout>
              <Vision />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/health/life" element={
          <PrivateRoute>
            <Layout>
              <LifeInsurance />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/health/disability" element={
          <PrivateRoute>
            <Layout>
              <Disability />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/plan-setup/plans" element={
          <PrivateRoute>
            <Layout>
              <Plans />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/reports/available" element={
          <PrivateRoute>
            <Layout>
              <AvailableReports />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/reports/subscriptions" element={
          <PrivateRoute>
            <Layout>
              <ReportSubscriptions />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;