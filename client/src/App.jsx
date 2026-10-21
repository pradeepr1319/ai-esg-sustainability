import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, BrainCircuit, Check, ChevronDown,
  ChevronLeft, ChevronRight, CircleHelp, Download, Droplets, FileBarChart2,
  Filter, Globe2, Leaf, LayoutDashboard, Menu, MoreHorizontal, Plus, Search,
  Settings2, ShieldCheck, Sparkles, Sun, Users, Wind, X, Zap, Sprout, Target,
  AlertTriangle, Clock3, CheckCircle2, ArrowRight, SlidersHorizontal
} from 'lucide-react'
import {
  Area, AreaChart, CartesianGrid, Cell, Line, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis
} from 'recharts'
import { demoMetrics, emissions, energyMix, insights, targets } from './data/demo'

const nav = [
  { label: 'Overview', icon: LayoutDashboard, group: 'WORKSPACE' },
  { label: 'Environment', icon: Leaf },
  { label: 'Social impact', icon: Users },
  { label: 'Governance', icon: ShieldCheck },
  { label: 'AI insights', icon: BrainCircuit, badge: '3' },
  { label: 'Targets & goals', icon: Target, group: 'MANAGE' },
  { label: 'Data explorer', icon: Activity },
  { label: 'Reports', icon: FileBarChart2 },
]
const pageMeta = {
  'Overview': ['Good morning, Alex 👋', 'Here’s your sustainability pulse for October. Small steps, measurable impact.'],
  'Environment': ['Environmental impact', 'Track your footprint, resource use, and progress toward a lighter future.'],
  'Social impact': ['People & social impact', 'A clearer view of the people, communities, and culture behind your impact.'],
  'Governance': ['Governance & trust', 'Stay ahead of compliance, ethics, and responsible business practices.'],
  'AI insights': ['Intelligence, with purpose.', 'AI-assisted signals to help your team turn sustainability data into action.'],
  'Targets & goals': ['Ambition into action', 'Keep your sustainability commitments visible, measurable, and moving.'],
  'Data explorer': ['Your ESG data, in context', 'Explore, filter, and manage the metrics that power your sustainability story.'],
  'Reports': ['Stories backed by data', 'Create clear, stakeholder-ready snapshots of your ESG performance.'],
}
const pageVariants = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: .38, ease: [0.22, 1, 0.36, 1] } }, exit: { opacity: 0, y: -8, transition: { duration: .18 } } }

function Logo() {
  return <div className="flex items-center gap-3">
    <div className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#315b45] text-[#d6f17a] shadow-sm"><Sprout size={22} strokeWidth={2.2}/></div>
    <div><div className="font-['Manrope'] text-[20px] font-extrabold leading-5 tracking-[-.8px] text-[#263b2d]">verdant<span className="text-[#8fa58f]">.</span></div><div className="mt-1 text-[9px] font-bold tracking-[2.2px] text-[#8b998d]">ESG INTELLIGENCE</div></div>
  </div>
}

function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  return <>
    {mobileOpen && <div className="fixed inset-0 z-40 bg-[#1d2b22]/35 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}
    <aside className={`sidebar-scroll fixed inset-y-0 left-0 z-50 flex w-[258px] flex-col border-r border-[#e7ebe3] bg-[#fbfcf9] px-5 pb-5 pt-7 transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:z-auto lg:h-screen lg:shrink-0 lg:overflow-y-auto`}>
      <div className="flex items-center justify-between px-1"><Logo/><button className="rounded-lg p-2 text-[#7c8a7e] hover:bg-[#eef2eb] lg:hidden" onClick={() => setMobileOpen(false)}><X size={18}/></button></div>
      <div className="mt-9 rounded-2xl bg-[#eef3eb] p-3.5">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[1.3px] text-[#829082]"><span className="h-2 w-2 rounded-full bg-[#7da184]"/> WORKSPACE</div>
        <div className="mt-2 flex items-center justify-between"><span className="text-sm font-bold text-[#304b39]">Northstar Group</span><ChevronDown size={15} className="text-[#7c8a7e]"/></div>
        <div className="mt-1 text-xs text-[#8c998d]">Enterprise plan</div>
      </div>
      <div className="mt-8 space-y-1">
        {nav.map((item, i) => {
          const Icon = item.icon
          return <div key={item.label}>
            {item.group && i !== 0 && <div className="mb-2 mt-7 px-3 text-[9px] font-bold tracking-[1.8px] text-[#a0aaa0]">{item.group}</div>}
            <button onClick={() => { setActive(item.label); setMobileOpen(false) }} className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold transition-all duration-200 ${active === item.label ? 'bg-[#315b45] text-white shadow-[0_8px_18px_rgba(49,91,69,.17)]' : 'text-[#7a887c] hover:translate-x-1 hover:bg-[#eff3ed] hover:text-[#315b45]'}`}>
              {active === item.label && <motion.span layoutId="nav-pill" className="absolute -left-[1px] h-6 w-[3px] rounded-full bg-[#d6f17a]"/>}
              <Icon size={17} strokeWidth={active === item.label ? 2.2 : 1.8}/>
              <span className="flex-1">{item.label}</span>
              {item.badge && <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${active === item.label ? 'bg-white/15 text-[#e1f69c]' : 'bg-[#f0e5c8] text-[#9a7934]'}`}>{item.badge}</span>}
            </button>
          </div>
        })}
      </div>
      <div className="mt-auto pt-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#e8f0df] p-4">
          <div className="absolute -right-5 -top-7 h-24 w-24 rounded-full border-[16px] border-white/35"/><div className="absolute -right-2 -top-2 h-16 w-16 rounded-full border border-[#b9c9a7]/60"/>
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#53744d]"><Sparkles size={16}/></div>
          <p className="relative mt-3 text-sm font-bold text-[#3c5c3d]">Your impact matters.</p>
          <p className="relative mt-1 text-[11px] leading-5 text-[#7a8b73]">Every data point is a step toward better decisions.</p>
          <button onClick={() => setActive('AI insights')} className="relative mt-3 flex items-center gap-1 text-xs font-bold text-[#315b45]">Explore insights <ArrowRight size={13}/></button>
        </div>
        <button className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#7b897d] transition hover:bg-[#eff3ed]"><CircleHelp size={17}/> Help & support</button>
        <div className="mt-2 flex items-center gap-3 border-t border-[#e8ece5] px-2 pt-4">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#e1e9d8] text-xs font-extrabold text-[#49694e]">AC</div>
          <div className="min-w-0 flex-1"><div className="truncate text-xs font-bold text-[#36493a]">Alex Carter</div><div className="mt-0.5 text-[10px] text-[#9aa49a]">Sustainability lead</div></div>
          <MoreHorizontal size={18} className="text-[#a0aaa0]"/>
        </div>
      </div>
    </aside>
  </>
}

function Button({ children, variant = 'secondary', onClick, className = '', type = 'button' }) {
  const styles = variant === 'primary' ? 'bg-[#315b45] text-white hover:bg-[#244833] shadow-[0_6px_14px_rgba(49,91,69,.14)]' : variant === 'lime' ? 'bg-[#d6f17a] text-[#304b39] hover:bg-[#c9e96b]' : 'border border-[#e3e9e0] bg-white text-[#536257] hover:border-[#c8d4c5] hover:bg-[#f9fbf7]'
  return <button type={type} onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${styles} ${className}`}>{children}</button>
}

function MetricCard({ label, value, unit, delta, positive = true, icon: Icon, tint, sub, delay = 0 }) {
  return <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay, ease: 'easeOut' }} whileHover={{ y: -4, transition: { duration: .18 } }} className="group rounded-[20px] border border-[#e7ebe3] bg-white p-5 soft-shadow">
    <div className="flex items-start justify-between"><div className={`grid h-10 w-10 place-items-center rounded-[13px] ${tint}`}><Icon size={19}/></div><button className="rounded-lg p-1.5 text-[#b3bcb3] opacity-0 transition group-hover:opacity-100 hover:bg-[#f2f5ef]"><MoreHorizontal size={17}/></button></div>
    <div className="mt-5 text-[12px] font-medium text-[#879387]">{label}</div>
    <div className="mt-1 flex items-baseline gap-1.5"><motion.span key={value} initial={{ opacity: .2, y: 5 }} animate={{ opacity: 1, y: 0 }} className="font-['Manrope'] text-[29px] font-extrabold tracking-[-1.3px] text-[#263a2c]">{value}</motion.span><span className="text-xs font-medium text-[#9ca79c]">{unit}</span></div>
    <div className="mt-3 flex flex-wrap items-center gap-2"><span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold ${positive ? 'bg-[#eaf4e7] text-[#4f8057]' : 'bg-[#fff0dc] text-[#b47e32]'}`}>{positive ? <ArrowDownRight size={12}/> : <ArrowUpRight size={12}/>} {delta}</span><span className="text-[10px] text-[#a2aca2]">{sub || 'vs. last period'}</span></div>
  </motion.div>
}

function SectionTitle({ eyebrow, title, subtitle, action }) {
  return <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div>{eyebrow && <div className="mb-1.5 text-[9px] font-extrabold tracking-[2px] text-[#91a18f]">{eyebrow}</div>}<h2 className="font-['Manrope'] text-[17px] font-extrabold tracking-[-.45px] text-[#2d4132]">{title}</h2>{subtitle && <p className="mt-1 text-xs text-[#929d92]">{subtitle}</p>}</div>{action}</div>
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return <div className="rounded-xl border border-[#e8ece5] bg-white px-3 py-2.5 shadow-xl"><div className="mb-1 text-[10px] font-bold text-[#8d998d]">{label}</div>{payload.map((p) => <div key={p.dataKey} className="text-xs font-bold text-[#365740]">{p.name}: {p.value} tCO₂e</div>)}</div>
}

function Overview({ setActive, metrics }) {
  return <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-7">
    <div className="relative overflow-hidden rounded-[26px] bg-[#315b45] px-6 py-7 text-white sm:px-8 sm:py-8">
      <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full border border-white/10"/><div className="absolute -right-1 -top-16 h-56 w-56 rounded-full border border-white/10"/><div className="absolute right-24 top-12 h-20 w-20 rounded-full bg-[#d6f17a]/10 blur-xl"/>
      <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-end"><div className="max-w-xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-[#e2efcf]"><span className="h-1.5 w-1.5 rounded-full bg-[#d6f17a]"/> OCTOBER 2026 · ESG PULSE</div><h2 className="font-['Manrope'] text-2xl font-extrabold leading-tight tracking-[-1px] sm:text-[31px]">Good morning, Alex <span className="text-[#d6f17a]">✳</span><br/>Progress looks good on you.</h2><p className="mt-3 max-w-lg text-xs leading-6 text-white/65 sm:text-sm">Your sustainability journey is moving forward. Here’s the latest snapshot of your organization’s impact — and where a little focus can go a long way.</p></div><div className="flex items-center gap-3"><div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3"><div className="text-[10px] text-white/60">Overall ESG score</div><div className="mt-1 flex items-baseline gap-1"><span className="font-['Manrope'] text-3xl font-extrabold">78</span><span className="text-xs text-[#d6f17a]">/100</span></div><div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-white/15"><motion.div initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ duration: 1, delay: .3 }} className="h-full rounded-full bg-[#d6f17a]"/></div></div><div className="hidden h-[74px] w-[74px] items-center justify-center rounded-2xl bg-[#d6f17a] text-[#315b45] sm:flex"><Sprout size={35}/></div></div></div>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Carbon emissions" value="550" unit="tCO₂e" delta="8.4%" positive icon={Wind} tint="bg-[#eaf1e5] text-[#527956]" sub="vs. last month" delay={.04}/>
      <MetricCard label="Renewable energy" value="42" unit="%" delta="6.2%" positive icon={Zap} tint="bg-[#fff3d9] text-[#a9833d]" sub="of total electricity" delay={.1}/>
      <MetricCard label="Water withdrawal" value="12.5" unit="k m³" delta="2.1%" positive={false} icon={Droplets} tint="bg-[#e5f1f2] text-[#5b8f91]" sub="vs. last month" delay={.16}/>
      <MetricCard label="Waste recycled" value="76" unit="%" delta="4.8%" positive icon={Sprout} tint="bg-[#f0e9f7] text-[#8c73a4]" sub="of total waste" delay={.22}/>
    </div>
    <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <div className="rounded-[22px] border border-[#e7ebe3] bg-white p-5 sm:p-6 soft-shadow">
        <SectionTitle eyebrow="ENVIRONMENTAL PERFORMANCE" title="Emissions are moving down" subtitle="Monthly Scope 1 & 2 emissions · tCO₂e" action={<button className="flex items-center gap-1 rounded-lg bg-[#f5f7f2] px-3 py-2 text-[10px] font-bold text-[#657568]">Last 6 months <ChevronDown size={13}/></button>}/>
        <div className="mb-4 flex flex-wrap gap-4"><span className="flex items-center gap-2 text-[10px] text-[#89958a]"><i className="h-2 w-2 rounded-full bg-[#315b45]"/> Scope 1</span><span className="flex items-center gap-2 text-[10px] text-[#89958a]"><i className="h-2 w-2 rounded-full bg-[#b8d6a6]"/> Scope 2</span><span className="flex items-center gap-2 text-[10px] text-[#89958a]"><i className="h-2 w-2 rounded-full bg-[#d7b56d]"/> Target path</span></div>
        <div className="h-[245px] w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={emissions} margin={{ top: 8, right: 4, left: -22, bottom: 0 }}><defs><linearGradient id="scope1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#315b45" stopOpacity={.16}/><stop offset="100%" stopColor="#315b45" stopOpacity={0}/></linearGradient><linearGradient id="scope2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b8d6a6" stopOpacity={.3}/><stop offset="100%" stopColor="#b8d6a6" stopOpacity={0}/></linearGradient></defs><CartesianGrid vertical={false} strokeDasharray="3 5"/><XAxis dataKey="month" axisLine={false} tickLine={false} dy={9}/><YAxis axisLine={false} tickLine={false}/><Tooltip content={<ChartTooltip/>}/><Area type="monotone" dataKey="scope2" name="Scope 2" stackId="1" stroke="#b8d6a6" fill="url(#scope2)" strokeWidth={2}/><Area type="monotone" dataKey="scope1" name="Scope 1" stackId="1" stroke="#315b45" fill="url(#scope1)" strokeWidth={2.5}/><Line type="monotone" dataKey="target" name="Target path" stroke="#d7b56d" strokeWidth={1.5} strokeDasharray="5 5" dot={false}/></AreaChart></ResponsiveContainer></div>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#f4f7f1] px-3 py-2.5"><div className="grid h-7 w-7 place-items-center rounded-lg bg-[#e2eddc] text-[#5c805f]"><TrendingIcon/></div><p className="text-[10px] leading-5 text-[#778678]"><b className="text-[#456b4b]">Nice momentum.</b> Combined emissions have declined over the last six months. Check intensity against output to confirm like-for-like progress.</p></div>
      </div>
      <div className="rounded-[22px] border border-[#e7ebe3] bg-white p-5 sm:p-6 soft-shadow">
        <SectionTitle eyebrow="ENERGY MIX" title="A greener energy mix" subtitle="Share of total energy consumption"/>
        <div className="relative h-[210px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={energyMix} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={62} outerRadius={88} paddingAngle={4} stroke="none" cornerRadius={5}>{energyMix.map((e) => <Cell key={e.name} fill={e.color}/>)}</Pie><Tooltip formatter={(v) => `${v}%`}/></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="font-['Manrope'] text-3xl font-extrabold text-[#2b4432]">42%</span><span className="mt-1 text-[10px] text-[#9aa59a]">renewable</span></div></div>
        <div className="mt-2 space-y-3">{energyMix.map((e) => <div key={e.name} className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full" style={{ background: e.color }}/><span className="flex-1 text-xs text-[#7e8a7e]">{e.name} energy</span><span className="text-xs font-bold text-[#3d5041]">{e.value}%</span><div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#eff2ed]"><motion.div initial={{ width: 0 }} animate={{ width: `${e.value}%` }} transition={{ duration: .7 }} className="h-full rounded-full" style={{ background: e.color }}/></div></div>)}</div>
      </div>
    </div>
    <div className="grid gap-5 xl:grid-cols-[1.2fr_1fr]">
      <div className="rounded-[22px] border border-[#e7ebe3] bg-white p-5 sm:p-6 soft-shadow">
        <SectionTitle eyebrow="YOUR ROADMAP" title="Goals in motion" subtitle="A little progress, consistently made." action={<button onClick={() => setActive('Targets & goals')} className="flex items-center gap-1 text-[11px] font-bold text-[#527557] hover:gap-2">View all goals <ArrowRight size={14}/></button>}/>
        <div className="space-y-5">{targets.slice(0,3).map((t,i) => <div key={t.name} className="group"><div className="mb-2 flex items-center justify-between gap-3"><div className="flex items-center gap-2.5"><span className={`grid h-8 w-8 place-items-center rounded-xl ${i===1?'bg-[#fff3d9] text-[#ac8744]':'bg-[#edf4e9] text-[#628568]'}`}>{i===1?<Sun size={16}/>:<Leaf size={16}/>}</span><div><div className="text-xs font-bold text-[#46584a]">{t.name}</div><div className="mt-1 text-[10px] text-[#9ca69b]">Due {t.due}</div></div></div><span className="text-xs font-extrabold text-[#425e47]">{t.current}%</span></div><div className="ml-10 h-1.5 overflow-hidden rounded-full bg-[#eff2ed]"><motion.div initial={{ width: 0 }} animate={{ width: `${t.current}%` }} transition={{ duration: .8, delay: i*.12 }} className={`h-full rounded-full ${i===1?'bg-[#d7b56d]':'bg-[#6f9873]'}`}/></div></div>)}</div>
      </div>
      <div className="relative overflow-hidden rounded-[22px] bg-[#e8f0df] p-5 sm:p-6">
        <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border-[24px] border-white/25"/><div className="absolute bottom-[-45px] right-16 h-32 w-32 rounded-full bg-[#d6f17a]/30 blur-2xl"/>
        <div className="relative"><div className="flex items-center gap-2 text-[9px] font-extrabold tracking-[1.7px] text-[#70856d]"><Sparkles size={14}/> YOUR AI BRIEFING</div><h3 className="mt-4 max-w-sm font-['Manrope'] text-xl font-extrabold leading-7 tracking-[-.5px] text-[#35523a]">One small shift could unlock a big impact.</h3><p className="mt-3 max-w-sm text-xs leading-6 text-[#71836f]">Your renewable energy share is at 42%. Closing the gap to 50% could meaningfully support your transition plan — if site feasibility and procurement options line up.</p><div className="mt-5 flex flex-wrap gap-2"><span className="rounded-lg bg-white/70 px-2.5 py-1.5 text-[10px] font-bold text-[#5d795b]">✦ AI-assisted insight</span><span className="rounded-lg bg-white/70 px-2.5 py-1.5 text-[10px] font-bold text-[#5d795b]">High potential</span></div><Button variant="primary" className="mt-5" onClick={() => setActive('AI insights')}>Explore recommendation <ArrowRight size={14}/></Button></div>
      </div>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[10px] text-[#a2aca2]"><span>Demo workspace · Illustrative metrics for product preview</span><span className="flex items-center gap-1"><CheckCircle2 size={12}/> Data last refreshed 12 minutes ago</span></div>
  </motion.div>
}
function TrendingIcon(){return <Activity size={15}/>}

function GenericPage({ active, setActive, metrics, setMetrics, notify }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All categories')
  const [modal, setModal] = useState(false)
  const [newMetric, setNewMetric] = useState({ name: '', category: 'Environmental', value: '', unit: '', site: 'Chennai Plant' })
  const [period, setPeriod] = useState('This month')
  const filtered = useMemo(() => metrics.filter(m => (category === 'All categories' || m.category === category) && `${m.name} ${m.site} ${m.category}`.toLowerCase().includes(query.toLowerCase())), [metrics, category, query])
  const isMetrics = active === 'Data explorer'
  const isAI = active === 'AI insights'
  const isTargets = active === 'Targets & goals'
  const isReports = active === 'Reports'
  const isEnv = active === 'Environment'
  const isSocial = active === 'Social impact'
  const isGov = active === 'Governance'
  const saveMetric = (e) => {
    e.preventDefault()
    if (!newMetric.name || newMetric.value === '' || !newMetric.unit) return
    setMetrics(prev => [{ ...newMetric, id: `m${Date.now()}`, value: Number(newMetric.value), period: 'Oct 2026', status: 'Unverified' }, ...prev])
    setModal(false); setNewMetric({ name: '', category: 'Environmental', value: '', unit: '', site: 'Chennai Plant' }); notify('Metric added to your workspace')
  }
  const exportCSV = () => {
    const rows = [['Category','Metric','Value','Unit','Period','Site','Status'], ...filtered.map(m => [m.category,m.name,m.value,m.unit,m.period,m.site,m.status])]
    const csv = rows.map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'verdant-esg-metrics.csv'; a.click(); URL.revokeObjectURL(url); notify('CSV export downloaded')
  }
  const title = pageMeta[active]?.[0] || active
  return <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-7">
    {isEnv && <div className="grid gap-4 sm:grid-cols-3"><MetricCard label="Scope 1 + 2 emissions" value="550" unit="tCO₂e" delta="8.4%" positive icon={Wind} tint="bg-[#eaf1e5] text-[#527956]"/><MetricCard label="Renewable electricity" value="42" unit="%" delta="6.2%" positive icon={Zap} tint="bg-[#fff3d9] text-[#a9833d]"/><MetricCard label="Water withdrawal" value="12.5" unit="k m³" delta="2.1%" positive={false} icon={Droplets} tint="bg-[#e5f1f2] text-[#5b8f91]"/></div>}
    {isSocial && <div className="grid gap-4 sm:grid-cols-3"><MetricCard label="Training completion" value="91" unit="%" delta="7.2%" positive icon={Users} tint="bg-[#eaf1e5] text-[#527956]"/><MetricCard label="Engagement score" value="84" unit="/100" delta="3.4%" positive icon={Activity} tint="bg-[#f0e9f7] text-[#8c73a4]"/><MetricCard label="Safety incidents" value="2" unit="this month" delta="1 fewer" positive icon={ShieldCheck} tint="bg-[#e5f1f2] text-[#5b8f91]"/></div>}
    {isGov && <div className="grid gap-4 sm:grid-cols-3"><MetricCard label="Ethics training" value="96" unit="%" delta="4.0%" positive icon={ShieldCheck} tint="bg-[#eaf1e5] text-[#527956]"/><MetricCard label="Open risk actions" value="5" unit="items" delta="2 overdue" positive={false} icon={AlertTriangle} tint="bg-[#fff3d9] text-[#a9833d]"/><MetricCard label="Policy reviews" value="88" unit="%" delta="12 to go" positive icon={CheckCircle2} tint="bg-[#e5f1f2] text-[#5b8f91]"/></div>}
    {isAI && <div className="relative overflow-hidden rounded-[24px] bg-[#315b45] p-6 text-white sm:p-8"><div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border border-white/10"/><div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold text-[#d6f17a]"><Sparkles size={13}/> ESG COPILOT · DEMO MODE</span><h2 className="mt-4 max-w-xl font-['Manrope'] text-2xl font-extrabold tracking-[-.7px]">Make your next move<br/>a more informed one.</h2><p className="mt-3 max-w-xl text-xs leading-6 text-white/65">AI-assisted interpretations of your current metrics. Treat recommendations as starting points, then validate against operational context.</p></div><div className="grid h-24 w-24 shrink-0 place-items-center rounded-[28px] border border-white/10 bg-white/10 text-[#d6f17a]"><BrainCircuit size={42}/></div></div></div>}
    {isAI && <div className="grid gap-4 xl:grid-cols-3">{insights.map((item,i) => <motion.div key={item.id} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*.1}} whileHover={{y:-4}} className="rounded-[21px] border border-[#e7ebe3] bg-white p-5 soft-shadow"><div className="flex items-center justify-between"><span className={`rounded-lg px-2.5 py-1.5 text-[9px] font-extrabold ${item.tone==='gold'?'bg-[#fff3d9] text-[#a17c37]':item.tone==='blue'?'bg-[#e7f1f4] text-[#5c858c]':'bg-[#eaf4e7] text-[#527956]'}`}>{item.type}</span><Sparkles size={16} className="text-[#9cb18c]"/></div><h3 className="mt-5 font-['Manrope'] text-[15px] font-extrabold leading-6 text-[#304333]">{item.title}</h3><p className="mt-3 text-xs leading-6 text-[#829083]">{item.text}</p><div className="mt-5 flex items-center justify-between border-t border-[#eef1eb] pt-4"><span className="text-[10px] font-bold text-[#728271]">{item.impact}</span><button onClick={() => notify('Recommendation saved to action plan')} className="flex items-center gap-1 text-[10px] font-bold text-[#527557] hover:gap-2">Save action <ArrowRight size={12}/></button></div></motion.div>)}</div>}
    {isTargets && <div className="grid gap-4 xl:grid-cols-2">{targets.map((t,i)=><motion.div key={t.name} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:i*.08}} className="rounded-[21px] border border-[#e7ebe3] bg-white p-5 soft-shadow"><div className="flex items-start justify-between gap-3"><div><span className="text-[9px] font-extrabold tracking-[1.5px] text-[#9aa69a]">{t.category.toUpperCase()}</span><h3 className="mt-2 text-sm font-bold text-[#344938]">{t.name}</h3></div><span className="rounded-lg bg-[#f3f6ef] px-2.5 py-1.5 text-[10px] font-bold text-[#788879]">Due {t.due}</span></div><div className="mt-6 flex items-baseline justify-between"><span className="font-['Manrope'] text-3xl font-extrabold text-[#304b39]">{t.current}%</span><span className="text-xs text-[#97a197]">Target: {t.target}%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-[#edf1e9]"><motion.div initial={{width:0}} animate={{width:`${t.current}%`}} transition={{duration:.8,delay:i*.12}} className={`h-full rounded-full ${t.color==='gold'?'bg-[#d7b56d]':'bg-[#6f9873]'}`}/></div><div className="mt-4 flex items-center gap-2 text-[10px] text-[#889689]"><CheckCircle2 size={13} className="text-[#6c9471]"/>{Math.max(t.target-t.current,0)} points to target</div></motion.div>)}</div>}
    {isReports && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[{icon:FileBarChart2,title:'Monthly ESG pulse',sub:'October 2026 · Executive snapshot',tag:'READY'},{icon:Leaf,title:'Environmental performance',sub:'Q3 2026 · Emissions & resources',tag:'DRAFT'},{icon:Users,title:'People & governance',sub:'Q3 2026 · Social indicators',tag:'READY'}].map((r,i)=><motion.div key={r.title} whileHover={{y:-4}} className="rounded-[21px] border border-[#e7ebe3] bg-white p-5 soft-shadow"><div className="flex items-start justify-between"><div className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#edf3e9] text-[#527557]"><r.icon size={20}/></div><span className="rounded-md bg-[#f2f5ef] px-2 py-1 text-[9px] font-extrabold tracking-wide text-[#849184]">{r.tag}</span></div><h3 className="mt-5 text-sm font-bold text-[#3b4e3e]">{r.title}</h3><p className="mt-2 text-xs text-[#939e93]">{r.sub}</p><div className="mt-5 border-t border-[#eef1eb] pt-4"><Button className="w-full" onClick={()=>notify('Report preview is a demo placeholder. Export metrics as CSV from Data explorer.')}><Download size={14}/> Preview report</Button></div></motion.div>)}</div>}
    {!isAI && !isTargets && !isReports && <>
      <div className="rounded-[22px] border border-[#e7ebe3] bg-white p-5 sm:p-6 soft-shadow">
        <SectionTitle eyebrow={isMetrics?'DATA MANAGEMENT':isEnv?'RESOURCE & EMISSIONS DATA':isSocial?'PEOPLE METRICS':'CONTROL & COMPLIANCE'} title={isMetrics?'ESG metrics library':isEnv?'Environmental metrics':isSocial?'Social performance indicators':'Governance indicators'} subtitle="A clear view of the numbers behind your impact." action={<div className="flex gap-2"><Button onClick={exportCSV}><Download size={14}/> Export CSV</Button><Button variant="primary" onClick={()=>setModal(true)}><Plus size={14}/> Add metric</Button></div>}/>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a0aaa0]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search metrics, sites..." className="w-full rounded-xl border border-[#e7ebe3] bg-[#fbfcf9] py-2.5 pl-10 pr-3 text-xs outline-none transition focus:border-[#9bb39a]"/></div><div className="relative"><SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c998d]"/><select value={category} onChange={e=>setCategory(e.target.value)} className="w-full appearance-none rounded-xl border border-[#e7ebe3] bg-[#fbfcf9] py-2.5 pl-9 pr-8 text-xs text-[#627063] outline-none sm:w-auto"><option>All categories</option><option>Environmental</option><option>Social</option><option>Governance</option></select><ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8c998d]"/></div></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left"><thead><tr className="border-b border-[#edf0ea] text-[9px] font-extrabold tracking-[1.2px] text-[#9ba69b]"><th className="pb-3 pl-2">METRIC</th><th className="pb-3">CATEGORY</th><th className="pb-3">VALUE</th><th className="pb-3">REPORTING PERIOD</th><th className="pb-3">DATA STATUS</th></tr></thead><tbody>{filtered.filter(m => !isEnv || m.category==='Environmental').filter(m => !isSocial || m.category==='Social').filter(m => !isGov || m.category==='Governance').map((m,i)=><motion.tr initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*.025}} key={m.id} className="border-b border-[#f0f2ed] last:border-0 hover:bg-[#fbfcf9]"><td className="py-4 pl-2"><div className="font-semibold text-[#455649]">{m.name}</div><div className="mt-1 text-[10px] text-[#a0aaa0]">{m.site}</div></td><td className="py-4"><span className={`rounded-lg px-2 py-1.5 text-[9px] font-bold ${m.category==='Environmental'?'bg-[#edf4e9] text-[#648467]':m.category==='Social'?'bg-[#f1eafa] text-[#8b73a2]':'bg-[#fff3dd] text-[#a18142]'}`}>{m.category}</span></td><td className="py-4 text-xs font-bold text-[#46594a]">{Number(m.value).toLocaleString()} <span className="font-normal text-[#9aa59a]">{m.unit}</span></td><td className="py-4 text-xs text-[#7f8d80]">{m.period}</td><td className="py-4"><span className="inline-flex items-center gap-1.5 text-[10px] text-[#748a75]"><span className={`h-1.5 w-1.5 rounded-full ${m.status==='Verified'?'bg-[#6b9b72]':m.status==='Reviewed'?'bg-[#d2b366]':'bg-[#b6bdb5]'}`}/>{m.status}</span></td></motion.tr>)}</tbody></table>{filtered.length===0&&<div className="py-12 text-center text-xs text-[#9aa59a]">No metrics match your search.</div>}</div>
        <div className="mt-4 flex items-center justify-between text-[10px] text-[#a0aaa0]"><span>Showing {filtered.length} metrics · Demo workspace</span><span className="flex items-center gap-1"><CheckCircle2 size={12}/> Data quality visible</span></div>
      </div>
    </>}
    <AnimatePresence>{modal && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1f3024]/35 p-4 backdrop-blur-sm" onClick={()=>setModal(false)}><motion.form initial={{opacity:0,y:18,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10}} onSubmit={saveMetric} onClick={e=>e.stopPropagation()} className="w-full max-w-md rounded-[24px] bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><div><div className="text-[9px] font-extrabold tracking-[1.8px] text-[#8fa08e]">DATA INPUT</div><h3 className="mt-1 font-['Manrope'] text-xl font-extrabold text-[#304333]">Add a metric</h3></div><button type="button" onClick={()=>setModal(false)} className="rounded-lg p-2 text-[#8c998d] hover:bg-[#f1f4ee]"><X size={18}/></button></div><p className="mt-2 text-xs leading-5 text-[#8c998d]">Add a measurement to your demo workspace. New records are marked unverified.</p><label className="mt-5 block text-xs font-bold text-[#607062]">Metric name<input required value={newMetric.name} onChange={e=>setNewMetric({...newMetric,name:e.target.value})} placeholder="e.g. Scope 1 emissions" className="mt-2 w-full rounded-xl border border-[#e4eae1] bg-[#fbfcf9] px-3 py-3 text-sm font-normal outline-none focus:border-[#9bb39a]"/></label><div className="mt-4 grid grid-cols-2 gap-3"><label className="text-xs font-bold text-[#607062]">Category<select value={newMetric.category} onChange={e=>setNewMetric({...newMetric,category:e.target.value})} className="mt-2 w-full rounded-xl border border-[#e4eae1] bg-[#fbfcf9] px-3 py-3 text-xs outline-none"><option>Environmental</option><option>Social</option><option>Governance</option></select></label><label className="text-xs font-bold text-[#607062]">Value<input required type="number" step="any" value={newMetric.value} onChange={e=>setNewMetric({...newMetric,value:e.target.value})} placeholder="0" className="mt-2 w-full rounded-xl border border-[#e4eae1] bg-[#fbfcf9] px-3 py-3 text-sm font-normal outline-none focus:border-[#9bb39a]"/></label></div><div className="mt-4 grid grid-cols-2 gap-3"><label className="text-xs font-bold text-[#607062]">Unit<input required value={newMetric.unit} onChange={e=>setNewMetric({...newMetric,unit:e.target.value})} placeholder="tCO₂e, %, m³" className="mt-2 w-full rounded-xl border border-[#e4eae1] bg-[#fbfcf9] px-3 py-3 text-xs font-normal outline-none focus:border-[#9bb39a]"/></label><label className="text-xs font-bold text-[#607062]">Site<input value={newMetric.site} onChange={e=>setNewMetric({...newMetric,site:e.target.value})} className="mt-2 w-full rounded-xl border border-[#e4eae1] bg-[#fbfcf9] px-3 py-3 text-xs font-normal outline-none focus:border-[#9bb39a]"/></label></div><div className="mt-6 flex gap-2"><Button className="flex-1" onClick={()=>setModal(false)}>Cancel</Button><Button type="submit" variant="primary" className="flex-1"><Plus size={14}/> Save metric</Button></div></motion.form></motion.div>}</AnimatePresence>
  </motion.div>
}

function App() {
  const [active, setActive] = useState('Overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [metrics, setMetrics] = useState(demoMetrics)
  const [toast, setToast] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [period, setPeriod] = useState('Last 30 days')
  const meta = pageMeta[active] || pageMeta.Overview
  const notify = (msg) => { setToast(msg); setTimeout(()=>setToast(''), 2800) }
  const exportReport = () => {
    const csv = [['Metric','Value','Unit','Period'],['Carbon emissions',550,'tCO2e','Oct 2026'],['Renewable energy',42,'%','Oct 2026'],['Water withdrawal',12500,'m3','Oct 2026'],['Waste recycled',76,'%','Oct 2026']].map(r=>r.join(',')).join('\n')
    const blob = new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='verdant-esg-snapshot.csv'; a.click(); URL.revokeObjectURL(url); notify('ESG snapshot exported')
  }
  return <div className="min-h-screen bg-[#f5f7f2] text-[#263b2d] lg:flex">
    <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
    <main className="min-w-0 flex-1 lg:h-screen lg:overflow-y-auto">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#e7ebe3]/90 bg-[#f8faf6]/90 px-4 py-3 backdrop-blur-xl sm:px-7 lg:px-9">
        <div className="flex min-w-0 items-center gap-3"><button onClick={()=>setMobileOpen(true)} className="rounded-xl border border-[#e3e9e0] bg-white p-2 text-[#617164] lg:hidden"><Menu size={17}/></button><div className="min-w-0"><div className="flex items-center gap-2 text-[10px] text-[#9aa59a]"><span>Workspace</span><ChevronRight size={11}/><span className="truncate font-bold text-[#657768]">{active}</span></div><div className="mt-1 truncate text-[11px] font-semibold text-[#607263]">Sustainability overview <span className="mx-1 text-[#c4ccc2]">/</span> <span className="font-normal text-[#a0aaa0]">FY 2026</span></div></div></div>
        <div className="flex items-center gap-2 sm:gap-3"><button onClick={()=>setSearchOpen(!searchOpen)} className="hidden items-center gap-5 rounded-xl border border-[#e4e9e1] bg-white px-3 py-2.5 text-[10px] text-[#a0aaa0] transition hover:border-[#bdcdb8] md:flex"><span className="flex items-center gap-2"><Search size={13}/> Search anything...</span><kbd className="rounded border border-[#e9ede6] bg-[#f8faf6] px-1.5 py-0.5 text-[9px]">⌘ K</kbd></button><button onClick={()=>setSearchOpen(!searchOpen)} className="rounded-xl border border-[#e4e9e1] bg-white p-2.5 text-[#78877a] md:hidden"><Search size={15}/></button><div className="relative"><button onClick={()=>setNotifications(!notifications)} className="relative rounded-xl border border-[#e4e9e1] bg-white p-2.5 text-[#78877a] transition hover:bg-[#f1f5ed]"><Bell size={16}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full border border-white bg-[#d7b56d]"/></button><AnimatePresence>{notifications&&<motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="absolute right-0 top-12 w-72 rounded-2xl border border-[#e6ebe3] bg-white p-4 shadow-xl"><div className="flex items-center justify-between"><b className="text-xs text-[#344938]">Notifications</b><span className="text-[9px] text-[#9aa59a]">2 updates</span></div><div className="mt-4 flex gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#d7b56d]"/><div><div className="text-xs font-bold text-[#536456]">Water target needs attention</div><p className="mt-1 text-[10px] leading-4 text-[#98a198]">Review the water-efficiency action plan.</p></div></div><div className="mt-4 flex gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#6f9873]"/><div><div className="text-xs font-bold text-[#536456]">October metrics refreshed</div><p className="mt-1 text-[10px] leading-4 text-[#98a198]">Demo workspace data updated.</p></div></div></motion.div>}</AnimatePresence></div><button className="flex items-center gap-2 rounded-xl border border-[#e4e9e1] bg-white p-1.5 pr-2.5 transition hover:border-[#bdcdb8]"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#e1e9d8] text-[10px] font-extrabold text-[#49694e]">AC</span><ChevronDown size={13} className="hidden text-[#89968a] sm:block"/></button></div>
      </header>
      <div className="mx-auto max-w-[1500px] px-4 pb-10 pt-7 sm:px-7 sm:pt-8 lg:px-9 lg:pt-9">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="mb-2 flex items-center gap-2"><span className="h-[2px] w-5 rounded-full bg-[#b3c79f]"/><span className="text-[9px] font-extrabold tracking-[2px] text-[#8b9d88]">YOUR IMPACT, IN FOCUS</span></div><h1 className="font-['Manrope'] text-[25px] font-extrabold tracking-[-1px] text-[#2c4132] sm:text-[30px]">{meta[0]}</h1><p className="mt-2 max-w-2xl text-xs leading-5 text-[#8b988c] sm:text-[13px]">{meta[1]}</p></div><div className="flex flex-wrap gap-2"><button onClick={()=>setPeriod(period==='Last 30 days'?'This quarter':'Last 30 days')} className="flex items-center gap-2 rounded-xl border border-[#e3e9e0] bg-white px-3 py-2.5 text-[10px] font-bold text-[#718072]"><Clock3 size={13}/>{period}<ChevronDown size={12}/></button><Button onClick={exportReport}><Download size={14}/><span className="hidden sm:inline">Export snapshot</span><span className="sm:hidden">Export</span></Button></div></div>
        {searchOpen&&<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} className="mb-5 rounded-2xl border border-[#e3e9e0] bg-white p-3 soft-shadow"><div className="flex flex-wrap gap-2">{nav.map(n=><button key={n.label} onClick={()=>{setActive(n.label);setSearchOpen(false)}} className="rounded-lg bg-[#f4f7f1] px-3 py-2 text-xs font-semibold text-[#617363] transition hover:bg-[#e7efdf]">{n.label}</button>)}</div></motion.div>}
        <AnimatePresence mode="wait"><div key={active}>{active==='Overview'?<Overview setActive={setActive} metrics={metrics}/>:<GenericPage active={active} setActive={setActive} metrics={metrics} setMetrics={setMetrics} notify={notify}/>}</div></AnimatePresence>
      </div>
      <footer className="mx-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#e5eae2] px-1 py-5 text-[10px] text-[#a1aba0] sm:mx-7 lg:mx-9"><span>© 2026 Verdant Intelligence · Made for a more thoughtful future.</span><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#78a17b]"/> All systems operational <span className="mx-1 text-[#d0d7ce]">·</span> Demo environment</span></footer>
    </main>
    <AnimatePresence>{toast&&<motion.div initial={{opacity:0,y:20,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10}} className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-xl bg-[#294b37] px-4 py-3 text-xs font-semibold text-white shadow-2xl"><Check size={15} className="text-[#d6f17a]"/>{toast}</motion.div>}</AnimatePresence>
  </div>
}

export default App
