function init3d(){
const O={f:[['سيراميك بيج','#d9cdb8',450],['بورسلين رخامي','#e8e6e1',750],['باركيه خشب','#9c6b3f',900],['رخام','#cfc3a8',1600],['جرانيت أسود','#2b2b2e',1400]],w:[['دهان أبيض','#f4f2ee',120],['دهان بيج','#d8c8a8',120],['دهان رمادي','#8e9196',120],['أخضر زيتي','#6b7a5a',130],['ورق حائط ذهبي','#c9a84a',250],['حجر هاشمي','#c8b48a',700]],c:[['دهان أبيض','#ffffff',100],['جيبسوم بورد','#f0ece4',350],['خشب','#a9794a',600]]},N={f:'الأرضية',w:'الحوائط',c:'السقف'};
$('#d3').innerHTML=`<div class=row>${Object.keys(O).map(k=>`<div><label>${N[k]}</label><select id=s${k}>${O[k].map((o,i)=>`<option value=${i}>${o[0]} - ${o[2]} ج/م²</option>`).join('')}</select></div>`).join('')}<div><label>الطول (م)</label><input id=sl type=number value=6 min=2 max=20></div><div><label>العرض (م)</label><input id=sw type=number value=5 min=2 max=20></div></div><p style="text-align:center;color:#999">اسحب بإصبعك أو الماوس للتجول داخل الغرفة</p><div id=cv style="height:min(65vh,460px);border-radius:16px;overflow:hidden;margin:12px 0;touch-action:none;cursor:grab"></div><div class=card id=est></div>`;
const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';s.onload=go;document.head.append(s);
function go(){const w=$('#cv'),H=w.clientHeight,R=new THREE.WebGLRenderer({antialias:true});R.setSize(w.clientWidth,H);R.setPixelRatio(Math.min(devicePixelRatio,2));w.append(R.domElement);
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(75,w.clientWidth/H,.1,60);sc.background=new THREE.Color('#0b0b0d');cam.position.set(0,1.6,0);cam.rotation.order='YXZ';
sc.add(new THREE.AmbientLight('#fff',.85));const pl=new THREE.PointLight('#fff',.5);pl.position.set(0,2.7,0);sc.add(pl);
const mk=()=>new THREE.MeshLambertMaterial({side:THREE.BackSide}),m=[0,1,2,3,4,5].map(mk),room=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),m);sc.add(room);
const bx=(c,x,y,z)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(x,y,z),new THREE.MeshLambertMaterial({color:c}));sc.add(b);return b},sofa=bx('#3b3b44',1,.8,2.4),tab=bx('#6b4a2b',1.2,.45,.8),rug=bx('#7a1f2b',2.6,.02,2);
function up(){const L=Math.max(2,+$('#sl').value||6),W=Math.max(2,+$('#sw').value||5),Hh=3,g=k=>O[k][$('#s'+k).value];
room.scale.set(L,Hh,W);room.position.y=Hh/2;[0,1,4,5].forEach(i=>m[i].color.set(g('w')[1]));m[2].color.set(g('c')[1]);m[3].color.set(g('f')[1]);
sofa.position.set(-L/2+.7,.4,0);tab.position.set(0,.22,0);rug.position.set(0,.02,0);
const a=L*W,wa=2*(L+W)*Hh-4,t=a*g('f')[2]+wa*g('w')[2]+a*g('c')[2];
$('#est').innerHTML=`<h3>تقدير تكلفة الخامات (استرشادي)</h3><p>أرضية ${a} م² • حوائط ${wa} م² • سقف ${a} م²</p><h3>${Math.round(t).toLocaleString('ar-EG')} ج.م</h3><a class=btn target=_blank href="https://wa.me/${D.wa}?text=${encodeURIComponent('أريد عرض سعر لتصميم: أرضية '+g('f')[0]+' / حوائط '+g('w')[0]+' / سقف '+g('c')[0]+' - مساحة '+a+' م²')}">اطلب عرض سعر عبر واتساب</a>`}
let yaw=0,pit=0,d=0,px,py;const cv=R.domElement;cv.onpointerdown=e=>{d=1;px=e.clientX;py=e.clientY};addEventListener('pointerup',()=>d=0);cv.onpointermove=e=>{if(!d)return;yaw+=(e.clientX-px)*.005;pit=Math.max(-1,Math.min(1,pit+(e.clientY-py)*.005));px=e.clientX;py=e.clientY};
document.querySelectorAll('#d3 select,#d3 input').forEach(e=>e.oninput=up);up();
(function L(){cam.rotation.set(pit,yaw,0);R.render(sc,cam);requestAnimationFrame(L)})()}}
