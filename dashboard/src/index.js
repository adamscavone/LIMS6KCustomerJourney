import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import App from './App';
import PrepBatchManagement from './pages/prep-batch/PrepBatchManagement';
import AnalysisBatchView from './pages/analysis-batch/AnalysisBatchView';
import ReviewQueue from './pages/review-queue/ReviewQueue';
import BenchSheet from './pages/bench-sheet/BenchSheet';
import ReceivingDashboard from './pages/receiving/ReceivingDashboard';
import SampleProcessing from './pages/receiving/SampleProcessing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/prep-batch/:assayType" element={<PrepBatchManagement />} />
          <Route path="/analysis-batch/:assayType/:batchId" element={<AnalysisBatchView />} />
          <Route path="/review-queue/:assayType" element={<ReviewQueue />} />
          <Route path="/bench-sheet/:prepBatchId" element={<BenchSheet />} />
          <Route path="/receiving" element={<ReceivingDashboard />} />
          <Route path="/receiving/process/:manifestId" element={<SampleProcessing />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);