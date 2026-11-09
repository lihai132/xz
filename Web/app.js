'use strict';

const icons = {
  bank:'<circle cx="12" cy="12" r="9.2"/><path d="M12 3v6m0 6v6M8 9h8v6H8z"/>',
  home:'<path d="m3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  message:'<path d="M3 4h18v13H9l-5 4v-4H3z"/><path d="M7 8h10M7 12h7"/>',
  scan:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5M3 12h18M8 7v3m4-3v3m4-3v3M8 15v2m4-2v2m4-2v2"/>',
  pay:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 6h6m-3 3v8m-3-6 3 3 3-3m-6 7h6"/>',
  transfer:'<path d="M3 7h17m-5-5 5 5-5 5M21 17H4m5-5-5 5 5 5"/>',
  card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  chart:'<path d="M3 3v18h18M7 16l5-6 4 3 5-8"/>',
  globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 6h14M5 18h14"/>',
  coins:'<ellipse cx="9" cy="6" rx="6" ry="3"/><path d="M3 6v5c0 4 12 4 12 0V6M3 11v5c0 3 8 4 12 1"/><path d="M18 10c4 1 4 5 0 6m-3 6c4 0 6-2 6-4v-4"/>',
  fund:'<path d="M4 21h16M6 20V9h12v11M4 9l8-6 8 6M10 12v5m4-5v5"/>',
  loan:'<path d="M3 14h5l4 3h5c3 0 3 3 0 3H9l-6-2M12 11V3m-3 3 3 3 3-3M2 12v9"/>',
  more:'<circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="12" cy="19" r="2"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 22v-3c0-8 16-8 16 0v3"/>',
  life:'<path d="m3 10 9-7 9 7M5 9v12h14V9M9 15h6m-3-3v6"/>',
  back:'<path d="m15 4-8 8 8 8"/>',
  arrow:'<path d="m9 5 7 7-7 7"/>',
  eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  hidden:'<path d="m3 3 18 18M10 5c7-1 12 7 12 7a25 25 0 0 1-4 4M6 6a20 20 0 0 0-4 6s4 7 10 7a12 12 0 0 0 5-1M10 10a3 3 0 0 0 4 4"/>',
  settings:'<path d="M9 3h6l1 4 4 1v7l-4 1-1 5H9l-1-5-4-1V8l4-1z"/><circle cx="12" cy="12" r="3"/>',
  shield:'<path d="m12 2 9 4v7c0 5-9 9-9 9s-9-4-9-9V6zM8 12l3 3 5-6"/>',
  receipt:'<path d="M5 2h14v20l-3-2-4 2-4-2-3 2zM8 7h8M8 11h8M8 15h5"/>',
  check:'<path d="m5 12 5 5L20 6"/>',
  gift:'<rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9M12 8v13M12 8C2 8 6-2 12 8c6-10 10 0 0 0z"/>',
  phone:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.5"/>',
  document:'<path d="M5 2h9l5 5v15H5zM14 2v6h5M8 12h8M8 16h8"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.info}</svg>`;
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const currency = cents => (cents / 100).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const STORE = 'boc-local-interface-v1';
const seed = () => ({balance:12868050,hidden:false,transactions:[
  {id:'sample-1',name:'工资收入',category:'收入',cents:1580000,date:'2026-11-08 09:30',note:'虚拟单位 · 本地样例'},
  {id:'sample-2',name:'日常消费',category:'消费',cents:-6850,date:'2026-11-07 18:42',note:'生活消费 · 本地样例'},
  {id:'sample-3',name:'餐饮消费',category:'消费',cents:-12800,date:'2026-11-06 12:16',note:'餐饮服务 · 本地样例'},
  {id:'sample-4',name:'转账支出',category:'转账',cents:-200000,date:'2026-11-03 10:08',note:'虚拟用户乙 · 本地样例'},
  {id:'sample-5',name:'利息收入',category:'收入',cents:325,date:'2026-10-21 01:10',note:'活期利息 · 本地样例'}
]});
function loadData(){
  try {
    const parsed=JSON.parse(localStorage.getItem(STORE));
    if(parsed && Number.isSafeInteger(parsed.balance) && parsed.balance>=0 && Array.isArray(parsed.transactions) && parsed.transactions.every(t=>t && typeof t.id==='string' && typeof t.name==='string' && Number.isSafeInteger(t.cents) && typeof t.date==='string')) return parsed;
  } catch (_) {}
  return seed();
}
let data=loadData(), page='home', activeTab='home', history=[], hidden=data.hidden===true;
let filter='全部',month='全部月份',pending=null,transferSubmitting=false,toastTimer;
let draft={recipient:'a',amount:'',memo:''};
const recipients={a:{name:'虚拟用户甲',account:'DEMO 0001',bank:'中国银行'},b:{name:'虚拟用户乙',account:'DEMO 0002',bank:'其他银行'}};
const services=[['账户查询','card','accounts'],['转账汇款','transfer','transfer'],['信用卡','card','credit'],['存款','coins','deposit'],['贷款','loan','loan'],['理财','chart','wealth'],['基金','fund','fund'],['结汇购汇','globe','exchange'],['生活缴费','life','bills'],['更多','more','all']];
function save(){try{localStorage.setItem(STORE,JSON.stringify(data));}catch(_){toast('存储不可用，本次操作仅在当前会话保留');}}
function toast(text){clearTimeout(toastTimer);const t=document.getElementById('toast');t.textContent=text;t.classList.add('visible');toastTimer=setTimeout(()=>t.classList.remove('visible'),2300);}
function brand(){return `<div class="brand">${icon('bank')}<span>中国银行</span></div>`;}
function footer(){return `<div class="footer-note">本地数据 · 离线运行</div>`;}
function header(title){return `<header class="pageheader"><button data-action="back" aria-label="返回">${icon('back')}</button><h1>${esc(title)}</h1><span class="spacer"></span></header>`;}
function row(title,target,ico='info',right=''){return `<button class="list-row" data-go="${esc(target)}"><span class="row-icon">${icon(ico)}</span><span class="rowtext">${esc(title)}</span>${right?`<span class="right">${esc(right)}</span>`:''}${icon('arrow').replace('<svg ','<svg class="arrow" ')}</button>`;}
function eye(){return `<button class="eyebutton" data-action="eye" aria-label="${hidden?'显示':'隐藏'}余额" aria-pressed="${hidden}">${icon(hidden?'hidden':'eye')}</button>`;}
function balance(){return hidden?'••••••':currency(data.balance);}
function nav(){return `<nav class="bottomnav" aria-label="主导航">${[['home','home','首页'],['wealth','chart','财富'],['credit','card','信用卡'],['life','life','生活'],['mine','user','我的']].map(([target,ico,text])=>`<button data-tab="${target}" class="${activeTab===target?'active':''}" ${activeTab===target?'aria-current="page"':''}>${icon(ico)}<span>${text}</span></button>`).join('')}</nav>`;}
function home(){return `<header class="masthead">${brand()}<button class="searchbar" data-go="search">${icon('search')}<span>搜索服务</span></button><button class="iconbutton" data-go="messages" aria-label="消息">${icon('message')}<span class="dot"></span></button></header>
 <section class="hero"><div class="hero-art"></div><div class="hero-content"><small>中国银行 · 手机银行</small><h1>美好生活　中行相伴</h1><p>贴心服务，尽在掌握</p><button class="hero-label" data-go="all">发现更多服务 ${icon('arrow').replace('<svg ','<svg width="10" height="10" ')}</button></div><div class="pages-dots"><b>━</b> • •</div></section>
 <section class="quick">${[['scan','扫一扫','scan'],['pay','付款码','pay'],['transfer','转账汇款','transfer'],['card','我的账户','accounts']].map(([ico,label,target])=>`<button data-go="${target}">${icon(ico)}<span>${label}</span></button>`).join('')}</section>
 <section class="services">${services.map(([label,ico,target])=>`<button class="service" data-go="${target}">${icon(ico)}<span>${label}</span></button>`).join('')}</section>
 <section class="section"><div class="sectionhead"><div class="inline"><h2>我的资产</h2>${eye()}</div><button data-go="accounts">查看详情 ${icon('arrow')}</button></div><div class="asset-row"><div><p class="subtle">人民币总资产（元）</p><div class="balance">${balance()}</div></div><span class="muted">${icon('chart')}</span></div><div class="asset-actions"><button data-go="accounts">账户管理</button><button data-go="transactions">收支明细</button><button data-go="transfer">立即转账</button></div></section>
 <section class="section"><div class="sectionhead"><h2>精选服务</h2><button data-go="all">更多 ${icon('arrow')}</button></div><div class="promo-grid"><button class="promo" data-go="deposit"><h3>安心存款</h3><p>点滴积累，从容生活</p><span class="rate">${icon('coins')}</span></button><button class="promo" data-go="wealth"><h3>财富陪伴</h3><p>查看您的资产分布</p><span class="rate">${icon('chart')}</span></button></div></section>
 <section class="section"><div class="sectionhead"><h2>中行服务</h2></div><button class="feedrow" data-go="security"><span class="feed-icon">${icon('shield')}</span><div><p>守护账户安全，安心每一天</p><small>安全中心 · 了解更多</small></div></button><button class="feedrow" data-go="life"><span class="feed-icon">${icon('life')}</span><div><p>让生活更便捷</p><small>生活服务 · 常用功能</small></div></button></section>${footer()}`;}
function accounts(){return `${header('我的账户')}<div class="pagebody"><section class="account-summary"><div class="inline"><span>人民币总资产（元）</span>${eye()}</div><div class="balance">${balance()}</div><span class="pill">资产概览</span></section><section class="bankcard">${brand()}<p class="card-label">长城电子借记卡 · 虚拟账户</p><p class="cardnum">••••　••••　••••　2026</p><div class="cardbottom"><span>人民币可用余额</span><span>${balance()}</span></div><div class="cardbuttons"><button data-go="transactions">交易明细</button><button data-go="transfer">转账</button><button data-go="cardinfo">账户详情</button></div></section><p class="info-note">尾号 2026 为本地虚拟账户编号。</p><div class="list">${row('收支明细','transactions','receipt')}${row('收款人管理','recipients','user')}${row('账户详情','cardinfo','card')}</div></div>${footer()}`;}
function transfer(){return `${header('转账汇款')}<div class="pagebody"><form id="transfer-form" novalidate><div class="formblock"><div class="field"><label>付款账户</label><span>长城借记卡（2026）</span></div><div class="field"><label for="recipient">收款人</label><select id="recipient" name="recipient">${Object.entries(recipients).map(([id,r])=>`<option value="${id}" ${draft.recipient===id?'selected':''}>${r.name} · ${r.account}</option>`).join('')}</select>${icon('arrow')}</div><div class="field"><label>收款银行</label><span id="recipient-bank">${recipients[draft.recipient].bank}</span></div></div><div class="moneybox"><label for="amount">转账金额（元）</label><div class="amountinput"><span>¥</span><input id="amount" name="amount" inputmode="decimal" autocomplete="off" placeholder="0.00" value="${esc(draft.amount)}" aria-describedby="amount-hint transfer-error"></div><p class="subtle" id="amount-hint">可用余额 ${hidden?'••••••':currency(data.balance)} 元</p></div><div class="formblock"><div class="field"><label for="memo">附言</label><input id="memo" name="memo" maxlength="30" placeholder="选填，最多30字" value="${esc(draft.memo)}"></div></div><p id="transfer-error" class="formerror" role="alert"></p><button class="primary" type="submit">下一步</button></form><p class="formhint">仅支持预设虚拟收款人。此操作只更新设备中的本地余额和记录。</p><div class="list">${row('转账记录','transactions','receipt')}${row('收款人管理','recipients','user')}</div></div>`;}
function transactions(){
 const txs=data.transactions.filter(t=>(filter==='全部'||(filter==='收入'?t.cents>0:t.cents<0))&&(month==='全部月份'||t.date.startsWith(month)));
 const months=[...new Set(data.transactions.map(t=>t.date.slice(0,7)))].sort().reverse();
 let lastMonth='';
 return `${header('收支明细')}<div class="transaction-toolbar"><select id="tx-filter" aria-label="收支类型">${['全部','收入','支出'].map(f=>`<option ${f===filter?'selected':''}>${f}</option>`).join('')}</select><select id="tx-month" aria-label="交易月份">${['全部月份',...months].map(m=>`<option value="${esc(m)}" ${m===month?'selected':''}>${m==='全部月份'?m:m.replace('-','年')+'月'}</option>`).join('')}</select></div>${txs.length?txs.map(t=>{const m=t.date.slice(0,7);const title=m!==lastMonth?`<div class="monthlabel">${m.replace('-','年')}月</div>`:'';lastMonth=m;return title+`<button class="transaction" data-tx="${esc(t.id)}"><span class="circle">${icon(t.cents>0?'coins':'transfer')}</span><span class="description"><b>${esc(t.name)}</b><p>${esc(t.date)}</p></span><span class="number ${t.cents>0?'in':''}">${t.cents>0?'+':'−'}${currency(Math.abs(t.cents))}<small>${esc(t.category)}</small></span></button>`;}).join(''):'<div class="empty">暂无符合条件的记录</div>'}${footer()}`;
}
function mine(){return `<section class="profile"><span class="avatar">${icon('user')}</span><div><h2>体验用户</h2><p>欢迎使用手机银行本地界面</p><span class="pill">个人账户</span></div></section><div class="profile-metrics"><button data-go="accounts"><b>1</b>我的账户</button><button data-go="recipients"><b>2</b>我的收款人</button><button data-go="messages"><b>2</b>消息中心</button></div><div class="pagebody"><div class="list">${row('我的资产','accounts','chart')}${row('收支明细','transactions','receipt')}${row('账户安全','security','shield')}${row('消息中心','messages','message')}</div><div class="list">${row('设置','settings','settings')}${row('关于本应用','about','info')}</div></div>${footer()}`;}
function wealth(){return `<div class="tab-page-title">财富</div><section class="wealth-banner"><small>我的财富</small><h2>让每一份积累清晰可见</h2><p>了解资产，规划美好生活</p></section><section class="section"><div class="inline"><h2>总资产（元）</h2>${eye()}</div><div class="balance">${balance()}</div><p class="subtle">活期存款占比 100%</p><div class="asset-actions"><button data-go="accounts">查看账户</button><button data-go="transactions">查看收支</button></div></section><div class="pagebody"><div class="feature-card"><h3>资产分布</h3><div class="detailrow"><span>活期存款</span><span>${balance()} 元</span></div><div class="detailrow"><span>定期存款</span><span>0.00 元</span></div><div class="detailrow"><span>理财 / 基金</span><span>0.00 元</span></div></div><div class="list">${row('存款服务','deposit','coins')}${row('基金服务','fund','fund')}</div></div>${footer()}`;}
function credit(){return `<div class="tab-page-title">信用卡</div><div class="pagebody"><section class="bankcard"><h2>缤纷生活　精彩随行</h2><p class="card-label">信用卡账户</p><p class="cardnum">尚未添加信用卡</p><p class="subtle">当前本地账户仅有一张虚拟借记卡。</p></section><div class="list">${row('账单查询','credit-bill','receipt')}${row('还款服务','credit-pay','transfer')}${row('积分权益','credit-points','gift')}</div></div>${footer()}`;}
function life(){return `<div class="tab-page-title">生活</div><section class="hero"><div class="hero-art"></div><div class="hero-content"><small>生活服务</small><h1>每一天，都更便捷</h1><p>常用服务，一站直达</p></div></section><section class="services">${[['手机充值','phone','mobile'],['生活缴费','life','bills'],['出行服务','globe','travel'],['我的权益','gift','benefits'],['服务网点','bank','branches']].map(([label,ico,target])=>`<button class="service" data-go="${target}">${icon(ico)}<span>${label}</span></button>`).join('')}</section><div class="pagebody"><div class="feature-card"><h3>常用缴费</h3><p>查询已保存的本地缴费项目。</p><div class="list">${row('水电燃气','bills','life')}${row('手机充值','mobile','phone')}</div></div></div>${footer()}`;}
function all(){return `${header('全部服务')}<section class="section"><h3>账户与支付</h3></section><section class="services">${services.map(([label,ico,target])=>`<button class="service" data-go="${target==='all'?'accounts':target}">${icon(ico)}<span>${label}</span></button>`).join('')}</section><div class="pagebody"><div class="list">${row('收支明细','transactions','receipt')}${row('收款人管理','recipients','user')}${row('消息中心','messages','message')}${row('安全中心','security','shield')}</div></div>`;}
function search(){return `${header('搜索')}<div class="pagebody"><input class="searchinput" id="search-input" type="search" placeholder="搜索账户、转账、明细等服务" aria-label="搜索服务" autocomplete="off"><p class="list-label">服务列表</p><div class="searchresults" id="search-results">${searchRows('')}</div></div>`;}
function searchRows(q){const list=[...services.slice(0,-1),['收支明细','receipt','transactions'],['收款人管理','user','recipients'],['安全中心','shield','security'],['消息中心','message','messages']].filter(s=>s[0].includes(q));return list.length?list.map(([text,ico,target])=>row(text,target,ico)).join(''):'<div class="empty">未找到服务</div>';}
function settings(){return `${header('设置')}<div class="pagebody"><div class="list"><button class="list-row" data-action="eye"><span class="row-icon">${icon('eye')}</span><span class="rowtext">余额显示</span><span class="right">${hidden?'已隐藏':'已显示'}</span>${icon('arrow')}</button>${row('关于本应用','about','info')}</div><p class="list-label">本地数据</p><button class="secondary" data-action="reset">重置账户和交易记录</button><p class="info-note">重置后恢复初始虚拟余额、收款人和样例交易。</p></div>`;}
function about(){return `${header('关于本应用')}<div class="pagebody"><div class="about-title">${icon('bank')}中行本地版</div><div class="feature-card readme"><p><strong>版本</strong>　0.1.0</p><p>这是参考中国银行手机银行界面制作的个人离线原型，与中国银行无关联。</p><p>使用原生 iOS 容器加载内置页面。账户、收款人、余额和交易均为虚拟数据；没有登录、银行接口、真实转账或数据上传功能。</p><p>适配目标：iPhone 13、iOS 18.7.1。当前页面尚未与原版 App 逐页核对，不能视为完整复刻。</p><p>数据保存在本设备中，可在设置中重置。删除应用可能清除全部本地数据。</p></div></div>`;}
function recipientsPage(){return `${header('收款人管理')}<div class="pagebody">${Object.entries(recipients).map(([id,r])=>`<div class="feature-card"><div class="inline"><span class="avatar">${icon('user')}</span><div><h3>${r.name}</h3><p>${r.bank} · ${r.account}</p></div></div><button class="primary" data-recipient="${id}">向该收款人转账</button></div>`).join('')}<p class="info-note">此处为预设的虚拟收款人，不支持添加真实银行账户。</p></div>`;}
function messages(){return `${header('消息中心')}<div class="pagebody"><div class="feature-card"><h3>欢迎使用</h3><p>首页可查看资产、账户和收支信息。点击“转账汇款”可体验本地交互。</p></div><div class="feature-card"><h3>数据保存说明</h3><p>操作仅保存在当前设备。可在“我的 → 设置”中恢复初始数据。</p></div></div>`;}
function cardInfo(){return `${header('账户详情')}<div class="pagebody"><div class="feature-card"><h3>长城电子借记卡</h3>${details([['账户类型','虚拟借记卡'],['账户尾号','2026'],['币种','人民币'],['账户状态','正常'],['可用余额',balance()+' 元'],['账户持有人','体验用户']])}</div><button class="primary" data-go="transactions">查看交易明细</button></div>`;}
function details(rows){return rows.map(([k,v])=>`<div class="detailrow"><span>${esc(k)}</span><span>${esc(v)}</span></div>`).join('');}
const featureInfo={
 scan:['扫一扫','scan','此版本没有启用摄像头和二维码解析。','可直接前往转账页面，体验预设收款人的本地交互。','transfer','转账汇款'],
 pay:['付款码','pay','当前账户没有可用于支付的付款码。','你可以查看本地账户信息。','accounts','查看账户'],
 deposit:['存款','coins','当前活期存款',null,'accounts','查看账户'],
 loan:['贷款','loan','暂无贷款账户','此版本未实现贷款申请和授信流程。','accounts','查看账户'],
 fund:['基金','fund','暂无基金持仓','此版本未实现产品交易功能。','wealth','查看资产'],
 exchange:['结汇购汇','globe','暂无外币账户','此版本未实现外汇牌价和结售汇交易。','accounts','查看账户'],
 bills:['生活缴费','life','暂无已保存的缴费项目','此版本未实现真实账单查询和缴费。','life','返回生活'],
 mobile:['手机充值','phone','暂无充值记录','此版本未实现手机号码查询或真实充值。','life','返回生活'],
 travel:['出行服务','globe','暂无出行订单','此版本未实现出行预订功能。','life','返回生活'],
 benefits:['我的权益','gift','暂无可用权益','此版本没有可领取或核销的真实权益。','mine','返回我的'],
 branches:['服务网点','bank','暂无离线网点数据','此版本未接入定位和在线网点查询。','life','返回生活'],
 'credit-bill':['信用卡账单','receipt','暂无信用卡账单','当前账户没有信用卡。','credit','返回信用卡'],
 'credit-pay':['信用卡还款','card','暂无待还款账单','当前账户没有信用卡。','credit','返回信用卡'],
 'credit-points':['积分权益','gift','暂无积分权益','当前账户没有信用卡。','credit','返回信用卡'],
 security:['安全中心','shield','本地运行，数据留在设备','应用没有真实银行登录、密码采集或网络请求。','settings','查看设置']
};
function feature(id){const [title,ico,heading,description,target,button]=featureInfo[id];return `${header(title)}<div class="pagebody"><div class="feature-card"><div class="status-icon">${icon(ico)}</div><div class="result-head"><h2>${heading}</h2><p>${id==='deposit'?'人民币 '+balance()+' 元':description||''}</p></div><button class="primary" data-go="${target}">${button}</button></div></div>`;}
function result(){const t=data.transactions.find(t=>t.id===pending?.id);if(!t)return accounts();return `${header('操作结果')}<div class="pagebody"><div class="result-head"><div class="status-icon">${icon('check')}</div><h2>本地余额已更新</h2><p>未发生真实银行交易</p><div class="balance">¥ ${currency(-t.cents)}</div></div><div class="feature-card">${details([['收款人',pending.name],['虚拟账户',pending.account],['付款账户','长城借记卡（2026）'],['操作时间',t.date],['附言',t.memo||'无']])}</div><div class="result-actions"><button class="primary" data-tab="home">完成</button><button class="secondary" data-go="transactions">查看收支明细</button></div></div>`;}
function render(){
 const views={home,accounts,transfer,transactions,mine,wealth,credit,life,all,search,settings,about,recipients:recipientsPage,messages,cardinfo:cardInfo,result};
 const body=views[page]?views[page]():featureInfo[page]?feature(page):home();
 document.getElementById('app').innerHTML=`<main class="shell">${body}</main>${nav()}`;
 document.title=(page==='home'?'中国银行':({accounts:'我的账户',transactions:'收支明细',transfer:'转账汇款',mine:'我的'}[page]||'中行本地版'));
}
function go(target,tab=false){
 closeSheet();
 if(tab){history=[];activeTab=target;}else if(target!==page){history.push({page,activeTab,scroll:window.scrollY});}
 page=target;render();window.scrollTo(0,0);
}
function back(){closeSheet();const previous=history.pop();if(previous){page=previous.page;activeTab=previous.activeTab;render();window.scrollTo(0,previous.scroll);}else{go('home',true);}}
let focusBeforeSheet=null;
function sheet(content){focusBeforeSheet=document.activeElement;document.getElementById('overlay').innerHTML=`<div class="scrim"><section class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" tabindex="-1"><div class="sheet-handle"></div>${content}</section></div>`;document.body.classList.add('no-scroll');document.querySelector('.sheet').focus();}
function closeSheet(){document.getElementById('overlay').innerHTML='';document.body.classList.remove('no-scroll');focusBeforeSheet?.focus?.();focusBeforeSheet=null;}
function amountInCents(value){const text=String(value).trim();if(!/^\d{1,8}(\.\d{1,2})?$/.test(text))return null;const [whole,decimal='']=text.split('.');const n=Number(whole)*100+Number(decimal.padEnd(2,'0'));return Number.isSafeInteger(n)&&n>0?n:null;}
function confirmTransfer(form){
 const error=document.getElementById('transfer-error');
 draft={recipient:form.recipient.value,amount:form.amount.value,memo:form.memo.value.trim()};
 const cents=amountInCents(draft.amount);
 if(cents===null){error.textContent='请输入大于 0 的金额，最多保留两位小数';return;}
 if(cents>data.balance){error.textContent='转账金额超过当前可用余额';return;}
 if(!recipients[draft.recipient]){error.textContent='请选择预设的虚拟收款人';return;}
 error.textContent='';const r=recipients[draft.recipient];
 pending={...r,cents,memo:draft.memo};
 sheet(`<h2 id="sheet-title">确认转账信息</h2><p>请核对本次本地操作。</p><div class="large-money">¥ ${currency(cents)}</div>${details([['收款人',r.name],['虚拟账户',r.account],['收款银行',r.bank],['附言',draft.memo||'无']])}<button class="primary" data-action="confirm-transfer">确认</button><button class="secondary" data-action="close-sheet">返回修改</button>`);
}
function commitTransfer(){
 if(transferSubmitting||!pending||pending.id)return;
 if(pending.cents>data.balance){closeSheet();toast('余额不足，请修改金额');return;}
 transferSubmitting=true;
 const d=new Date(),pad=n=>String(n).padStart(2,'0');
 const date=`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
 const id='local-'+Date.now()+'-'+Math.random().toString(16).slice(2,8);
 data.balance-=pending.cents;
 data.transactions.unshift({id,name:'转账至'+pending.name,category:'转账',cents:-pending.cents,date,note:pending.account,memo:pending.memo});
 pending.id=id;save();draft={recipient:'a',amount:'',memo:''};filter='全部';month='全部月份';
 closeSheet();go('result');transferSubmitting=false;
}
document.addEventListener('submit',event=>{if(event.target.id==='transfer-form'){event.preventDefault();confirmTransfer(event.target);}});
document.addEventListener('input',event=>{
 if(event.target.id==='search-input')document.getElementById('search-results').innerHTML=searchRows(event.target.value.trim());
 if(event.target.closest('#transfer-form')){const form=document.getElementById('transfer-form');draft={recipient:form.recipient.value,amount:form.amount.value,memo:form.memo.value};}
});
document.addEventListener('change',event=>{
 if(event.target.id==='recipient')document.getElementById('recipient-bank').textContent=recipients[event.target.value].bank;
 if(event.target.id==='tx-filter'){filter=event.target.value;render();}
 if(event.target.id==='tx-month'){month=event.target.value;render();}
});
document.addEventListener('click',event=>{
 if(event.target.classList.contains('scrim')){closeSheet();return;}
 const el=event.target.closest('button');if(!el)return;
 if(el.dataset.tab){go(el.dataset.tab,true);return;}
 if(el.dataset.go){go(el.dataset.go);return;}
 if(el.dataset.recipient){draft.recipient=el.dataset.recipient;go('transfer');return;}
 if(el.dataset.tx){const t=data.transactions.find(t=>t.id===el.dataset.tx);if(t)sheet(`<h2 id="sheet-title">收支详情</h2><div class="large-money">${t.cents>0?'+':'−'}${currency(Math.abs(t.cents))}</div>${details([['摘要',t.name],['分类',t.category],['时间',t.date],['说明',t.note||'本地记录'],['附言',t.memo||'无']])}<button class="primary" data-action="close-sheet">关闭</button>`);return;}
 switch(el.dataset.action){
  case 'back':back();break;
  case 'eye':hidden=!hidden;data.hidden=hidden;save();{const scroll=window.scrollY;render();window.scrollTo(0,scroll);}break;
  case 'close-sheet':closeSheet();break;
  case 'confirm-transfer':commitTransfer();break;
  case 'reset':sheet('<h2 id="sheet-title">重置本地数据？</h2><p>这将清除本地新增的记录，并恢复初始虚拟余额。此操作无法撤销。</p><button class="primary" data-action="confirm-reset">重置</button><button class="secondary" data-action="close-sheet">取消</button>');break;
  case 'confirm-reset':data=seed();hidden=false;pending=null;draft={recipient:'a',amount:'',memo:''};filter='全部';month='全部月份';save();closeSheet();render();toast('本地数据已重置');break;
 }
});
document.addEventListener('keydown',event=>{
 const dialog=document.querySelector('.sheet');if(!dialog)return;
 if(event.key==='Escape'){closeSheet();return;}
 if(event.key==='Tab'){
  const controls=[...dialog.querySelectorAll('button,input,select,[tabindex="0"]')];
  if(!controls.length){event.preventDefault();return;}
  const first=controls[0],last=controls.at(-1);
  if(event.shiftKey&&(document.activeElement===first||document.activeElement===dialog)){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&(document.activeElement===last||document.activeElement===dialog)){event.preventDefault();first.focus();}
 }
});
render();
