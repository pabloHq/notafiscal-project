import React, { useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { processReceiptImage } from '../services/openaiService';

const ImageUploader = ({ setReceiptData }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processImage = async (file) => {
    try {
      setIsProcessing(true);
      setError(null);
      const result = await processReceiptImage(file);
      setReceiptData(result);
      navigate('/results');
    } catch (err) {
      console.error('Erro ao processar imagem:', err);
      setError(err.message || 'Erro ao processar a imagem. Por favor, tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImage(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processImage(e.target.files[0]);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Processamento de Nota Fiscal
        </h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div
          className={`
            relative
            flex
            flex-col
            items-center
            justify-center
            w-full
            min-h-[200px]
            border-2
            border-dashed
            rounded-lg
            transition-all
            duration-200
            ease-in-out
            ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
            ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="hidden"
            id="image-upload"
            accept="image/*"
            onChange={handleChange}
            disabled={isProcessing}
          />

          <label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center w-full h-full p-6 ${isProcessing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {isProcessing ? (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-lg font-medium text-gray-700">Processando imagem...</p>
              </div>
            ) : (
              <>
                <Upload
                  className={`w-12 h-12 mb-3 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`}
                />
                <p className="mb-2 text-lg font-medium text-gray-700">
                  Arraste e solte sua imagem aqui
                </p>
                <p className="text-sm text-gray-500">
                  ou clique para selecionar
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  PNG, JPG (Máx. 10MB)
                </p>
              </>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;