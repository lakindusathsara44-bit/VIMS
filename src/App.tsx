import { useMemo, useState } from 'react'
import {
  Activity, AlertCircle, ArrowDownToLine, ArrowRight, ArrowUpRight, Bell, Building2,
  CalendarDays, ChartNoAxesCombined, CheckCircle2, ChevronDown, ChevronRight,
  CircleHelp, ClipboardCheck, Clock3, Database, Download, FileSpreadsheet, FileText,
  Filter, Globe2, Home, LayoutDashboard, LockKeyhole, MapPin, Menu, MoreHorizontal,
  Plus, Search, Settings, ShieldCheck, SlidersHorizontal, Users, UserRound, UserPlus, X
} from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type Section = 'Overview' | 'Families' | 'Residents' | 'Reports & exports' | 'Settings' | 'Help & support'
const trend = [
  { month: 'May', families: 320 }, { month: 'Jun', families: 348 }, { month: 'Jul', families: 342 },
  { month: 'Aug', families: 375 }, { month: 'Sep', families: 389 }, { month: 'Oct', families: 412 },
]
const families = [
  { id: 'VIM-0001', head: 'K. M. Perera', members: 5, address: 'No. 24, Temple Road', village: 'Pahala Kinigama', status: 'Reviewed' },
  { id: 'VIM-0002', head: 'S. A. Fernando', members: 4, address: 'No. 18, Lake View', village: 'Pahala Kinigama', status: 'Pending' },
  { id: 'VIM-0003', head: 'R. M. Jayasinghe', members: 3, address: 'No. 07, School Lane', village: 'Ihala Kinigama', status: 'Reviewed' },
  { id: 'VIM-0004', head: 'N. D. Kumari', members: 6, address: 'No. 41, Main Street', village: 'Ihala Kinigama', status: 'Needs update' },
  { id: 'VIM-0005', head: 'A. H. Mohamed', members: 4, address: 'No. 12, Mosque Road', village: 'Pahala Kinigama', status: 'Reviewed' },
]
const residents = [
  { id: 'RES-0101', name: 'K. M. Perera', family: 'VIM-0001', age: 54, gender: 'Male', village: 'Pahala Kinigama' },
  { id: 'RES-0102', name: 'W. P. Perera', family: 'VIM-0001', age: 49, gender: 'Female', village: 'Pahala Kinigama' },
  { id: 'RES-0103', name: 'K. P. Perera', family: 'VIM-0001', age: 21, gender: 'Male', village: 'Pahala Kinigama' },
  { id: 'RES-0104', name: 'S. A. Fernando', family: 'VIM-0002', age: 46, gender: 'Female', village: 'Pahala Kinigama' },
  { id: 'RES-0105', name: 'R. M. Jayasinghe', family: 'VIM-0003', age: 62, gender: 'Male', village: 'Ihala Kinigama' },
]
const nav: { label: Section; icon: typeof Home }[] = [
  { label: 'Overview', icon: LayoutDashboard }, { label: 'Families', icon: Home },
  { label: 'Residents', icon: Users }, { label: 'Reports & exports', icon: FileText },
]
function Brand() {
  return <div className="brand"><div className="brand-mark"><Building2 size={21}/></div><div><strong>VIMS</strong><span>Village Information System</span></div></div>
}
function Welcome({ onEnter, sinhala, setSinhala }: { onEnter: () => void; sinhala: boolean; setSinhala: (v: boolean) => void }) {
  return <main className="welcome">
    <header className="welcome-top"><Brand/><button className="language" onClick={() => setSinhala(!sinhala)}><Globe2 size={16}/>{sinhala ? 'සිංහල' : 'English'}<ChevronDown size={14}/></button></header>
    <section className="welcome-content">
      <div className="welcome-copy"><div className="eyebrow"><span/> DIGITAL VILLAGE SERVICES</div>
        <h1>{sinhala ? 'ඔබේ ගම, වඩාත් හොඳින් කළමනාකරණය කරමු.' : 'A clearer picture of your community.'}</h1>
        <p>{sinhala ? 'පවුල්, පුද්ගල තොරතුරු සහ ග්‍රාමීය වාර්තා එකම ආරක්ෂිත පද්ධතියකින් කළමනාකරණය කරන්න.' : 'A modern workspace to organise household records, understand community needs and create reliable reports.'}</p>
        <div className="welcome-actions"><button className="primary-btn" onClick={onEnter}>{sinhala ? 'පද්ධතියට පිවිසෙන්න' : 'Explore the dashboard'}<ArrowRight size={17}/></button><span><ShieldCheck size={16}/> Privacy-first foundation</span></div>
        <div className="welcome-points"><div><Users/><b>People & families</b><small>Connected household records</small></div><div><ChartNoAxesCombined/><b>Useful insights</b><small>Clear community summaries</small></div><div><LockKeyhole/><b>Controlled access</b><small>Designed for secure roles</small></div></div>
      </div>
      <div className="welcome-art"><div className="art-glow"/><div className="art-card art-card-main"><div className="mini-head"><span>COMMUNITY OVERVIEW</span><Activity size={17}/></div><div className="art-number">1,846</div><div className="art-sub">Residents registered <span>↗ 8.4%</span></div><div className="art-bars">{Array.from({length:12},(_,i)=><i key={i}/>)}</div><div className="art-bottom"><span>Families</span><b>412</b></div></div><div className="floating-note"><span className="note-icon"><ShieldCheck size={18}/></span><div><b>Records protected</b><small>Access-aware by design</small></div></div><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/></div>
    </section>
    <footer className="welcome-footer"><span>© 2026 VIMS · Village Information Management System</span><span>Built for communities in Sri Lanka</span></footer>
  </main>
}
function Status({ value }: { value: string }) {
  const cls = value === 'Reviewed' ? 'success' : value === 'Pending' ? 'warning' : 'danger'
  return <span className={'status '+cls}><i/>{value}</span>
}
function Overview({ setActive }: { setActive: (s: Section) => void }) {
  const metrics = [
    { label: 'Total families', value: '412', delta: '+8.4%', icon: Home, tint: 'blue' },
    { label: 'Registered residents', value: '1,846', delta: '+5.2%', icon: Users, tint: 'violet' },
    { label: 'Households reviewed', value: '368', delta: '89.3%', icon: ClipboardCheck, tint: 'green' },
    { label: 'Pending reviews', value: '24', delta: 'Needs attention', icon: AlertCircle, tint: 'amber' },
  ]
  return <>
    <div className="page-intro"><div><div className="date-line">TUESDAY, 04 NOVEMBER 2026</div><h1>Good evening, Administrator <span>✦</span></h1><p>Here’s what’s happening in your community workspace.</p></div><button className="outline-btn"><CalendarDays size={15}/> This month <ChevronDown size={14}/></button></div>
    <div className="demo-banner"><span className="demo-dot"/> DEMO PREVIEW <span>All figures and records shown here are illustrative sample data.</span></div>
    <div className="metric-grid">{metrics.map(m=><article className="metric-card" key={m.label}><div className="metric-top"><span>{m.label}</span><div className={'metric-icon '+m.tint}><m.icon size={18}/></div></div><div className="metric-value">{m.value}</div><div className="metric-foot"><span className={m.tint==='amber'?'neutral':'positive'}>{m.delta}</span><span>{m.tint==='amber'?'':'vs last month'}</span></div></article>)}</div>
    <div className="content-grid"><article className="panel chart-panel"><div className="panel-head"><div><h3>Registration activity</h3><p>Family records over the last six months</p></div><button className="period-btn">Last 6 months <ChevronDown size={14}/></button></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trend} margin={{top:12,right:8,left:-20,bottom:0}}><defs><linearGradient id="fillBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#477ce8" stopOpacity={0.22}/><stop offset="95%" stopColor="#477ce8" stopOpacity={0.01}/></linearGradient></defs><CartesianGrid stroke="#edf1f6" vertical={false}/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:'#8a96a8',fontSize:12}} dy={10}/><YAxis axisLine={false} tickLine={false} tick={{fill:'#8a96a8',fontSize:12}}/><Tooltip/><Area type="monotone" dataKey="families" stroke="#477ce8" strokeWidth={2.5} fill="url(#fillBlue)"/></AreaChart></ResponsiveContainer></div></article>
      <article className="panel tasks-panel"><div className="panel-head"><div><h3>Quick actions</h3><p>Common workspace tasks</p></div></div><button className="quick-action" onClick={()=>setActive('Families')}><span className="quick-icon blue"><Home size={18}/></span><span><b>Manage families</b><small>View and organise households</small></span><ArrowRight size={17}/></button><button className="quick-action" onClick={()=>setActive('Residents')}><span className="quick-icon violet"><Users size={18}/></span><span><b>Resident directory</b><small>Find individual records</small></span><ArrowRight size={17}/></button><button className="quick-action" onClick={()=>setActive('Reports & exports')}><span className="quick-icon green"><FileDownIcon/></span><span><b>Reports & exports</b><small>Prepare reports and summaries</small></span><ArrowRight size={17}/></button></article></div>
    <div className="bottom-grid"><article className="panel info-panel"><div className="panel-head"><div><h3>Recent workspace activity</h3><p>Sample activity feed for interface preview</p></div><button className="text-btn" onClick={()=>setActive('Reports & exports')}>View all <ArrowRight size={14}/></button></div><div className="activity-row"><span className="activity-icon"><Users size={17}/></span><div><b>Resident directory module</b><small>Ready for secure data integration</small></div><time>Foundation</time></div><div className="activity-row"><span className="activity-icon"><ShieldCheck size={17}/></span><div><b>Access control planning</b><small>Authentication and permissions are next</small></div><time>Planned</time></div></article><article className="panel next-panel"><div className="next-icon"><LockKeyhole size={20}/></div><h3>Built with privacy in mind</h3><p>Real personal data requires sign-in, role permissions and database-level access policies before launch.</p><button onClick={()=>setActive('Settings')}>Review security settings <ArrowRight size={15}/></button></article></div>
  </>
}
function FileDownIcon(){return <Download size={18}/>}
function DataTable({ kind, query }: { kind: 'families'|'residents'; query: string }) {
  const rows = kind==='families'?families:residents
  const filtered = useMemo(()=>rows.filter((r)=>Object.values(r).join(' ').toLowerCase().includes(query.toLowerCase())),[rows,query])
  return <div className="table-wrap"><table><thead><tr>{kind==='families'?<><th>FAMILY ID</th><th>FAMILY HEAD</th><th>MEMBERS</th><th>ADDRESS</th><th>VILLAGE</th><th>STATUS</th></>:<><th>RESIDENT ID</th><th>FULL NAME</th><th>FAMILY ID</th><th>AGE</th><th>GENDER</th><th>VILLAGE</th></>}</tr></thead><tbody>{filtered.map((r:any)=><tr key={r.id}><td className="id-cell">{r.id}</td>{kind==='families'?<><td className="name-cell">{r.head}</td><td>{r.members} members</td><td>{r.address}</td><td>{r.village}</td><td><Status value={r.status}/></td></>:<><td className="name-cell">{r.name}</td><td>{r.family}</td><td>{r.age}</td><td>{r.gender}</td><td>{r.village}</td></>}</tr>)}</tbody></table>{filtered.length===0&&<div className="empty-state">No matching records found.</div>}</div>
}
function RecordsPage({ kind, query, setQuery }: { kind:'families'|'residents'; query:string; setQuery:(v:string)=>void }) {
  const isFamily=kind==='families'
  return <><div className="page-intro"><div><div className="date-line">RECORD MANAGEMENT</div><h1>{isFamily?'Family directory':'Resident directory'}</h1><p>{isFamily?'Manage household profiles, family members and village addresses.':'Search and review individual resident information across the village.'}</p></div><button className="primary-btn small-btn"><Plus size={16}/>{isFamily?'Add family':'Add resident'}</button></div>
    <div className="demo-banner"><span className="demo-dot"/> DEMO DATA <span>These sample entries are not actual resident information.</span></div>
    <section className="panel records-panel"><div className="records-toolbar"><div className="records-count"><b>{isFamily?'412 families':'1,846 residents'}</b><span>Sample directory overview</span></div><div className="table-tools"><label className="table-search"><Search size={16}/><input placeholder={isFamily?'Search family, ID or village...':'Search resident, ID or family...'} value={query} onChange={e=>setQuery(e.target.value)}/></label><button className="filter-btn"><SlidersHorizontal size={15}/> Filter</button><button className="filter-btn"><Download size={15}/> Export</button></div></div><DataTable kind={kind} query={query}/><div className="table-footer"><span>Showing sample records · 5 entries</span><div><button disabled>Previous</button><button className="page-number">1</button><button disabled>Next</button></div></div></section>
    <div className="records-note"><ShieldCheck size={17}/><span><b>Data protection:</b> Create, edit and export actions will be enabled after authentication and database permissions are implemented.</span></div>
  </>
}
function ReportsPage() {
  return <><div className="page-intro"><div><div className="date-line">INSIGHTS & DOCUMENTS</div><h1>Reports & exports</h1><p>Prepare useful summaries for authorised village administration work.</p></div></div><div className="demo-banner"><span className="demo-dot"/> PREVIEW ONLY <span>Export actions are design placeholders; no real records can be downloaded yet.</span></div>
    <div className="report-grid">{[{icon:Users,title:'Resident register',desc:'A complete directory of registered residents.',tag:'Resident data'},{icon:Home,title:'Family register',desc:'Household profiles with all linked family members.',tag:'Family data'},{icon:ChartNoAxesCombined,title:'Village summary',desc:'Population, household and demographic summaries.',tag:'Statistics'},{icon:ClipboardCheck,title:'Review progress',desc:'Track reviewed, pending and incomplete records.',tag:'Administration'}].map((r)=><article className="panel report-card" key={r.title}><div className="report-icon"><r.icon size={20}/></div><span className="report-tag">{r.tag}</span><h3>{r.title}</h3><p>{r.desc}</p><div className="report-actions"><button disabled><FileText size={15}/> PDF</button><button disabled><FileSpreadsheet size={15}/> Excel</button></div></article>)}</div>
    <section className="panel export-panel"><div className="export-symbol"><Download size={20}/></div><div><h3>Individual & family profile export</h3><p>Future exports will support one resident profile or a complete family profile with linked members, subject to the user's permissions.</p></div><span className="coming-soon">PLANNED</span></section>
  </>
}
function SettingsPage() {
  return <><div className="page-intro"><div><div className="date-line">WORKSPACE CONFIGURATION</div><h1>Settings & administration</h1><p>Configure the system structure, access and village details.</p></div></div><div className="settings-grid">{[{icon:Building2,title:'Village profile',desc:'Village name, Grama Niladhari division, DS division and contact details.',state:'Configuration'},{icon:Users,title:'User roles',desc:'Administrator, Officer and Viewer permissions.',state:'Access control'},{icon:Globe2,title:'Language & terminology',desc:'Sinhala and English labels, local date and number formats.',state:'Preferences'},{icon:Database,title:'Data management',desc:'Database connection, backup and restore policies.',state:'Infrastructure'},{icon:SlidersHorizontal,title:'Ethnicity & religion options',desc:'Manage ethnicity, religion and denomination / tradition lists.',state:'Reference data'},{icon:ShieldCheck,title:'Security & audit log',desc:'Row-level security, access history and sensitive data controls.',state:'Security'}].map((x)=><article className="panel setting-card" key={x.title}><div className="setting-icon"><x.icon size={19}/></div><div><h3>{x.title}</h3><p>{x.desc}</p><span>{x.state}</span></div><ChevronRight size={17}/></article>)}</div><div className="records-note"><LockKeyhole size={17}/><span>Settings shown here are a UI preview. Changes will require an authenticated administrator account.</span></div></>
}
function HelpPage() {
  return <><div className="page-intro"><div><div className="date-line">SUPPORT CENTRE</div><h1>Help & support</h1><p>Guidance for using the Village Information Management System.</p></div></div><div className="help-grid"><article className="panel help-card"><CircleHelp size={22}/><h3>Getting started</h3><p>Learn how to navigate the dashboard, find records and understand the main modules.</p><button>Read user guide <ArrowRight size={15}/></button></article><article className="panel help-card"><Users size={22}/><h3>Family & resident records</h3><p>Understand family profiles, household membership and individual resident details.</p><button>View record guide <ArrowRight size={15}/></button></article><article className="panel help-card"><ShieldCheck size={22}/><h3>Privacy & security</h3><p>Learn why access permissions and careful handling of personal information matter.</p><button>View security guide <ArrowRight size={15}/></button></article></div><section className="panel support-panel"><div className="support-icon"><CircleHelp size={20}/></div><div><h3>Need help with this system?</h3><p>Support contact details and issue reporting will be added when the administration workflow is configured.</p></div></section></>
}
function Dashboard({ onBack }: { onBack:()=>void }) {
  const [active,setActive]=useState<Section>('Overview')
  const [menu,setMenu]=useState(false)
  const [query,setQuery]=useState('')
  const title=active==='Overview'?'Community overview':active
  const choose=(s:Section)=>{setActive(s);setQuery('');setMenu(false)}
  return <div className="dashboard-shell">
    <aside className={menu?'sidebar open':'sidebar'}><div className="side-brand"><Brand/><button className="close-menu" onClick={()=>setMenu(false)}><X size={18}/></button></div><div className="side-label">WORKSPACE</div><nav>{nav.map(item=><button key={item.label} className={active===item.label?'nav-item active':'nav-item'} onClick={()=>choose(item.label)}><item.icon size={18}/>{item.label}{item.label==='Reports & exports'&&<span className="nav-arrow">↗</span>}</button>)}</nav><div className="side-label side-label-bottom">PREFERENCES</div><nav><button className={active==='Settings'?'nav-item active':'nav-item'} onClick={()=>choose('Settings')}><Settings size={18}/>Settings</button><button className={active==='Help & support'?'nav-item active':'nav-item'} onClick={()=>choose('Help & support')}><CircleHelp size={18}/>Help & support</button></nav><div className="sidebar-bottom"><div className="secure-card"><ShieldCheck size={19}/><b>Security matters</b><p>Personal records should only be accessible to authorised officers.</p></div><div className="profile"><div className="avatar">AD</div><div><b>Administrator</b><small>Demo workspace</small></div><ChevronDown size={16}/></div></div></aside>
    <main className="dash-main"><header className="topbar"><div className="top-left"><button className="mobile-menu" onClick={()=>setMenu(true)}><Menu size={19}/></button><div><div className="crumb">Workspace <span>/</span> {active}</div><h2>{title}</h2></div></div><div className="top-actions"><label className="search-box"><Search size={17}/><input placeholder="Search records..." value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></label><button className="icon-btn" aria-label="Notifications"><Bell size={19}/><i/></button><div className="top-avatar">AD</div></div></header>
      <section className="dash-content">{active==='Overview'&&<Overview setActive={choose}/>}{active==='Families'&&<RecordsPage kind="families" query={query} setQuery={setQuery}/>}{active==='Residents'&&<RecordsPage kind="residents" query={query} setQuery={setQuery}/>}{active==='Reports & exports'&&<ReportsPage/>}{active==='Settings'&&<SettingsPage/>}{active==='Help & support'&&<HelpPage/>}
        <footer className="dash-footer"><span>VIMS · Village Information Management System</span><span><ShieldCheck size={14}/> Secure-by-design foundation <span className="footer-sep">·</span> v0.2.0</span></footer>
      </section>
    </main>
  </div>
}
export default function App() {
  const [entered,setEntered]=useState(false)
  const [sinhala,setSinhala]=useState(false)
  return entered?<Dashboard onBack={()=>setEntered(false)}/>:<Welcome onEnter={()=>setEntered(true)} sinhala={sinhala} setSinhala={setSinhala}/>
}
