"use client"

import { useEffect, useState } from 'react'
import { ChartLine, Buildings, Article, Users, Eye, TrendUp } from '@phosphor-icons/react'
import { getAnalytics, getLeads } from '../../lib/admin-helpers'
import { Lead } from '../../lib/admin-types'

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [recentLeads, setRecentLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [analyticsData, leads] = await Promise.all([
        getAnalytics('month'),
        getLeads(),
      ])
      setAnalytics(analyticsData)
      setRecentLeads(leads.slice(0, 5))
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const kpiCards = [
    {
      icon: Eye,
      label: 'Total Visits',
      value: analytics?.totalVisits || 0,
      change: '+12%',
      trend: 'up',
    },
    {
      icon: Users,
      label: 'Leads',
      value: analytics?.leads || 0,
      change: `+${analytics?.newLeads || 0} new`,
      trend: 'up',
    },
    {
      icon: Buildings,
      label: 'Properties',
      value: analytics?.totalProperties || 0,
      change: 'Active',
      trend: 'neutral',
    },
    {
      icon: Article,
      label: 'Blog Posts',
      value: analytics?.totalBlogPosts || 0,
      change: 'Published',
      trend: 'neutral',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-black mb-2">Dashboard</h1>
        <p className="text-black/60">Overview of your website performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.label}
              className="bg-white rounded-xl border border-black/10 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-black/5 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-black" weight="duotone" />
                </div>
                {kpi.trend === 'up' && (
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    {kpi.change}
                  </span>
                )}
                {kpi.trend === 'neutral' && (
                  <span className="text-xs font-medium text-black/40">{kpi.change}</span>
                )}
              </div>
              <p className="text-2xl font-semibold text-black mb-1">{kpi.value}</p>
              <p className="text-sm text-black/60">{kpi.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
        <div className="p-6 border-b border-black/10">
          <h2 className="text-xl font-semibold text-black">Recent Leads</h2>
        </div>
        <div className="divide-y divide-black/5">
          {recentLeads.length === 0 ? (
            <div className="p-6 text-center text-black/60">
              No leads yet. Leads will appear here when visitors contact you.
            </div>
          ) : (
            recentLeads.map((lead) => (
              <div key={lead.id} className="p-6 hover:bg-black/5 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-medium text-black">{lead.name}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          lead.status === 'new'
                            ? 'bg-blue-50 text-blue-600'
                            : lead.status === 'contacted'
                            ? 'bg-yellow-50 text-yellow-600'
                            : lead.status === 'qualified'
                            ? 'bg-green-50 text-green-600'
                            : 'bg-gray-50 text-gray-600'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-sm text-black/60 mb-1">{lead.email}</p>
                    {lead.phone && (
                      <p className="text-sm text-black/60 mb-2">{lead.phone}</p>
                    )}
                    {lead.message && (
                      <p className="text-sm text-black/40 line-clamp-2">{lead.message}</p>
                    )}
                    <p className="text-xs text-black/40 mt-2">
                      {lead.createdAt?.toLocaleDateString()} • {lead.source}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

