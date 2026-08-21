import Sidebar from './Sidebar';import Topbar from './Topbar'
export default function MemberLayout({profile,title,children}){return <div className="app-shell"><Sidebar profile={profile}/><main className="content"><Topbar title={title} profile={profile}/>{children}</main></div>}
