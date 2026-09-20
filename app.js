let priority='normal';
let filter='all';
let reminders=[
{id:1,title:'Study Physics',note:'Finish the next chapter',time:'Today, 10:00 AM',em:false,icon:'📘'},
{id:2,title:'Take Medicine',note:'Important reminder',time:'Today, 1:00 PM',em:false,icon:'💊'},
{id:3,title:'Math Practice',note:'Complete exercises',time:'Today, 4:00 PM',em:true,icon:'Σ'},
{id:4,title:'Call Mom',note:'Remember to call',time:'Today, 8:00 PM',em:false,icon:'☎️'},
{id:5,title:'Sleep Early',note:'Get enough rest',time:'Today, 11:00 PM',em:false,icon:'🌙'}
];

function render(){
  const list=document.getElementById('list');
  const shown=reminders.filter(r=>filter==='all'||(filter==='emergency'?r.em:!r.em));
  list.innerHTML=shown.length ? shown.map(r=>`
    <div class="card">
      <div class="ico">${r.icon}</div>
      <div class="info">
        <b>${escapeHtml(r.title)}</b>
        <small>${escapeHtml(r.note)}<br>${escapeHtml(r.time)}</small>
      </div>
      <span class="tag ${r.em?'em':''}">${r.em?'Emergency':'Normal'}</span>
      <button class="delete" title="Delete reminder" onclick="deleteReminder(${r.id})">🗑</button>
    </div>`).join('') :
    '<div class="empty">No reminders here yet.</div>';

  document.querySelectorAll('.filters button').forEach((b,i)=>{
    b.classList.toggle('active',(i===0&&filter==='all')||(i===1&&filter==='normal')||(i===2&&filter==='emergency'));
  });

  document.querySelector('.stats div:nth-child(1) b').textContent=reminders.filter(r=>!r.em).length;
  document.querySelector('.stats div:nth-child(2) b').textContent=reminders.length;
  document.querySelector('.stats div:nth-child(3) b').textContent=reminders.filter(r=>r.em).length;
}

function escapeHtml(v){
  return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

function openModal(){document.getElementById('modal').classList.remove('hidden')}
function closeModal(){document.getElementById('modal').classList.add('hidden')}

function setPriority(p){
  priority=p;
  document.getElementById('normal').classList.toggle('selected',p==='normal');
  document.getElementById('emergency').classList.toggle('selected',p==='emergency');
}

function setFilter(f){
  filter=f;
  render();
}

function deleteReminder(id){
  const r=reminders.find(x=>x.id===id);
  if(!r)return;
  if(confirm(`Delete "${r.title}"?`)){
    reminders=reminders.filter(x=>x.id!==id);
    render();
  }
}

function saveReminder(){
  const t=document.getElementById('title').value.trim();
  if(!t){
    document.getElementById('title').focus();
    return;
  }
  const n=document.getElementById('note').value.trim();
  const dt=document.getElementById('time').value;
  const formatted=dt ? new Date(dt).toLocaleString([],{
    year:'numeric',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'
  }) : 'No time set';

  reminders.unshift({
    id:Date.now(),
    title:t,
    note:n||'No notes',
    time:formatted,
    em:priority==='emergency',
    icon:priority==='emergency'?'🚨':'🔔'
  });

  render();
  closeModal();
  document.getElementById('title').value='';
  document.getElementById('note').value='';
  document.getElementById('time').value='';
  setPriority('normal');
}

function clearFormOnBackdrop(e){
  if(e.target===document.getElementById('modal')) closeModal();
}

document.getElementById('modal').addEventListener('click',clearFormOnBackdrop);
render();
