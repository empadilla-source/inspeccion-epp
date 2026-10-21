const V='epp-v3',F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./trabajador.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const red=new Promise((_,rej)=>setTimeout(rej,3000));
  e.respondWith(Promise.race([fetch(e.request),red]).then(n=>{const c=n.clone();caches.open(V).then(ch=>ch.put(e.request,c));return n}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));
});
