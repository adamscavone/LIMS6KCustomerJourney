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
import NonMetrcReceiving1 from './pages/receiving/NonMetrcReceiving1';
import NonMetrcReceiving2 from './pages/receiving/NonMetrcReceiving2';
import NonMetrcReceiving3 from './pages/receiving/NonMetrcReceiving3';
import NonMetrcReceiving4 from './pages/receiving/NonMetrcReceiving4';
import SampleProcessing from './pages/receiving/SampleProcessing';
import SamplingDashboard from './pages/sampling/SamplingDashboard';
import NonMetrc1 from './pages/receiving/NonMetrc1';
import NonMetrc2 from './pages/receiving/NonMetrc2';
import NonMetrc3 from './pages/receiving/NonMetrc3';
import NonMetrc4 from './pages/receiving/NonMetrc4';
import ReportingDashboard from './pages/reporting/ReportingDashboard';
import ReportingQueue from './pages/reporting/ReportingQueue';
import QueueAssessment from './pages/reporting/QueueAssessment';
import SampleProgressTracking from './pages/reporting/SampleProgressTracking';
import ResultsReview from './pages/reporting/ResultsReview';
import ComplianceReporting from './pages/reporting/ComplianceReporting';
import CustomerCommunication from './pages/reporting/CustomerCommunication';
import PerformanceAnalytics from './pages/reporting/PerformanceAnalytics';
import Reporting1 from './pages/reporting/Reporting1';
import Reporting2 from './pages/reporting/Reporting2';
import Reporting3 from './pages/reporting/Reporting3';
import Reporting4 from './pages/reporting/Reporting4';
import SampleReporting from './pages/reporting/SampleReporting';
import SampleResultsDetail from './pages/reporting/SampleResultsDetail';

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
          <Route path="/metrc-receiving" element={<Receiving4 />} />
          <Route path="/non-metrc-receiving1" element={<NonMetrcReceiving1 />} />
          <Route path="/non-metrc-receiving2" element={<NonMetrcReceiving2 />} />
          <Route path="/non-metrc-receiving3" element={<NonMetrcReceiving3 />} />
          <Route path="/non-metrc-receiving4" element={<NonMetrcReceiving4 />} />
          <Route path="/receiving/process/:manifestId" element={<SampleProcessing />} />
          <Route path="/non-metrc1" element={<NonMetrc1 />} />
          <Route path="/non-metrc2" element={<NonMetrc2 />} />
          <Route path="/non-metrc3" element={<NonMetrc3 />} />
          <Route path="/non-metrc4" element={<NonMetrc4 />} />
          <Route path="/reporting" element={<ReportingDashboard />} />
          <Route path="/reporting1" element={<Reporting1 />} />
          <Route path="/reporting2" element={<Reporting2 />} />
          <Route path="/reporting3" element={<Reporting3 />} />
          <Route path="/reporting4" element={<Reporting4 />} />
          <Route path="/reporting/queue" element={<ReportingQueue />} />
          <Route path="/reporting/queue-assessment" element={<QueueAssessment />} />
          <Route path="/reporting/sample-progress" element={<SampleProgressTracking />} />
          <Route path="/reporting/results-review" element={<ResultsReview />} />
          <Route path="/reporting/compliance" element={<ComplianceReporting />} />
          <Route path="/reporting/customer-communication" element={<CustomerCommunication />} />
          <Route path="/reporting/performance" element={<PerformanceAnalytics />} />
          <Route path="/reporting/samples" element={<SampleReporting />} />
          <Route path="/reporting/sample/:sampleId" element={<SampleResultsDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);