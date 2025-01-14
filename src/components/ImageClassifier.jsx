import React, { useState, useCallback, useRef } from 'react';
import { Upload, Loader, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const ImageClassifier = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const validateFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG)');
      return false;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      setError('Image size should be less than 5MB');
      return false;
    }
    
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    return new Promise((resolve) => {
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        if (img.width < 100 || img.height < 100) {
          setError('Image dimensions should be at least 100x100 pixels');
          resolve(false);
        }
        resolve(true);
      };
    });
  };

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && await validateFile(file)) {
      processImage(file);
    }
  }, []);

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (file && await validateFile(file)) {
      processImage(file);
    }
  };

  const processImage = (file) => {
    setImage(file);
    setError('');
    setPrediction(null);

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setPrediction(null);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const result = await response.json();
      setPrediction(result);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getResultColor = (predictionClass) => {
    return predictionClass === 'Mask' 
      ? 'bg-green-50 border-green-200 text-green-700' 
      : 'bg-red-50 border-red-200 text-red-700';
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Face Mask Detection
      </h2>
      
      <div
        className="relative"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={`
          border-2 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'} 
          rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ease-in-out
          hover:border-blue-500 hover:bg-blue-50
        `}>
          {preview ? (
            <div className="space-y-4 animate-fade-in">
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
                />
                <button
                  onClick={() => {
                    setImage(null);
                    setPreview('');
                    setPrediction(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <XCircle className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          ) : (
            <div 
              className="space-y-4"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-12 w-12 text-blue-400" />
              <div>
                <p className="text-sm text-gray-600">
                  Upload a face image to detect mask
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Drag and drop or click to select
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Supported formats: JPEG, PNG (max 5MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 animate-fade-in flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      {image && (
        <div className="mt-4 animate-fade-in">
          <button
            onClick={handlePredict}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                     disabled:bg-blue-300 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Analyzing Image...
              </>
            ) : (
              'Detect Mask'
            )}
          </button>
        </div>
      )}

      {prediction && (
        <div className={`mt-4 p-4 border rounded-lg ${getResultColor(prediction.class)} 
                        transition-all duration-300 animate-fade-in`}>
          <div className="flex items-center gap-2">
            {prediction.class === 'Mask' ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
            <p className="font-semibold text-lg">
              {prediction.class === 'Mask' ? '😷 Mask Detected' : '😷 No Mask Detected'}
            </p>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${prediction.class === 'Mask' ? 'bg-green-500' : 'bg-red-500'} 
                           transition-all duration-1000 ease-out`}
                style={{ width: `${prediction.confidence * 100}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">
              Confidence: {(prediction.confidence * 100).toFixed(1)}%
            </p>
          </div>
          <p className="text-sm mt-2">
            {prediction.class === 'Mask' 
              ? 'The person in the image is wearing a face mask properly.' 
              : 'The person in the image is not wearing a face mask.'}
          </p>
        </div>
      )}
    </div>
  );
};

const style = document.createElement('style');
document.head.appendChild(style);

export default ImageClassifier;