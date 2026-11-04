import { useState } from 'react'
import { Activity, ArrowRight, Bell, BookOpen, Building2, ChartNoAxesCombined, ChevronDown, CircleHelp, ClipboardList, FileDown, Globe2, Home, LayoutDashboard, LockKeyhole, Menu, Search, Settings, ShieldCheck, Users, X } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const trend = [
  { month: 'May', families: 320 }, { month: 'Jun', families: 348 }, { month: 'Jul', families: 342 },
  { month: 'Aug', families: 375 }, { month: 'Sep', families: 389 }, { month: 'Oct', families: 412 },
]
const nav = [
  { label: 'Overview', icon: LayoutDashboard }, { label: 'Families', icon: Home },
  { label: 'Residents', icon: Users }, { label: 'Reports & exports', icon: FileDown },
]
function Brand() {
  return <div className="brand"><div className="brand-mark"><Building2 size={22}/></div><div><strong>VIMS</strong><span>Village Information System</span></div></div>
}
function Welcome({ onEnter, sinhala, setSinhala }: { onEnter: () => void; sinhala: boolean; setSinhala: (v: boolean) => void }) {
  return <main className="welcome">
    <div className="welcome-top"><Brand/><button className="language" onClick={() => setSinhala(!sinhala)}><Globe2 size={16}/>{sinhala ? 'සිංහල' : 'English'} <ChevronDown size={14}/></button></div>
    <section className="welcome-content">
      <div className="welcome-copy"><div className="eyebrow"><span/> DIGITAL VILLAGE SERVICES</div>
        <h1>{sinhala ? 'ඔබේ ගම, වඩාත් හොඳින් කළමනාකරණය කරමු.' : 'A clearer picture of your community.'}</h1>
        <p>{sinhala ? 'පවුල්, පුද්ගල තොරතුරු සහ ග්‍රාමීය වාර්තා එකම ආරක්ෂිත පද්ධතියකින් කළමනාකරණය කරන්න.' : 'A modern workspace to organise household records, understand community needs and create reliable reports.'}</p>
        <div className="welcome-actions"><button className="primary-btn" onClick={onEnter}>{sinhala ? 'පද්ධතියට පිවිසෙන්න' : 'Explore the dashboard'} <ArrowRight size={18}/></button><span><ShieldCheck size={16}/> Privacy-first foundation</span></div>
        <div className="welcome-points"><div><Users/><b>People & families</b><small>Connected household records</small></div><div><ChartNoAxesCombined/><b>Useful insights</b><small>Clear community summaries</small></div><div><LockKeyhole/><b>Controlled access</b><small>Designed for secure roles</small></div></div>
      </div>
      <div className="welcome-art"><div className="art-glow"/><div className="art-card art-card-main"><div className="mini-head"><span>COMMUNITY OVERVIEW</span><Activity size={17}/></div><div className="art-number">1,846</div><div className="art-sub">Residents registered <span>↗ 8.4%</span></div><div className="art-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="art-bottom"><span>Families</span><b>412</b></div></div><div className="floating-note"><span className="note-icon"><ShieldCheck size={18}/></span><div><b>Records protected</b><small>Access-aware by design</small></div></div><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/></div>
    </section>
    <footer className="welcome-footer"><span>© 2026 VIMS · Village Information Management System</span><span>Built for communities in Sri Lanka</span></footer>
  </main>
}
function Dashboard({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState('Overview')
  const [menu, setMenu] = useState(false)
  const [query, setQuery] = useState('')
  const metrics = [
    { label: 'Total families', value: '412', delta: '+8.4%', icon: Home, tint: 'blue' },
    { label: 'Registered residents', value: '1,846', delta: '+5.2%', icon: Users, tint: 'violet' },
    { label: 'Households reviewed', value: '368', delta: '89.3%', icon: ClipboardList, tint: 'green' },
    { label: 'Pending reviews', value: '24', delta: 'Needs attention', icon: Activity, tint: 'amber' },
  ]
  return <div className="dashboard-shell">
    <aside className={menu ? 'sidebar open' : 'sidebar'}><div className="side-brand"><Brand/><button className="close-menu" onClick={() => setMenu(false)}><X/></button></div>
      <div className="side-label">WORKSPACE</div><nav>{nav.map(item => <button key={item.label} className={active === item.label ? 'nav-item active' : 'nav-item'} onClick={() => { setActive(item.label); setMenu(false) }}><item.icon size={18}/>{item.label}{item.label === 'Reports & exports' && <span className="nav-arrow">↗</span>}</button>)}</nav>
      <div className="side-label side-label-bottom">PREFERENCES</div><nav><button className="nav-item" onClick={() => setActive('Settings')}><Settings size={18}/>Settings</button><button className="nav-item" onClick={() => setActive('Help & support')}><CircleHelp size={18}/>Help & support</button></nav>
      <div className="sidebar-bottom"><div className="secure-card"><ShieldCheck size={19}/><b>Security matters</b><p>Personal records should only be accessible to authorised officers.</p></div><div className="profile"><div className="avatar">AD</div><div><b>Administrator</b><small>Demo workspace</small></div><ChevronDown size={16}/></div></div>
    </aside>
    <main className="dash-main"><header className="topbar"><div className="top-left"><button className="mobile-menu" onClick={() => setMenu(true)}><Menu/></button><div><div className="crumb">Workspace <span>/</span> {active}</div><h2>{active === 'Overview' ? 'Community overview' : active}</h2></div></div><div className="top-actions"><label className="search-box"><Search size={17}/><input placeholder="Search records..." value={query} onChange={e => setQuery(e.target.value)}/><kbd>⌘ K</kbd></label><button className="icon-btn" aria-label="Notifications"><Bell size={19}/><i/></button><div className="top-avatar">AD</div></div></header>
      <section className="dash-content"><div className="page-intro"><div><div className="date-line">TUESDAY, 04 NOVEMBER 2026</div><h1>Good morning, Administrator <span>✦</span></h1><p>Here’s what’s happening in your community workspace.</p></div><button className="outline-btn" onClick={onBack}><BookOpen size={16}/> Welcome page</button></div>
        <div className="demo-banner"><span className="demo-dot"/> DEMO PREVIEW <span>This dashboard currently uses sample figures, not real resident records.</span></div>
        <div className="metric-grid">{metrics.map(m => <article className="metric-card" key={m.label}><div className="metric-top"><span>{m.label}</span><div className={'metric-icon '+m.tint}><m.icon size={19}/></div></div><div className="metric-value">{m.value}</div><div className="metric-foot"><span className={m.tint === 'amber' ? 'neutral' : 'positive'}>{m.delta}</span><span>{m.tint === 'amber' ? ' ' : 'vs last month'}</span></div></article>)}</div>
        <div className="content-grid"><article className="panel chart-panel"><div className="panel-head"><div><h3>Registration activity</h3><p>Family records over the last six months</p></div><button className="period-btn">Last 6 months <ChevronDown size={14}/></button></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trend} margin={{top:12,right:8,left:-20,bottom:0}}><defs><linearGradient id="fillBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#477ce8" stopOpacity={0.22}/><stop offset="95%" stopColor="#477ce8" stopOpacity={0.01}/></linearGradient></defs><CartesianGrid stroke="#edf1f6" vertical={false}/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:'#8a96a8',fontSize:12}} dy={10}/><YAxis axisLine={false} tickLine={false} tick={{fill:'#8a96a8',fontSize:12}}/><Tooltip/><Area type="monotone" dataKey="families" stroke="#477ce8" strokeWidth={2.5} fill="url(#fillBlue)"/></AreaChart></ResponsiveContainer></div></article>
          <article className="panel tasks-panel"><div className="panel-head"><div><h3>Quick actions</h3><p>Common workspace tasks</p></div></div><button className="quick-action" onClick={() => setActive('Families')}><span className="quick-icon blue"><Home size={18}/></span><span><b>Manage families</b><small>View and organise households</small></span><ArrowRight size={17}/></button><button className="quick-action" onClick={() => setActive('Residents')}><span className="quick-icon violet"><Users size={18}/></span><span><b>Resident directory</b><small>Find individual records</small></span><ArrowRight size={17}/></button><button className="quick-action" onClick={() => setActive('Reports & exports')}><span className="quick-icon green"><FileDown size={18}/></span><span><b>Reports & exports</b><small>Prepare reports and summaries</small></span><ArrowRight size={17}/></button></article></div>
        <div className="bottom-grid"><article className="panel info-panel"><div className="panel-head"><div><h3>Recent workspace activity</h3><p>Sample activity feed for interface preview</p></div><button className="text-btn">View all <ArrowRight size={14}/></button></div><div className="activity-row"><span className="activity-icon"><Users size={17}/></span><div><b>Resident directory module</b><small>Ready for secure data integration</small></div><time>Foundation</time></div><div className="activity-row"><span className="activity-icon"><ShieldCheck size={17}/></span><div><b>Access control planning</b><small>Authentication and permissions are next</small></div><time>Planned</time></div></article><article className="panel next-panel"><div className="next-icon"><LockKeyhole size={20}/></div><h3>Built with privacy in mind</h3><p>Real personal data will require sign-in, role permissions and database-level access policies before launch.</p><button onClick={() => setActive('Settings')}>View security plan <ArrowRight size={15}/></button></article></div>
        <footer className="dash-footer"><span>VIMS · Village Information Management System</span><span><ShieldCheck size={14}/> Secure-by-design foundation <span className="footer-sep">·</span> v0.1.0</span></footer>
      </section>
    </main>
  </div>
}
export default function App() {
  const [entered, setEntered] = useState(false)
  const [sinhala, setSinhala] = useState(false)
  return entered ? <Dashboard onBack={() => setEntered(false)}/> : <Welcome onEnter={() => setEntered(true)} sinhala={sinhala} setSinhala={setSinhala}/>
}