'use client';

import { useState, useEffect } from 'react';
import { fetchFromBackend, sendToBackend, ApiError } from '@/lib/api';

export default function BackendDemo() {
  const [getMessage, setGetMessage] = useState('');
  const [postData, setPostData] = useState('');
  const [postResponse, setPostResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch data from backend on component mount
  useEffect(() => {
    handleGetRequest();
  }, []);

  const handleGetRequest = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetchFromBackend();
      
      if (response.success && response.data) {
        setGetMessage(response.data.message || 'No message received');
      } else {
        setError(response.error || 'Unknown error occurred');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(`API Error: ${err.message}`);
      } else {
        setError('Failed to connect to backend');
      }
      console.error('GET request error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostRequest = async () => {
    if (!postData.trim()) {
      setError('Please enter some data to send');
      return;
    }
    
    setLoading(true);
    setError('');
    setPostResponse('');
    
    try {
      const response = await sendToBackend({ data: postData });
      
      if (response.success && response.data) {
        setPostResponse(response.data.message || 'No response message');
      } else {
        setError(response.error || 'Unknown error occurred');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(`API Error: ${err.message}`);
      } else {
        setError('Failed to send data to backend');
      }
      console.error('POST request error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        NextJS ↔ Python Backend Demo
      </h1>
      
      {/* Architecture Info */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Architecture Flow:</h3>
        <p className="text-blue-800 text-sm">
          Frontend → NextJS API Routes → Python Backend → NextJS API Routes → Frontend
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* GET Request Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">GET Request</h2>
        <button
          onClick={handleGetRequest}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
        >
          {loading ? 'Loading...' : 'Fetch Data from Backend'}
        </button>
        
        {getMessage && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <strong>Backend Response:</strong> {getMessage}
          </div>
        )}
      </div>

      {/* POST Request Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">POST Request</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={postData}
            onChange={(e) => setPostData(e.target.value)}
            placeholder="Enter data to send to backend..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            onClick={handlePostRequest}
            disabled={loading || !postData.trim()}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Sending...' : 'Send Data to Backend'}
          </button>
        </div>
        
        {postResponse && (
          <div className="mt-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
            <strong>Backend Response:</strong> {postResponse}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Setup Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
          <li>Start your Python backend: <code className="bg-gray-200 px-1 rounded text-xs">uvicorn app:app --reload</code></li>
          <li>Ensure backend runs on <code className="bg-gray-200 px-1 rounded text-xs">http://localhost:8000</code></li>
          <li>Start NextJS frontend: <code className="bg-gray-200 px-1 rounded text-xs">npm run dev</code></li>
          <li>Open browser at <code className="bg-gray-200 px-1 rounded text-xs">http://localhost:3000</code></li>
        </ol>
        
        <div className="mt-3 pt-3 border-t border-gray-300">
          <p className="text-xs text-gray-600">
            <strong>Note:</strong> All requests go through NextJS API routes at <code>/api/backend</code> 
            which then communicate with the Python backend. Check the browser&apos;s Network tab to see the API calls.
          </p>
        </div>
      </div>
    </div>
  );
}
