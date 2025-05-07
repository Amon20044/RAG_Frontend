'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { Send, FileUp, Bot, User, Loader2, X, File, FileText, MessageSquare, AlertCircle } from 'lucide-react';
const url = process.env.NEXT_PUBLIC_BACKEND_API_URL;

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const chatId = params?.id?.toString() || '';
  const fileName = searchParams.get('file');

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [showFileAlert, setShowFileAlert] = useState(false);
  const [storedFiles, setStoredFiles] = useState<Record<string, File[]>>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if files exist on initial load
  useEffect(() => {
    if ((!fileName && files.length === 0 && (!storedFiles[chatId] || storedFiles[chatId].length === 0))) {
      setShowFileAlert(true);
    } else {
      setShowFileAlert(false);
    }
  }, [fileName, files, storedFiles, chatId]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load files from storage if available for this chat
  useEffect(() => {
    if (chatId && storedFiles[chatId] && storedFiles[chatId].length > 0) {
      setFiles(storedFiles[chatId]);
    }
  }, [chatId, storedFiles]);

  const generateId = () => Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

  const sendMessage = async () => {
    if (!input.trim() && files.length === 0) return;

    // If no file is uploaded, show alert and prevent sending message
    if (files.length === 0 && !fileName) {
      setShowFileAlert(true);
      return;
    }

    const userMessage: Message = {
      id: generateId(),
      type: 'user',
      content: input || (files.length > 0 ? `Uploaded: ${files.map(f => f.name).join(', ')}` : ''),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      formData.append('question', input);
      formData.append('chatId', chatId);

      const response = await fetch(`${url}/chat/${chatId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error while fetching bot response.');
      }

      const data = await response.json();
      const botReply = data.answer || 'No response.';

      const botMessage: Message = {
        id: generateId(),
        type: 'bot',
        content: botReply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          type: 'bot',
          content: 'Error fetching response. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // Filter for only PDF files
      const pdfFiles = newFiles.filter(file => file.type === 'application/pdf');
      
      if (pdfFiles.length === 0) {
        alert('Please upload at least one PDF file.');
        return;
      }
      
      setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
      setShowFileAlert(false);
      
      // Store the files for this chat session
      if (chatId) {
        setStoredFiles(prev => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), ...pdfFiles]
        }));
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    
    // Update stored files
    if (chatId) {
      if (updatedFiles.length > 0) {
        setStoredFiles(prev => ({
          ...prev,
          [chatId]: updatedFiles
        }));
      } else {
        const updatedStoredFiles = { ...storedFiles };
        delete updatedStoredFiles[chatId];
        setStoredFiles(updatedStoredFiles);
        setShowFileAlert(true);
      }
    }
    
    if (updatedFiles.length === 0) {
      setShowFileAlert(true);
    }
  };

  const removeAllFiles = () => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Remove files from storage
    if (chatId) {
      const updatedFiles = { ...storedFiles };
      delete updatedFiles[chatId];
      setStoredFiles(updatedFiles);
    }
    
    setShowFileAlert(true);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            
            <Image
                  src="/logo.svg"  // This works because it's in the 'public' folder
                  alt="Logo"
                  width={20} // Optional, specify image dimensions
                  height={20} // Optional, specify image dimensions
            />
          </div>
          <div className="bg-green-700 px-3 py-1 rounded-full text-sm font-medium">
            Chat ID: {chatId.substring(0, 8)}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden container mx-auto p-4 flex flex-col">
        {/* File alert */}
        {showFileAlert && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-3" />
            <div className="flex-1">
              <p className="text-amber-800 font-medium">You need to upload at least one PDF file</p>
              <p className="text-amber-700 text-sm mt-1">Please upload at least one PDF document before you can start chatting with the assistant.</p>
            </div>
            <button 
              onClick={triggerFileInput}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              Upload Files
            </button>
          </div>
        )}

        {/* Files indicator */}
        {(files.length > 0 || fileName) && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">
                  {files.length > 0 ? `${files.length} file${files.length !== 1 ? 's' : ''} uploaded` : fileName}
                </span>
              </div>
              
              {files.length > 0 && (
                <div className="flex space-x-2">
                  <button 
                    onClick={triggerFileInput}
                    className="text-green-700 hover:bg-green-100 px-2 py-1 rounded text-xs font-medium"
                  >
                    Add More
                  </button>
                  <button 
                    onClick={removeAllFiles}
                    className="text-red-600 hover:bg-red-50 px-2 py-1 rounded text-xs font-medium"
                  >
                    Remove All
                  </button>
                </div>
              )}
            </div>
            
            {files.length > 0 && (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded border border-green-100">
                    <div className="flex items-center space-x-2 truncate">
                      <File className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                    </div>
                    <button 
                      onClick={() => removeFile(index)}
                      className="text-gray-500 hover:bg-gray-100 p-1 rounded-full flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <Bot className="h-16 w-16 mb-4 text-green-500 opacity-50" />
              <p className="text-lg font-medium">How can I help you today?</p>
              <p className="text-sm">Upload at least one PDF to get started</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className="flex max-w-3xl">
                  {msg.type === 'bot' && (
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Bot className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col">
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-sm ${
                        msg.type === 'user' 
                          ? 'bg-green-600 text-white rounded-tr-none' 
                          : 'bg-white border border-gray-200 rounded-tl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className={`text-xs mt-1 ${msg.type === 'user' ? 'text-right' : ''} text-gray-500`}>
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  </div>

                  {msg.type === 'user' && (
                    <div className="flex-shrink-0 ml-3 mt-1">
                      <div className="bg-green-700 p-2 rounded-full">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="flex max-w-3xl">
                <div className="flex-shrink-0 mr-3 mt-1">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Bot className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="px-4 py-3 rounded-2xl shadow-sm bg-white border border-gray-200 rounded-tl-none flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 text-green-600 animate-spin" />
                  <span className="text-gray-600">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
          {files.length > 0 && (
            <div className="flex items-center mb-3 bg-green-50 py-2 px-3 rounded-lg">
              <FileText className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-green-800 flex-1 truncate">
                {files.length === 1 
                  ? files[0].name 
                  : `${files.length} PDF files uploaded`}
              </span>
              <button
                onClick={triggerFileInput}
                className="text-green-700 hover:bg-green-100 px-2 py-1 rounded text-xs font-medium mr-2"
              >
                Add
              </button>
            </div>
          )}
          
          <div className="flex items-center">
            <button
              onClick={triggerFileInput}
              className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors mr-2"
              disabled={loading}
              title="Upload PDF files"
            >
              <FileUp className="h-5 w-5" />
            </button>
            
            <input
              type="text"
              className="flex-1 border-0 focus:ring-0 focus:outline-none bg-transparent text-gray-800 placeholder-gray-400 py-2"
              placeholder={showFileAlert ? "Upload at least one PDF to start..." : "Ask something about your PDFs..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading || showFileAlert}
            />
            
            <button
              onClick={sendMessage}
              className={`p-2 rounded-full ${
                loading || (!input.trim() && files.length === 0) || showFileAlert
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              } transition-colors`}
              disabled={loading || (!input.trim() && files.length === 0) || showFileAlert}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
          
          <div className="mt-2 flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-400">Supported format: PDF files only</span>
            {!loading && (
              <div className="text-xs text-green-600">
                {showFileAlert 
                  ? "Please upload at least one PDF file" 
                  : (input.length > 0 
                    ? `${input.length} characters` 
                    : `${files.length} file${files.length !== 1 ? 's' : ''} ready`)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}