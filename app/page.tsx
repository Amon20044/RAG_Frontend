'use client';

import { useRouter } from 'next/navigation';
import { FileSearch, ChevronRight, MessageSquare, Database, Bot, Shield } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    const randomId = Math.floor(100000 + Math.random() * 900000); // 6 digit random id
    router.push(`/chat/${randomId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className='absolute top-0 left-0 w-full h-16 z-10 flex items-center justify-center'>
        <Image
          src="/logo.svg"  // This works because it's in the 'public' folder
          alt="Logo"
          width={100} // Optional, specify image dimensions
          height={100} // Optional, specify image dimensions
        />
      </div>
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white z-0"></div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-green-500 opacity-10 rounded-bl-full z-0"></div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <Bot className="w-4 h-4 mr-1" />
                  AI-Powered Document Assistant
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Retrieve and <span className="text-green-600">Generate</span> <br className="hidden md:inline" />
                Knowledge Instantly
              </h1>

              <p className="text-lg text-gray-600 mb-8">
                Upload your documents and get intelligent answers based on your content.
                Our RAG system combines the power of retrieval with generative AI for accurate,
                context-aware responses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-xl shadow-lg transition-all duration-300 font-medium"
                >
                  Get Started
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>

                <button
                  className="flex items-center justify-center bg-white border border-green-200 hover:bg-green-50 text-green-700 text-lg px-8 py-4 rounded-xl shadow-sm transition-all duration-300 font-medium"
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="lg:w-5/12">
              <div className="bg-white rounded-2xl shadow-xl p-2 border border-gray-100">
                <div className="bg-green-600 rounded-xl p-2">
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="bg-green-600 p-3 flex items-center">
                      <MessageSquare className="h-5 w-5 text-white mr-2" />
                      <div className="text-white font-medium">
                        <Image
                          src="/logo.svg"  // This works because it's in the 'public' folder
                          alt="Logo"
                          width={100} // Optional, specify image dimensions
                          height={100} // Optional, specify image dimensions
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex mb-4">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <Bot className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm max-w-xs">
                          <p className="text-gray-800">How can I help you with your documents today?</p>
                        </div>
                      </div>

                      <div className="flex justify-end mb-6">
                        <div className="bg-green-600 rounded-2xl rounded-tr-none p-3 shadow-sm max-w-xs text-white">
                          <p>Can you summarize this financial report for me?</p>
                        </div>
                        <div className="bg-green-700 p-2 rounded-full ml-3">
                          <div className="h-5 w-5 text-white"></div>
                        </div>
                      </div>

                      <div className="bg-gray-100 rounded-xl p-3 flex items-center">
                        <input
                          type="text"
                          placeholder="Ask about your documents..."
                          className="bg-transparent border-0 flex-grow focus:outline-none text-gray-700"
                        />
                        <FileSearch className="h-5 w-5 text-green-600 mr-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <div className="mt-2 h-1 w-24 bg-green-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-transform hover:transform hover:-translate-y-1">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <FileSearch className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Upload Documents</h3>
              <p className="text-gray-600">
                Share your PDFs, DOCXs, TXT files, or CSVs. Our system processes and indexes your content for quick retrieval.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-transform hover:transform hover:-translate-y-1">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <Database className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Semantic Search</h3>
              <p className="text-gray-600">
                Our RAG engine understands the meaning behind your questions and finds the most relevant information from your documents.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-transform hover:transform hover:-translate-y-1">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <Bot className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Generation</h3>
              <p className="text-gray-600">
                Get comprehensive answers generated by AI that's grounded in your document content, ensuring accuracy and relevance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-green-600 rounded-2xl shadow-xl p-10 md:p-16">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to get started with intelligent document analysis?
                </h2>
                <p className="text-green-100 text-lg">
                  Create a new chat session in seconds with no signup required.
                </p>
              </div>
              <div>
                <button
                  onClick={handleGetStarted}
                  className="flex items-center justify-center bg-white text-green-700 text-lg px-8 py-4 rounded-xl shadow-lg transition-all duration-300 font-medium hover:bg-green-50"
                >
                  Start Chatting
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-xl font-bold text-gray-900">
                <Image
                  src="/logo.svg"  // This works because it's in the 'public' folder
                  alt="Logo"
                  width={100} // Optional, specify image dimensions
                  height={100} // Optional, specify image dimensions
                />
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <Shield className="h-4 w-4 mr-1" />
              <span>Your documents are processed securely and not stored permanently</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
