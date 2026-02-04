'use client'

import { Card, Row, Col, Avatar, Button, Descriptions, Upload, message, Form, Input } from 'antd'
import { UserOutlined, CameraOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'
import { useState } from 'react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()

  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Senior Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    joinedDate: 'January 15, 2023',
    bio: 'Passionate software engineer with 5+ years of experience in full-stack development.',
  }

  const handleSave = (values: any) => {
    console.log('Saved values:', values)
    message.success('Profile updated successfully!')
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <Button
          type="primary"
          icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
          onClick={() => {
            if (isEditing) {
              form.submit()
            } else {
              setIsEditing(true)
            }
          }}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {/* Profile Card */}
        <Col xs={24} lg={8}>
          <Card className="text-center">
            <div className="relative inline-block">
              <Avatar size={120} icon={<UserOutlined />} className="mb-4" />
              <Button
                type="primary"
                shape="circle"
                icon={<CameraOutlined />}
                className="absolute bottom-2 right-0"
                size="small"
              />
            </div>
            <h2 className="mb-1 text-xl font-bold text-gray-800">{userProfile.name}</h2>
            <p className="mb-4 text-gray-600">{userProfile.role}</p>
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-gray-600">Department</span>
                <span className="font-semibold">{userProfile.department}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-gray-600">Location</span>
                <span className="font-semibold">{userProfile.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Joined</span>
                <span className="font-semibold">{userProfile.joinedDate}</span>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <h3 className="mb-4 font-bold text-gray-800">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Projects</span>
                <span className="text-2xl font-bold text-blue-600">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tasks Completed</span>
                <span className="text-2xl font-bold text-green-600">148</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Team Members</span>
                <span className="text-2xl font-bold text-purple-600">8</span>
              </div>
            </div>
          </Card>
        </Col>

        {/* Profile Information */}
        <Col xs={24} lg={16}>
          <Card title="Personal Information">
            {isEditing ? (
              <Form form={form} layout="vertical" initialValues={userProfile} onFinish={handleSave}>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, type: 'email' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Phone" name="phone">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Role" name="role">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Department" name="department">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Location" name="location">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item label="Bio" name="bio">
                      <Input.TextArea rows={4} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            ) : (
              <Descriptions column={{ xs: 1, sm: 2 }} bordered>
                <Descriptions.Item label="Full Name">{userProfile.name}</Descriptions.Item>
                <Descriptions.Item label="Email">{userProfile.email}</Descriptions.Item>
                <Descriptions.Item label="Phone">{userProfile.phone}</Descriptions.Item>
                <Descriptions.Item label="Role">{userProfile.role}</Descriptions.Item>
                <Descriptions.Item label="Department">{userProfile.department}</Descriptions.Item>
                <Descriptions.Item label="Location">{userProfile.location}</Descriptions.Item>
                <Descriptions.Item label="Bio" span={2}>
                  {userProfile.bio}
                </Descriptions.Item>
              </Descriptions>
            )}
          </Card>

          {/* Recent Activity */}
          <Card title="Recent Activity" className="mt-6">
            <div className="space-y-4">
              {[
                {
                  action: 'Updated profile information',
                  time: '2 hours ago',
                  color: 'bg-blue-100 text-blue-600',
                },
                {
                  action: 'Completed project milestone',
                  time: '1 day ago',
                  color: 'bg-green-100 text-green-600',
                },
                {
                  action: 'Joined new team',
                  time: '3 days ago',
                  color: 'bg-purple-100 text-purple-600',
                },
                {
                  action: 'Changed password',
                  time: '1 week ago',
                  color: 'bg-orange-100 text-orange-600',
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                  <div
                    className={`h-10 w-10 rounded-full ${activity.color} flex items-center justify-center`}
                  >
                    <UserOutlined />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
