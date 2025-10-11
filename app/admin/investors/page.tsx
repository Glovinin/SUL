"use client"

import { useState, useEffect } from 'react'
import { Users, CheckCircle2, XCircle, Clock, Eye, LogOut, Loader2, Mail, Phone, Building2, Briefcase, Calendar, Shield, FileText, Download } from 'lucide-react'
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
      <span className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium border ${config.color}`}>
        <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        <span className="hidden sm:inline">{config.label}</span>
        <span className="sm:hidden">{config.label.split(' ')[1]}</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5FA037]/10 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#5FA037]" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-light text-white">Admin Dashboard</h1>
                <p className="text-[10px] sm:text-xs text-white/40 hidden sm:block">Investor Management</p>
              </div>
            </div>

            <button
              onClick={() => auth.signOut().then(() => router.push('/admin/login'))}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs sm:text-sm text-white/60 hover:text-white transition-all"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1a1a1a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6"
          >
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white/40 mb-2 sm:mb-3" />
            <div className="text-2xl sm:text-3xl font-light text-white mb-1">{stats.total}</div>
            <div className="text-[10px] sm:text-xs text-white/40">Total</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#1a1a1a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6"
          >
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500/60 mb-2 sm:mb-3" />
            <div className="text-2xl sm:text-3xl font-light text-white mb-1">{stats.pending_nda}</div>
            <div className="text-[10px] sm:text-xs text-white/40">NDA</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1a1a1a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6"
          >
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500/60 mb-2 sm:mb-3" />
            <div className="text-2xl sm:text-3xl font-light text-white mb-1">{stats.pending_approval}</div>
            <div className="text-[10px] sm:text-xs text-white/40">Pending</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-[#1a1a1a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6"
          >
            <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-500/60 mb-2 sm:mb-3" />
            <div className="text-2xl sm:text-3xl font-light text-white mb-1">{stats.approved}</div>
            <div className="text-[10px] sm:text-xs text-white/40">Approved</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a1a1a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 col-span-2 sm:col-span-1"
          >
            <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500/60 mb-2 sm:mb-3" />
            <div className="text-2xl sm:text-3xl font-light text-white mb-1">{stats.rejected}</div>
            <div className="text-[10px] sm:text-xs text-white/40">Rejected</div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {(['all', 'pending_nda', 'pending_approval', 'approved', 'rejected'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-[#5FA037] text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {filter === 'all' ? 'All' : filter.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* Mobile Cards / Desktop Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Desktop Table */}
          <div className="hidden lg:block bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden">
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
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3 sm:space-y-4">
            {filteredInvestors.length === 0 ? (
              <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-8 text-center text-white/40">
                No investors found
              </div>
            ) : (
              filteredInvestors.map((investor) => (
                <motion.div
                  key={investor.uid}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 sm:p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-sm sm:text-base font-medium text-white mb-1">{investor.name}</h3>
                      <p className="text-xs sm:text-sm text-white/40 mb-2">{investor.role}</p>
                      {getStatusBadge(investor.status)}
                    </div>
                    <button
                      onClick={() => setSelectedInvestor(investor)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-all flex-shrink-0"
                    >
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white/40" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{investor.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{investor.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{investor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{formatDate(investor.createdAt)}</span>
                    </div>
                  </div>

                  {investor.status === 'pending_approval' && (
                    <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                      <button
                        onClick={() => handleApprove(investor.uid)}
                        disabled={actionLoading}
                        className="flex-1 h-10 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-xs sm:text-sm font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(investor.uid)}
                        disabled={actionLoading}
                        className="flex-1 h-10 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs sm:text-sm font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Detail Sheet - Side on Desktop, Bottom on Mobile */}
      <AnimatePresence>
        {selectedInvestor && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setSelectedInvestor(null)}
            />
            
            {/* Sheet Content */}
            <motion.div
              initial={{ x: '100%', y: 0 }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: '100%', y: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[600px] bg-[#1a1a1a] border-l border-white/10 overflow-y-auto shadow-2xl hidden sm:flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10 p-6 z-10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-light text-white mb-3">{selectedInvestor.name}</h2>
                    {getStatusBadge(selectedInvestor.status)}
                  </div>
                  <button
                    onClick={() => setSelectedInvestor(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all flex-shrink-0"
                  >
                    <XCircle className="w-5 h-5 text-white/40" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 space-y-8">
                {/* Basic Info Section */}
                <div>
                  <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </div>
                      <div className="text-sm text-white break-all">{selectedInvestor.email}</div>
                    </div>

                    {selectedInvestor.phone && (
                      <div>
                        <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                          <Phone className="w-4 h-4" />
                          Phone
                        </div>
                        <div className="text-sm text-white">{selectedInvestor.phone}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* NDA Signatory Data Section */}
                {selectedInvestor.ndaSignatoryData && (
                  <div>
                    <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">NDA Signatory Details</h3>
                    <div className="space-y-4">
                      {/* Company & Role */}
                      {(selectedInvestor.company || selectedInvestor.role) && (
                        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
                          {selectedInvestor.company && (
                            <div>
                              <div className="flex items-center gap-2 text-xs text-white/40 mb-1">
                                <Building2 className="w-3.5 h-3.5" />
                                Company
                              </div>
                              <div className="text-sm text-white font-medium">{selectedInvestor.company}</div>
                            </div>
                          )}
                          {selectedInvestor.role && (
                            <div>
                              <div className="flex items-center gap-2 text-xs text-white/40 mb-1">
                                <Briefcase className="w-3.5 h-3.5" />
                                Role
                              </div>
                              <div className="text-sm text-white font-medium">{selectedInvestor.role}</div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-white/40 mb-1">Nationality</div>
                          <div className="text-sm text-white">{selectedInvestor.ndaSignatoryData.nationality || '-'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/40 mb-1">Marital Status</div>
                          <div className="text-sm text-white">{selectedInvestor.ndaSignatoryData.maritalStatus || '-'}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-white/40 mb-1">Address</div>
                        <div className="text-sm text-white">{selectedInvestor.ndaSignatoryData.address || '-'}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-white/40 mb-1">Document Type</div>
                          <div className="text-sm text-white">{selectedInvestor.ndaSignatoryData.documentType || '-'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/40 mb-1">Document Number</div>
                          <div className="text-sm text-white font-mono">{selectedInvestor.ndaSignatoryData.documentNumber || '-'}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-white/40 mb-1">Tax ID</div>
                        <div className="text-sm text-white font-mono">{selectedInvestor.ndaSignatoryData.taxId || '-'}</div>
                      </div>

                      {selectedInvestor.ndaSignatoryData.signatureImage && (
                        <div>
                          <div className="text-xs text-white/40 mb-2">Digital Signature</div>
                          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <img 
                              src={selectedInvestor.ndaSignatoryData.signatureImage} 
                              alt="Signature" 
                              className="max-h-24 mx-auto"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Timeline Section */}
                <div>
                  <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-white/40" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-white/40 mb-1">Registration</div>
                        <div className="text-sm text-white">{formatDate(selectedInvestor.createdAt)}</div>
                      </div>
                    </div>

                    {selectedInvestor.ndaSignedAt && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#5FA037]/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-[#5FA037]" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-white/40 mb-1">NDA Signed</div>
                          <div className="text-sm text-white mb-1">{formatDate(selectedInvestor.ndaSignedAt)}</div>
                          {selectedInvestor.ndaSignedIp && (
                            <div className="text-xs text-white/30">IP: {selectedInvestor.ndaSignedIp}</div>
                          )}
                          {selectedInvestor.ndaPdfUrl && (
                            <a
                              href={selectedInvestor.ndaPdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-[#5FA037]/10 hover:bg-[#5FA037]/20 border border-[#5FA037]/20 rounded-lg text-xs text-[#5FA037] font-medium transition-all"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download PDF</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedInvestor.approvedAt && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-white/40 mb-1">Approved</div>
                          <div className="text-sm text-white">{formatDate(selectedInvestor.approvedAt)}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              {selectedInvestor.status === 'pending_approval' && (
                <div className="sticky bottom-0 bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-white/10 p-6">
                  <div className="flex gap-3">
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
                          <span>Approve</span>
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
                </div>
              )}
            </motion.div>

            {/* Mobile Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 right-0 bottom-0 z-50 bg-[#1a1a1a] rounded-t-3xl max-h-[90vh] overflow-y-auto shadow-2xl sm:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag Handle */}
              <div className="sticky top-0 bg-[#1a1a1a] pt-3 pb-2 flex justify-center">
                <div className="w-12 h-1 bg-white/20 rounded-full" />
              </div>

              {/* Header */}
              <div className="px-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-light text-white flex-1">{selectedInvestor.name}</h2>
                  <button
                    onClick={() => setSelectedInvestor(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all flex-shrink-0"
                  >
                    <XCircle className="w-5 h-5 text-white/40" />
                  </button>
                </div>
                {getStatusBadge(selectedInvestor.status)}
              </div>

              {/* Content - Same as desktop but more compact */}
              <div className="px-6 pb-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-white/40 mb-1">
                        <Mail className="w-3.5 h-3.5" />
                        Email
                      </div>
                      <div className="text-sm text-white break-all">{selectedInvestor.email}</div>
                    </div>
                    {selectedInvestor.phone && (
                      <div>
                        <div className="flex items-center gap-2 text-xs text-white/40 mb-1">
                          <Phone className="w-3.5 h-3.5" />
                          Phone
                        </div>
                        <div className="text-sm text-white">{selectedInvestor.phone}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* NDA Signatory Data */}
                {selectedInvestor.ndaSignatoryData && (
                  <div>
                    <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">NDA Details</h3>
                    <div className="space-y-3">
                      {/* Company & Role */}
                      {(selectedInvestor.company || selectedInvestor.role) && (
                        <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/5">
                          {selectedInvestor.company && (
                            <div>
                              <div className="flex items-center gap-1.5 text-xs text-white/40 mb-1">
                                <Building2 className="w-3 h-3" />
                                Company
                              </div>
                              <div className="text-sm text-white font-medium">{selectedInvestor.company}</div>
                            </div>
                          )}
                          {selectedInvestor.role && (
                            <div>
                              <div className="flex items-center gap-1.5 text-xs text-white/40 mb-1">
                                <Briefcase className="w-3 h-3" />
                                Role
                              </div>
                              <div className="text-sm text-white font-medium">{selectedInvestor.role}</div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-white/40 mb-1">Nationality</div>
                          <div className="text-sm text-white">{selectedInvestor.ndaSignatoryData.nationality || '-'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/40 mb-1">Marital Status</div>
                          <div className="text-sm text-white">{selectedInvestor.ndaSignatoryData.maritalStatus || '-'}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 mb-1">Address</div>
                        <div className="text-sm text-white">{selectedInvestor.ndaSignatoryData.address || '-'}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-white/40 mb-1">Document</div>
                          <div className="text-xs text-white">{selectedInvestor.ndaSignatoryData.documentType || '-'}</div>
                          <div className="text-xs text-white/60 font-mono mt-0.5">{selectedInvestor.ndaSignatoryData.documentNumber || '-'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/40 mb-1">Tax ID</div>
                          <div className="text-xs text-white font-mono">{selectedInvestor.ndaSignatoryData.taxId || '-'}</div>
                        </div>
                      </div>
                      {selectedInvestor.ndaSignatoryData.signatureImage && (
                        <div>
                          <div className="text-xs text-white/40 mb-2">Signature</div>
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <img 
                              src={selectedInvestor.ndaSignatoryData.signatureImage} 
                              alt="Signature" 
                              className="max-h-16 mx-auto"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div>
                  <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-white/40" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-white/40">Registration</div>
                        <div className="text-sm text-white">{formatDate(selectedInvestor.createdAt)}</div>
                      </div>
                    </div>
                    {selectedInvestor.ndaSignedAt && (
                      <div className="flex gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#5FA037]/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-3.5 h-3.5 text-[#5FA037]" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-white/40">NDA Signed</div>
                          <div className="text-sm text-white">{formatDate(selectedInvestor.ndaSignedAt)}</div>
                          {selectedInvestor.ndaSignedIp && (
                            <div className="text-xs text-white/30 mt-0.5">IP: {selectedInvestor.ndaSignedIp}</div>
                          )}
                          {selectedInvestor.ndaPdfUrl && (
                            <a
                              href={selectedInvestor.ndaPdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-[#5FA037]/10 border border-[#5FA037]/20 rounded-lg text-xs text-[#5FA037] font-medium"
                            >
                              <Download className="w-3 h-3" />
                              PDF
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                    {selectedInvestor.approvedAt && (
                      <div className="flex gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-white/40">Approved</div>
                          <div className="text-sm text-white">{formatDate(selectedInvestor.approvedAt)}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions for mobile */}
                {selectedInvestor.status === 'pending_approval' && (
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => handleApprove(selectedInvestor.uid)}
                      disabled={actionLoading}
                      className="flex-1 h-11 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-sm font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {actionLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleReject(selectedInvestor.uid)}
                      disabled={actionLoading}
                      className="flex-1 h-11 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {actionLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
