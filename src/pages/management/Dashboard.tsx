
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '@/components/Header';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, MessageSquare, Tag, BarChart as BarChartIcon } from 'lucide-react';

// Dummy data for the dashboard
const activityData = [
  { name: 'Jan', messages: 4, polls: 2 },
  { name: 'Feb', messages: 7, polls: 3 },
  { name: 'Mar', messages: 5, polls: 4 },
  { name: 'Apr', messages: 10, polls: 6 },
  { name: 'May', messages: 8, polls: 2 },
  { name: 'Jun', messages: 12, polls: 5 },
];

const topTags = [
  { name: 'Feedback', count: 28 },
  { name: 'Question', count: 24 },
  { name: 'Suggestion', count: 18 },
  { name: 'Issue', count: 15 },
  { name: 'Praise', count: 12 },
];

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Company Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">152</div>
              <p className="text-xs text-muted-foreground">+12 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">+8 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Polls Created</CardTitle>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tags Used</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">103</div>
              <p className="text-xs text-muted-foreground">+15 this month</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="messages" fill="#8884d8" name="Messages" />
                  <Bar dataKey="polls" fill="#82ca9d" name="Polls" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTags.map((tag, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-sm font-medium flex-1">{tag.name}</span>
                    <span className="text-sm text-muted-foreground">{tag.count}</span>
                    <div className="w-full bg-gray-200 h-2 ml-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${(tag.count / topTags[0].count) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
