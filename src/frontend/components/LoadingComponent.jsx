import React from 'react';
import { ProgressBar, Box } from '@forge/react';

const LoadingComponent = ({ isLoading }) => (
  isLoading ? <ProgressBar ariaLabel="Loading issues" isIndeterminate /> : <Box />
);

export default LoadingComponent;
