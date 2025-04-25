import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../../../components/admin/container/PageContainer';
import DashboardCard from '../../../components/admin/shared/DashboardCard';


const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Sample Page">
        <Typography>This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page This is a sample page </Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
