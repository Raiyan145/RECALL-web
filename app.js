let priority='normal';let reminders=[
{title:'Study Physics',note:'Finish the next chapter',time:'Today, 10:00 AM',em:false,icon:'📘'},
{title:'Take Medicine',note:'Important reminder',time:'Today, 1:00 PM',em:false,icon:'💊'},
{title:'Math Practice',note:'Complete exercises',time:'Today, 4:00 PM',em:true,icon:'Σ'},
{title:'Call Mom',note:'Remember to call',time:'Today, 8:00 PM',em:false,icon:'☎️'},
{title:'Sleep Early',note:'Get enough rest',time:'Today, 11:00 PM',em:false,icon:'🌙'}];
function render(){document.getElementById('list').innerHTML=reminders.map(r=>`<div class="card"><div class="ico">${r.icon}</div><div class="info"><b>${r.title}</b><small>${r.note}<br>${r.time}</small></div><span class="tag ${r.em?'em':''}">${r.em?'Emergency':'Normal'}</span></div>`).join('')}
function openModal(){document.getElementById('modal').classList.remove('hidden')}
function closeModal(){document.getElementById('modal').classList.add('hidden')}
function setPriority(p){priority=p;document.getElementById('normal').classList.toggle('selected',p==='normal');document.getElementById('emergency').classList.toggle('selected',p==='emergency')}
function saveReminder(){let t=document.getElementById('title').value.trim();if(!t)return;let n=document.getElementById('note').value.trim();let dt=document.getElementById('time').value;let formatted=dt?new Date(dt).toLocaleString(): 'Scheduled';reminders.unshift({title:t,note:n||'No notes',time:formatted,em:priority==='emergency',icon:priority==='emergency'?'🚨':'🔔'});render();closeModal();document.getElementById('title').value='';document.getElementById('note').value='';}
render();