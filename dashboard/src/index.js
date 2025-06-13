import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import App from './App';
import PrepDashboard from './pages/prep/PrepDashboard';
import PrepBatchManagement from './pages/prep-batch/PrepBatchManagement';
import AnalysisBatchView from './pages/analysis-batch/AnalysisBatchView';
import ReviewQueue from './pages/review-queue/ReviewQueue';
import BenchSheet from './pages/bench-sheet/BenchSheet';
import ReceivingDashboard from './pages/receiving/ReceivingDashboard';
import Receiving1 from './pages/receiving/Receiving1';
import Receiving2 from './pages/receiving/Receiving2';
import Receiving3 from './pages/receiving/Receiving3';
import Receiving4 from './pages/receiving/Receiving4';
import SampleProcessing from './pages/receiving/SampleProcessing';
import SamplingDashboard from './pages/sampling/SamplingDashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sampling" element={<SamplingDashboard />} />
          <Route path="/prep" element={<PrepDashboard />} />
          <Route path="/prep-batch/:assayType" element={<PrepBatchManagement />} />
          <Route path="/analysis-batch/:assayType/:batchId" element={<AnalysisBatchView />} />
          <Route path="/review-queue/:assayType" element={<ReviewQueue />} />
          <Route path="/bench-sheet/:prepBatchId" element={<BenchSheet />} />
          <Route path="/receiving" element={<ReceivingDashboard />} />
          <Route path="/receiving1" element={<Receiving1 />} />
          <Route path="/receiving2" element={<Receiving2 />} />
          <Route path="/receiving3" element={<Receiving3 />} />
          <Route path="/receiving4" element={<Receiving4 />} />
          <Route path="/receiving/process/:manifestId" element={<SampleProcessing />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);