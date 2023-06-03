import React from 'react';

import DashboardLayout from '@/components/layout/DashboardLayout';

import useAuthStore from '@/store/useAuthStore';

import withAuth, { WithAuthProps } from '@/hoc/withAuth';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function DashboardPage() {
  const { user } = useAuthStore();
  return <div>DashboardPage</div>;
}

function LayoutWrapper(props: WithAuthProps) {
  return <DashboardLayout>{props.page}</DashboardLayout>;
}

const HomePageWrapper: React.FC<{ page: React.ReactElement }> = withAuth(
  LayoutWrapper,
  'all'
);
DashboardPage.getLayout = function getLayout(page: React.ReactElement) {
  return <HomePageWrapper page={page} />;
};