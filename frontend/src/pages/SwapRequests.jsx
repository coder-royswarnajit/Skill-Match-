import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  XCircle, 
  User, 
  Code,
  Send,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const SwapRequests = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('incoming');
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const [incomingRequests, setIncomingRequests] = useState([
    {
      id: 1,
      from: {
        name: 'Rahul Kumar',
        university: 'IIT Bombay',
        avatar: 'RK'
      },
      skillToLearn: 'React',
      skillToTeach: 'Python',
      message: 'Hi! I would love to learn React from you. I can teach you Python in return. I have experience with Django and Flask.',
      status: 'pending',
      createdAt: '2 hours ago'
    },
    {
      id: 2,
      from: {
        name: 'Priya Sharma',
        university: 'NIT Trichy',
        avatar: 'PS'
      },
      skillToLearn: 'Machine Learning',
      skillToTeach: 'Web Development',
      message: 'I\'m interested in learning ML. I can help you with web development including React, Node.js, and MongoDB.',
      status: 'pending',
      createdAt: '1 day ago'
    }
  ]);

  const [outgoingRequests, setOutgoingRequests] = useState([
    {
      id: 3,
      to: {
        name: 'Amit Patel',
        university: 'BITS Pilani',
        avatar: 'AP'
      },
      skillToLearn: 'Data Structures',
      skillToTeach: 'JavaScript',
      message: 'I want to learn advanced data structures and algorithms. I can teach you JavaScript and React.',
      status: 'accepted',
      createdAt: '3 days ago'
    },
    {
      id: 4,
      to: {
        name: 'Neha Singh',
        university: 'VIT Vellore',
        avatar: 'NS'
      },
      skillToLearn: 'Cybersecurity',
      skillToTeach: 'Mobile Development',
      message: 'Looking to learn cybersecurity basics. I can teach you React Native and Flutter.',
      status: 'pending',
      createdAt: '5 days ago'
    }
  ]);

  const handleAcceptRequest = (requestId) => {
    setIncomingRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'accepted' }
          : req
      )
    );
  };

  const handleDeclineRequest = (requestId) => {
    setIncomingRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'declined' }
          : req
      )
    );
  };

  const handleCancelRequest = (requestId) => {
    setOutgoingRequests(prev => 
      prev.filter(req => req.id !== requestId)
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'declined': return <XCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const RequestCard = ({ request, type }) => {
    const userInfo = type === 'incoming' ? request.from : request.to;
    const skillToLearn = type === 'incoming' ? request.skillToLearn : request.skillToLearn;
    const skillToTeach = type === 'incoming' ? request.skillToTeach : request.skillToTeach;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {userInfo.avatar}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{userInfo.name}</h3>
              <p className="text-sm text-gray-600">{userInfo.university}</p>
            </div>
          </div>
          <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
            {getStatusIcon(request.status)}
            <span className="ml-1 capitalize">{request.status}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Code className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-gray-600">Wants to learn:</span>
              <span className="font-medium text-gray-900 ml-1">{skillToLearn}</span>
            </div>
            <div className="flex items-center">
              <Code className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-gray-600">Can teach:</span>
              <span className="font-medium text-gray-900 ml-1">{skillToTeach}</span>
            </div>
          </div>
        </div>

        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700 text-sm">{request.message}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            {request.createdAt}
          </div>

          <div className="flex items-center space-x-2">
            {type === 'incoming' && request.status === 'pending' && (
              <>
                <button
                  onClick={() => handleAcceptRequest(request.id)}
                  className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Accept
                </button>
                <button
                  onClick={() => handleDeclineRequest(request.id)}
                  className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Decline
                </button>
              </>
            )}

            {type === 'outgoing' && request.status === 'pending' && (
              <button
                onClick={() => handleCancelRequest(request.id)}
                className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Cancel
              </button>
            )}

            {(request.status === 'accepted' || request.status === 'completed') && (
              <Link
                to={`/chat/${request.id}`}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                Start Chat
              </Link>
            )}

            <Link
              to={`/profile/${request.id}`}
              className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              View Profile
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Swap Requests</h1>
          <p className="text-gray-600">
            Manage your incoming and outgoing skill swap requests
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('incoming')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'incoming'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Incoming Requests ({incomingRequests.filter(r => r.status === 'pending').length})
              </button>
              <button
                onClick={() => setActiveTab('outgoing')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'outgoing'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Outgoing Requests ({outgoingRequests.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'incoming' ? (
            <>
              {incomingRequests.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No incoming requests</h3>
                  <p className="text-gray-600 mb-6">
                    When other students want to learn from you, their requests will appear here.
                  </p>
                  <Link
                    to="/browse"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Requests
                  </Link>
                </div>
              ) : (
                incomingRequests.map(request => (
                  <RequestCard key={request.id} request={request} type="incoming" />
                ))
              )}
            </>
          ) : (
            <>
              {outgoingRequests.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <Send className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No outgoing requests</h3>
                  <p className="text-gray-600 mb-6">
                    Start by sending requests to students you want to learn from.
                  </p>
                  <Link
                    to="/browse"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Find Students
                  </Link>
                </div>
              ) : (
                outgoingRequests.map(request => (
                  <RequestCard key={request.id} request={request} type="outgoing" />
                ))
              )}
            </>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {incomingRequests.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Accepted</p>
                <p className="text-2xl font-bold text-gray-900">
                  {incomingRequests.filter(r => r.status === 'accepted').length + 
                   outgoingRequests.filter(r => r.status === 'accepted').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {incomingRequests.length + outgoingRequests.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapRequests; 