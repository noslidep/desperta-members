export default function ProgressBar({value=0}){const v=Math.max(0,Math.min(100,value||0));return <div className="progress" aria-label={`Progresso ${v}%`}><span style={{width:`${v}%`}}/></div>}
