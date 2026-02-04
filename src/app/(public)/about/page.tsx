'use client'

import { Card, Row, Col, Timeline, Avatar } from 'antd'
import {
  RocketOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  TrophyOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import Link from 'next/link'

export default function AboutPage() {
  const features = [
    {
      icon: <RocketOutlined className="text-3xl" />,
      title: 'Fast & Efficient',
      description: 'Lightning-fast performance with optimized workflows',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <SafetyOutlined className="text-3xl" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <ThunderboltOutlined className="text-3xl" />,
      title: 'Powerful Analytics',
      description: 'Real-time insights with advanced data visualization',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <TeamOutlined className="text-3xl" />,
      title: 'Team Collaboration',
      description: 'Seamless collaboration tools for teams of all sizes',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with a vision to transform business analytics',
    },
    {
      year: '2021',
      title: 'First 1K Users',
      description: 'Reached our first thousand satisfied customers',
    },
    { year: '2022', title: 'Series A Funding', description: 'Raised $10M to accelerate growth' },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded operations to 15+ countries',
    },
    {
      year: '2024',
      title: '10K+ Customers',
      description: 'Serving businesses worldwide with pride',
    },
    {
      year: '2026',
      title: 'Market Leader',
      description: 'Recognized as industry leader in analytics',
    },
  ]

  const team = [
    { name: 'John Smith', role: 'CEO & Founder', avatar: '👨‍💼' },
    { name: 'Sarah Johnson', role: 'CTO', avatar: '👩‍💻' },
    { name: 'Michael Chen', role: 'Head of Design', avatar: '👨‍🎨' },
    { name: 'Emily Davis', role: 'Head of Sales', avatar: '👩‍💼' },
  ]

  const stats = [
    { icon: <GlobalOutlined />, value: '15+', label: 'Countries', color: 'text-blue-600' },
    { icon: <TeamOutlined />, value: '10K+', label: 'Happy Customers', color: 'text-green-600' },
    { icon: <TrophyOutlined />, value: '50+', label: 'Awards Won', color: 'text-purple-600' },
    { icon: <CheckCircleOutlined />, value: '99.9%', label: 'Uptime', color: 'text-orange-600' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="mb-4 text-5xl font-bold">About Our Company</h1>
          <p className="mb-8 text-xl text-indigo-100">
            Empowering businesses with cutting-edge analytics and insights
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Mission Statement */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            We believe in democratizing data analytics for businesses of all sizes. Our mission is
            to provide powerful, intuitive tools that transform raw data into actionable insights,
            enabling companies to make better decisions and drive growth.
          </p>
        </div>

        {/* Features Grid */}
        <Row gutter={[24, 24]} className="mb-16">
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="h-full text-center transition-all hover:shadow-xl">
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${feature.color} text-white`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Stats */}
        <Row gutter={[16, 16]} className="mb-16">
          {stats.map((stat, index) => (
            <Col xs={12} sm={6} key={index}>
              <Card className="text-center">
                <div className={`mb-2 text-4xl ${stat.color}`}>{stat.icon}</div>
                <div className="mb-1 text-3xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">Our Journey</h2>
          <Card>
            <Timeline
              mode="alternate"
              items={milestones.map((milestone) => ({
                color: 'blue',
                children: (
                  <div>
                    <div className="mb-1 text-lg font-bold text-blue-600">{milestone.year}</div>
                    <div className="mb-1 font-semibold text-gray-800">{milestone.title}</div>
                    <div className="text-gray-600">{milestone.description}</div>
                  </div>
                ),
              }))}
            />
          </Card>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">Meet Our Team</h2>
          <Row gutter={[24, 24]}>
            {team.map((member, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card className="text-center transition-all hover:shadow-xl">
                  <div className="mb-4 text-6xl">{member.avatar}</div>
                  <h3 className="mb-1 text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-blue-600">{member.role}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">Our Values</h2>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card className="h-full bg-gradient-to-br from-blue-50 to-blue-100">
                <h3 className="mb-3 text-xl font-bold text-blue-900">Innovation</h3>
                <p className="text-gray-700">
                  We constantly push boundaries to deliver cutting-edge solutions that stay ahead of
                  the curve.
                </p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full bg-gradient-to-br from-purple-50 to-purple-100">
                <h3 className="mb-3 text-xl font-bold text-purple-900">Integrity</h3>
                <p className="text-gray-700">
                  We operate with transparency and honesty, building trust with every interaction.
                </p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full bg-gradient-to-br from-green-50 to-green-100">
                <h3 className="mb-3 text-xl font-bold text-green-900">Excellence</h3>
                <p className="text-gray-700">
                  We strive for excellence in everything we do, from product quality to customer
                  service.
                </p>
              </Card>
            </Col>
          </Row>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-12 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Join Our Growing Community</h2>
          <p className="mb-8 text-lg text-indigo-100">
            Be part of something amazing. Start your journey with us today.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              Get Started
            </Link>
            <Link
              href="/home"
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold transition hover:bg-white/10"
            >
              View Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
