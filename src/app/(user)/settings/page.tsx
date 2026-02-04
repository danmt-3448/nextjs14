'use client'

import { Card, Row, Col, Switch, Button, Select, Divider, message } from 'antd'
import {
  BellOutlined,
  LockOutlined,
  GlobalOutlined,
  EyeOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { useState } from 'react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weeklyReport: true,
  })

  const handleSave = () => {
    message.success('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <Button type="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {/* Notifications */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <BellOutlined className="text-blue-600" />
                <span>Notifications</span>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Email Notifications</div>
                  <div className="text-sm text-gray-600">Receive notifications via email</div>
                </div>
                <Switch
                  checked={notifications.email}
                  onChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <Divider className="my-3" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Push Notifications</div>
                  <div className="text-sm text-gray-600">Receive push notifications</div>
                </div>
                <Switch
                  checked={notifications.push}
                  onChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>
              <Divider className="my-3" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">SMS Notifications</div>
                  <div className="text-sm text-gray-600">Receive text message alerts</div>
                </div>
                <Switch
                  checked={notifications.sms}
                  onChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                />
              </div>
              <Divider className="my-3" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Weekly Report</div>
                  <div className="text-sm text-gray-600">Receive weekly summary email</div>
                </div>
                <Switch
                  checked={notifications.weeklyReport}
                  onChange={(checked) =>
                    setNotifications({ ...notifications, weeklyReport: checked })
                  }
                />
              </div>
            </div>
          </Card>
        </Col>

        {/* Security */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <LockOutlined className="text-green-600" />
                <span>Security</span>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Two-Factor Authentication</div>
                  <div className="text-sm text-gray-600">Add an extra layer of security</div>
                </div>
                <Button type="primary">Enable</Button>
              </div>
              <Divider className="my-3" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Change Password</div>
                  <div className="text-sm text-gray-600">Update your password regularly</div>
                </div>
                <Button>Change</Button>
              </div>
              <Divider className="my-3" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Active Sessions</div>
                  <div className="text-sm text-gray-600">Manage your active devices</div>
                </div>
                <Button>View</Button>
              </div>
              <Divider className="my-3" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Login History</div>
                  <div className="text-sm text-gray-600">Review recent login activity</div>
                </div>
                <Button>View</Button>
              </div>
            </div>
          </Card>
        </Col>

        {/* Appearance */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <EyeOutlined className="text-purple-600" />
                <span>Appearance</span>
              </div>
            }
          >
            <div className="space-y-4">
              <div>
                <div className="mb-2 font-semibold text-gray-800">Theme</div>
                <Select defaultValue="light" className="w-full">
                  <Select.Option value="light">Light</Select.Option>
                  <Select.Option value="dark">Dark</Select.Option>
                  <Select.Option value="auto">Auto</Select.Option>
                </Select>
              </div>
              <Divider className="my-3" />
              <div>
                <div className="mb-2 font-semibold text-gray-800">Language</div>
                <Select defaultValue="en" className="w-full">
                  <Select.Option value="en">English</Select.Option>
                  <Select.Option value="vi">Tiếng Việt</Select.Option>
                  <Select.Option value="ja">日本語</Select.Option>
                  <Select.Option value="zh">中文</Select.Option>
                </Select>
              </div>
              <Divider className="my-3" />
              <div>
                <div className="mb-2 font-semibold text-gray-800">Timezone</div>
                <Select defaultValue="utc-8" className="w-full">
                  <Select.Option value="utc-8">Pacific Time (UTC-8)</Select.Option>
                  <Select.Option value="utc-5">Eastern Time (UTC-5)</Select.Option>
                  <Select.Option value="utc+0">GMT (UTC+0)</Select.Option>
                  <Select.Option value="utc+7">Bangkok (UTC+7)</Select.Option>
                  <Select.Option value="utc+9">Tokyo (UTC+9)</Select.Option>
                </Select>
              </div>
            </div>
          </Card>
        </Col>

        {/* Privacy */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <SafetyOutlined className="text-orange-600" />
                <span>Privacy</span>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Profile Visibility</div>
                  <div className="text-sm text-gray-600">Control who can see your profile</div>
                </div>
                <Select defaultValue="public" style={{ width: 120 }}>
                  <Select.Option value="public">Public</Select.Option>
                  <Select.Option value="private">Private</Select.Option>
                  <Select.Option value="friends">Friends</Select.Option>
                </Select>
              </div>
              <Divider className="my-3" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Show Activity Status</div>
                  <div className="text-sm text-gray-600">
                    Let others see when you&apos;re online
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Divider className="my-3" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Data Collection</div>
                  <div className="text-sm text-gray-600">Allow analytics and tracking</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Divider className="my-3" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Download Data</div>
                  <div className="text-sm text-gray-600">Export all your account data</div>
                </div>
                <Button>Download</Button>
              </div>
            </div>
          </Card>
        </Col>

        {/* Advanced */}
        <Col xs={24}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <ThunderboltOutlined className="text-red-600" />
                <span>Advanced Settings</span>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Developer Mode</div>
                  <div className="text-sm text-gray-600">
                    Enable advanced features for developers
                  </div>
                </div>
                <Switch />
              </div>
              <Divider className="my-3" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">API Access</div>
                  <div className="text-sm text-gray-600">Manage API keys and tokens</div>
                </div>
                <Button>Manage</Button>
              </div>
              <Divider className="my-3" />
              <div className="flex items-center justify-between rounded-lg border-2 border-red-200 bg-red-50 p-4">
                <div>
                  <div className="font-semibold text-red-800">Delete Account</div>
                  <div className="text-sm text-red-600">
                    Permanently delete your account and all data
                  </div>
                </div>
                <Button danger>Delete</Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
