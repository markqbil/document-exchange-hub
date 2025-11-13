import React from 'react';
import { Link, Inbox, Send, Brain, CheckCircle2, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Document Exchange Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Active Connections</span>
            <Link className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold">12</div>
          <div className="text-sm text-green-600">+2 this month</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Documents Received</span>
            <Inbox className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold">156</div>
          <div className="text-sm text-gray-500">This month</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Documents Sent</span>
            <Send className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold">203</div>
          <div className="text-sm text-gray-500">This month</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Processing Accuracy</span>
            <Brain className="h-5 w-5 text-orange-500" />
          </div>
          <div className="text-3xl font-bold">94%</div>
          <div className="text-sm text-green-600">+3% improvement</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">Sales Contract Processed</div>
                  <div className="text-sm text-gray-500">From Global Ingredients Co.</div>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center space-x-3">
                <Send className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium">Purchase Order Sent</div>
                  <div className="text-sm text-gray-500">To Premium Foods Ltd.</div>
                </div>
              </div>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center space-x-3">
                <Link className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="font-medium">New Connection Established</div>
                  <div className="text-sm text-gray-500">With Natural Spices Inc.</div>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Mapping Learning Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Global Ingredients Co.</span>
                <span className="text-sm text-gray-500">92% accuracy</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Premium Foods Ltd.</span>
                <span className="text-sm text-gray-500">85% accuracy</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Natural Spices Inc.</span>
                <span className="text-sm text-gray-500">78% accuracy</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
