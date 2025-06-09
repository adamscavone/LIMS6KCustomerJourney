import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import PrepBatchManagement from './pages/prep-batch/PrepBatchManagement';
import AnalysisBatchView from './pages/analysis-batch/AnalysisBatchView';
import ReviewQueue from './pages/review-queue/ReviewQueue';
import BenchSheet from './pages/bench-sheet/BenchSheet';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/prep-batch/:assayType" element={<PrepBatchManagement />} />
        <Route path="/analysis-batch/:assayType/:batchId" element={<AnalysisBatchView />} />
        <Route path="/review-queue/:assayType" element={<ReviewQueue />} />
        <Route path="/bench-sheet/:prepBatchId" element={<BenchSheet />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);