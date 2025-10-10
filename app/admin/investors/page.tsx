"use client"

import { useState, useEffect } from 'react'
import { Users, CheckCircle2, XCircle, Clock, Eye, LogOut, Loader2, Mail, Phone, Building2, Briefcase, Calendar, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { auth } from '../../../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { isAdmin, getAllInvestors, approveInvestor, rejectInvestor } from '../../../lib/firebase-helpers'
import { InvestorData, InvestorStatus } from '../../../lib/firebase-types'
import { Timestamp } from 'firebase/firestore'

type FilterType = 'all' | InvestorStatus

export default function AdminInvestorsPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [investors, setInvestors] = useState<InvestorData[]>([])
  const [filteredInvestors, setFilteredInvestors] = useState<InvestorData[]>([])
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [selectedInvestor, setSelectedInvestor] = useState<InvestorData | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    setMounted(true)

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/admin/login')
        return
      }

      try {
        const adminStatus = await isAdmin(user.uid)
        
        if (!adminStatus) {
          router.push('/')
          return
        }

        // Carregar investidores
        const investorsList = await getAllInvestors()
        setInvestors(investorsList)
        setFilteredInvestors(investorsList)
        setLoading(false)
      } catch (err) {
        console.error('Error checking admin:', err)
        router.push('/admin/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredInvestors(investors)
    } else {
      setFilteredInvestors(investors.filter(inv => inv.status === activeFilter))
    }
  }, [activeFilter, investors])

  const handleApprove = async (investorUid: string) => {
    const user = auth.currentUser
    if (!user) return

    setActionLoading(true)
    try {
      await approveInvestor(investorUid, user.uid)
      
      // Atualizar lista
      const updatedInvestors = investors.map(inv => 
        inv.uid === investorUid 
          ? { ...inv, status: 'approved' as InvestorStatus, approvedAt: Timestamp.now(), approvedBy: user.uid }
          : inv
      )
      setInvestors(updatedInvestors)
      setSelectedInvestor(null)
    } catch (err) {
      console.error('Error approving investor:', err)
    }
    setActionLoading(false)
  }

  const handleReject = async (investorUid: string) => {
    const user = auth.currentUser
    if (!user) return

    setActionLoading(true)
    try {
      await rejectInvestor(investorUid, user.uid)
      
      // Atualizar lista
      const updatedInvestors = investors.map(inv => 
        inv.uid === investorUid 
          ? { ...inv, status: 'rejected' as InvestorStatus, rejectedAt: Timestamp.now(), rejectedBy: user.uid }
          : inv
      )
      setInvestors(updatedInvestors)
      setSelectedInvestor(null)
    } catch (err) {
      console.error('Error rejecting investor:', err)
    }
    setActionLoading(false)
  }

  const getStatusBadge = (status: InvestorStatus) => {
    const configs = {
      pending_nda: { color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', icon: Clock, label: 'Pending NDA' },
      pending_approval: { color: 'bg-orange-500/10 text-orange-600 border-orange-500/20', icon: Clock, label: 'Pending Approval' },
      approved: { color: 'bg-green-500/10 text-green-600 border-green-500/20', icon: CheckCircle2, label: 'Approved' },
      rejected: { color: 'bg-red-500/10 text-red-600 border-red-500/20', icon: XCircle, label: 'Rejected' }
    }

    const config = configs[status]
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${config.color}`}>
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </span>
    )
  }

  const formatDate = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return '-'
    return timestamp.toDate().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const stats = {
    total: investors.length,
    pending_nda: investors.filter(i => i.status === 'pending_nda').length,
    pending_approval: investors.filter(i => i.status === 'pending_approval').length,
    approved: investors.filter(i => i.status === 'approved').length,
    rejected: investors.filter(i => i.status === 'rejected').length
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#5FA037]/10 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#5FA037]" />
              </div>
              <div>
                <h1 className="text-xl font-light text-white">Admin Dashboard</h1>
                <p className="text-xs text-white/40">Investor Management</p>
              </div>
            </div>

            <button
              onClick={() => auth.signOut().then(() => router.push('/admin/login'))}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white/60 hover:text-white transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6"
          >
            <Users className="w-8 h-8 text-white/40 mb-3" />
            <div className="text-3xl font-light text-white mb-1">{stats.total}</div>
            <div className="text-xs text-white/40">Total Investors</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6"
          >
            <Clock className="w-8 h-8 text-yellow-500/60 mb-3" />
            <div className="text-3xl font-light text-white mb-1">{stats.pending_nda}</div>
            <div className="text-xs text-white/40">Pending NDA</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6"
          >
            <Clock className="w-8 h-8 text-orange-500/60 mb-3" />
            <div className="text-3xl font-light text-white mb-1">{stats.pending_approval}</div>
            <div className="text-xs text-white/40">Pending Approval</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6"
          >
            <CheckCircle2 className="w-8 h-8 text-green-500/60 mb-3" />
            <div className="text-3xl font-light text-white mb-1">{stats.approved}</div>
            <div className="text-xs text-white/40">Approved</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6"
          >
            <XCircle className="w-8 h-8 text-red-500/60 mb-3" />
            <div className="text-3xl font-light text-white mb-1">{stats.rejected}</div>
            <div className="text-xs text-white/40">Rejected</div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['all', 'pending_nda', 'pending_approval', 'approved', 'rejected'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-[#5FA037] text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {filter === 'all' ? 'All' : filter.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* Investors Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">Investor</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">Company</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">Contact</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">Date</th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredInvestors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-white/40">
                      No investors found
                    </td>
                  </tr>
                ) : (
                  filteredInvestors.map((investor) => (
                    <tr key={investor.uid} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-white">{investor.name}</div>
                          <div className="text-xs text-white/40">{investor.role}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white/80">{investor.company}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-xs text-white/60 flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            {investor.email}
                          </div>
                          <div className="text-xs text-white/60 flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            {investor.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(investor.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-white/60">{formatDate(investor.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedInvestor(investor)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-all group"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-white/40 group-hover:text-white" />
                          </button>
                          {investor.status === 'pending_approval' && (
                            <>
                              <button
                                onClick={() => handleApprove(investor.uid)}
                                disabled={actionLoading}
                                className="p-2 hover:bg-green-500/10 rounded-lg transition-all group disabled:opacity-50"
                                title="Approve"
                              >
                                <CheckCircle2 className="w-4 h-4 text-green-500/60 group-hover:text-green-500" />
                              </button>
                              <button
                                onClick={() => handleReject(investor.uid)}
                                disabled={actionLoading}
                                className="p-2 hover:bg-red-500/10 rounded-lg transition-all group disabled:opacity-50"
                                title="Reject"
                              >
                                <XCircle className="w-4 h-4 text-red-500/60 group-hover:text-red-500" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedInvestor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedInvestor(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-light text-white mb-2">{selectedInvestor.name}</h2>
                    {getStatusBadge(selectedInvestor.status)}
                  </div>
                  <button
                    onClick={() => setSelectedInvestor(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                  >
                    <XCircle className="w-5 h-5 text-white/40" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                        <Building2 className="w-4 h-4" />
                        Company
                      </div>
                      <div className="text-sm text-white">{selectedInvestor.company}</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                        <Briefcase className="w-4 h-4" />
                        Role
                      </div>
                      <div className="text-sm text-white">{selectedInvestor.role}</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </div>
                      <div className="text-sm text-white">{selectedInvestor.email}</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                        <Phone className="w-4 h-4" />
                        Phone
                      </div>
                      <div className="text-sm text-white">{selectedInvestor.phone}</div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                          <Calendar className="w-4 h-4" />
                          Registration Date
                        </div>
                        <div className="text-sm text-white">{formatDate(selectedInvestor.createdAt)}</div>
                      </div>

                      {selectedInvestor.ndaSignedAt && (
                        <div>
                          <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                            <CheckCircle2 className="w-4 h-4" />
                            NDA Signed
                          </div>
                          <div className="text-sm text-white">{formatDate(selectedInvestor.ndaSignedAt)}</div>
                          {selectedInvestor.ndaSignedIp && (
                            <div className="text-xs text-white/40 mt-1">IP: {selectedInvestor.ndaSignedIp}</div>
                          )}
                        </div>
                      )}

                      {selectedInvestor.approvedAt && (
                        <div>
                          <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Approved
                          </div>
                          <div className="text-sm text-white">{formatDate(selectedInvestor.approvedAt)}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedInvestor.status === 'pending_approval' && (
                    <div className="border-t border-white/10 pt-6 flex gap-3">
                      <button
                        onClick={() => handleApprove(selectedInvestor.uid)}
                        disabled={actionLoading}
                        className="flex-1 h-12 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {actionLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Approve Access</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleReject(selectedInvestor.uid)}
                        disabled={actionLoading}
                        className="flex-1 h-12 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {actionLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <XCircle className="w-5 h-5" />
                            <span>Reject</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

