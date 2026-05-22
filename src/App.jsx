import { useEffect, useState } from 'react';
import './styles.css';
import UploadScreen from './components/UploadScreen';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './components/Dashboard';

export default function App() {
  const [screen, setScreen] = useState('upload');
  const [uploadFile, setUploadFile] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    document.body.setAttribute('data-palette', 'indigo');
    document.body.setAttribute('data-density', 'comfortable');
    document.body.setAttribute('data-theme', 'light');
  }, []);

  const handleStart = (file) => {
    setUploadFile(file);
    setApiError(null);
    setScreen('loading');
  };

  const handleDone = (data) => {
    setReportData(data);
    setScreen('dashboard');
  };

  const handleError = (message) => {
    setApiError(message);
    setScreen('upload');
  };

  const handleReset = () => {
    setReportData(null);
    setUploadFile(null);
    setApiError(null);
    setScreen('upload');
  };

  return (
    <>
      {screen === 'upload' && (
        <UploadScreen onStart={handleStart} error={apiError} />
      )}
      {screen === 'loading' && (
        <LoadingScreen
          file={uploadFile}
          onDone={handleDone}
          onError={handleError}
        />
      )}
      {screen === 'dashboard' && reportData && (
        <Dashboard data={reportData} onReset={handleReset} />
      )}
    </>
  );
}
