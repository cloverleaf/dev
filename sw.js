(()=>{"use strict";try{self["workbox:core:6.4.0"]&&_()}catch{}var he=(t,...e)=>{let r=t;return e.length>0&&(r+=` :: ${JSON.stringify(e)}`),r};var X=he;var u=class extends Error{constructor(e,r){let o=X(e,r);super(o);this.name=e,this.details=r}};"use strict";try{self["workbox:routing:6.4.0"]&&_()}catch{}var v="GET";var w=t=>t&&typeof t=="object"?t:{handle:t};var d=class{constructor(e,r,o=v){this.handler=w(r),this.match=e,this.method=o}setCatchHandler(e){this.catchHandler=w(e)}};var k=class extends d{constructor(e,r,o){let s=({url:n})=>{let a=e.exec(n.href);if(!!a&&!(n.origin!==location.origin&&a.index!==0))return a.slice(1)};super(s,r,o)}};var W=t=>new URL(String(t),location.href).href.replace(new RegExp(`^${location.origin}`),"");var R=class{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{let{request:r}=e,o=this.handleRequest({request:r,event:e});o&&e.respondWith(o)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){let{payload:r}=e.data,o=Promise.all(r.urlsToCache.map(s=>{typeof s=="string"&&(s=[s]);let n=new Request(...s);return this.handleRequest({request:n,event:e})}));e.waitUntil(o),e.ports&&e.ports[0]&&o.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:r}){let o=new URL(e.url,location.href);if(!o.protocol.startsWith("http"))return;let s=o.origin===location.origin,{params:n,route:a}=this.findMatchingRoute({event:r,request:e,sameOrigin:s,url:o}),i=a&&a.handler,c=[],l=e.method;if(!i&&this._defaultHandlerMap.has(l)&&(i=this._defaultHandlerMap.get(l)),!i)return;let f;try{f=i.handle({url:o,request:e,event:r,params:n})}catch(x){f=Promise.reject(x)}let h=a&&a.catchHandler;return f instanceof Promise&&(this._catchHandler||h)&&(f=f.catch(async x=>{if(h)try{return await h.handle({url:o,request:e,event:r,params:n})}catch(z){z instanceof Error&&(x=z)}if(this._catchHandler)return this._catchHandler.handle({url:o,request:e,event:r});throw x})),f}findMatchingRoute({url:e,sameOrigin:r,request:o,event:s}){let n=this._routes.get(o.method)||[];for(let a of n){let i,c=a.match({url:e,sameOrigin:r,request:o,event:s});if(c)return i=c,(Array.isArray(i)&&i.length===0||c.constructor===Object&&Object.keys(c).length===0||typeof c=="boolean")&&(i=void 0),{route:a,params:i}}return{}}setDefaultHandler(e,r=v){this._defaultHandlerMap.set(r,w(e))}setCatchHandler(e){this._catchHandler=w(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new u("unregister-route-but-not-found-with-method",{method:e.method});let r=this._routes.get(e.method).indexOf(e);if(r>-1)this._routes.get(e.method).splice(r,1);else throw new u("unregister-route-route-not-registered")}};var E,j=()=>(E||(E=new R,E.addFetchListener(),E.addCacheListener()),E);function N(t,e,r){let o;if(typeof t=="string"){let n=new URL(t,location.href),a=({url:i})=>i.href===n.href;o=new d(a,e,r)}else if(t instanceof RegExp)o=new k(t,e,r);else if(typeof t=="function")o=new d(t,e,r);else if(t instanceof d)o=t;else throw new u("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return j().registerRoute(o),o}var g={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration!="undefined"?registration.scope:""},M=t=>[g.prefix,t,g.suffix].filter(e=>e&&e.length>0).join("-"),me=t=>{for(let e of Object.keys(g))t(e)},D={updateDetails:t=>{me(e=>{typeof t[e]=="string"&&(g[e]=t[e])})},getGoogleAnalyticsName:t=>t||M(g.googleAnalytics),getPrecacheName:t=>t||M(g.precache),getPrefix:()=>g.prefix,getRuntimeName:t=>t||M(g.runtime),getSuffix:()=>g.suffix};function Z(t,e){let r=new URL(t);for(let o of e)r.searchParams.delete(o);return r.href}async function ee(t,e,r,o){let s=Z(e.url,r);if(e.url===s)return t.match(e,o);let n=Object.assign(Object.assign({},o),{ignoreSearch:!0}),a=await t.keys(e,n);for(let i of a){let c=Z(i.url,r);if(s===c)return t.match(i,o)}}var I=class{constructor(){this.promise=new Promise((e,r)=>{this.resolve=e,this.reject=r})}};var C=new Set;async function re(){for(let t of C)await t()}function H(t){return new Promise(e=>setTimeout(e,t))}"use strict";try{self["workbox:strategies:6.4.0"]&&_()}catch{}function O(t){return typeof t=="string"?new Request(t):t}var $=class{constructor(e,r){this._cacheKeys={},Object.assign(this,r),this.event=r.event,this._strategy=e,this._handlerDeferred=new I,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(let o of this._plugins)this._pluginStateMap.set(o,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){let{event:r}=this,o=O(e);if(o.mode==="navigate"&&r instanceof FetchEvent&&r.preloadResponse){let a=await r.preloadResponse;if(a)return a}let s=this.hasCallback("fetchDidFail")?o.clone():null;try{for(let a of this.iterateCallbacks("requestWillFetch"))o=await a({request:o.clone(),event:r})}catch(a){if(a instanceof Error)throw new u("plugin-error-request-will-fetch",{thrownErrorMessage:a.message})}let n=o.clone();try{let a;a=await fetch(o,o.mode==="navigate"?void 0:this._strategy.fetchOptions);for(let i of this.iterateCallbacks("fetchDidSucceed"))a=await i({event:r,request:n,response:a});return a}catch(a){throw s&&await this.runCallbacks("fetchDidFail",{error:a,event:r,originalRequest:s.clone(),request:n.clone()}),a}}async fetchAndCachePut(e){let r=await this.fetch(e),o=r.clone();return this.waitUntil(this.cachePut(e,o)),r}async cacheMatch(e){let r=O(e),o,{cacheName:s,matchOptions:n}=this._strategy,a=await this.getCacheKey(r,"read"),i=Object.assign(Object.assign({},n),{cacheName:s});o=await caches.match(a,i);for(let c of this.iterateCallbacks("cachedResponseWillBeUsed"))o=await c({cacheName:s,matchOptions:n,cachedResponse:o,request:a,event:this.event})||void 0;return o}async cachePut(e,r){let o=O(e);await H(0);let s=await this.getCacheKey(o,"write");if(!r)throw new u("cache-put-with-no-response",{url:W(s.url)});let n=await this._ensureResponseSafeToCache(r);if(!n)return!1;let{cacheName:a,matchOptions:i}=this._strategy,c=await self.caches.open(a),l=this.hasCallback("cacheDidUpdate"),f=l?await ee(c,s.clone(),["__WB_REVISION__"],i):null;try{await c.put(s,l?n.clone():n)}catch(h){if(h instanceof Error)throw h.name==="QuotaExceededError"&&await re(),h}for(let h of this.iterateCallbacks("cacheDidUpdate"))await h({cacheName:a,oldResponse:f,newResponse:n.clone(),request:s,event:this.event});return!0}async getCacheKey(e,r){let o=`${e.url} | ${r}`;if(!this._cacheKeys[o]){let s=e;for(let n of this.iterateCallbacks("cacheKeyWillBeUsed"))s=O(await n({mode:r,request:s,event:this.event,params:this.params}));this._cacheKeys[o]=s}return this._cacheKeys[o]}hasCallback(e){for(let r of this._strategy.plugins)if(e in r)return!0;return!1}async runCallbacks(e,r){for(let o of this.iterateCallbacks(e))await o(r)}*iterateCallbacks(e){for(let r of this._strategy.plugins)if(typeof r[e]=="function"){let o=this._pluginStateMap.get(r);yield n=>{let a=Object.assign(Object.assign({},n),{state:o});return r[e](a)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let r=e,o=!1;for(let s of this.iterateCallbacks("cacheWillUpdate"))if(r=await s({request:this.request,response:r,event:this.event})||void 0,o=!0,!r)break;return o||r&&r.status!==200&&(r=void 0),r}};var m=class{constructor(e={}){this.cacheName=D.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){let[r]=this.handleAll(e);return r}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});let r=e.event,o=typeof e.request=="string"?new Request(e.request):e.request,s="params"in e?e.params:void 0,n=new $(this,{event:r,request:o,params:s}),a=this._getResponse(n,o,r),i=this._awaitComplete(a,n,o,r);return[a,i]}async _getResponse(e,r,o){await e.runCallbacks("handlerWillStart",{event:o,request:r});let s;try{if(s=await this._handle(r,e),!s||s.type==="error")throw new u("no-response",{url:r.url})}catch(n){if(n instanceof Error){for(let a of e.iterateCallbacks("handlerDidError"))if(s=await a({error:n,event:o,request:r}),s)break}if(!s)throw n}for(let n of e.iterateCallbacks("handlerWillRespond"))s=await n({event:o,request:r,response:s});return s}async _awaitComplete(e,r,o,s){let n,a;try{n=await e}catch{}try{await r.runCallbacks("handlerDidRespond",{event:s,request:o,response:n}),await r.doneWaiting()}catch(i){i instanceof Error&&(a=i)}if(await r.runCallbacks("handlerDidComplete",{event:s,request:o,response:n,error:a}),r.destroy(),a)throw a}};var T=class extends m{async _handle(e,r){let o=[],s=await r.cacheMatch(e),n;if(!s)try{s=await r.fetchAndCachePut(e)}catch(a){a instanceof Error&&(n=a)}if(!s)throw new u("no-response",{url:e.url,error:n});return s}};var S={cacheWillUpdate:async({response:t})=>t.status===200||t.status===0?t:null};var U=class extends m{constructor(e={}){super(e);this.plugins.some(r=>"cacheWillUpdate"in r)||this.plugins.unshift(S),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,r){let o=[],s=[],n;if(this._networkTimeoutSeconds){let{id:c,promise:l}=this._getTimeoutPromise({request:e,logs:o,handler:r});n=c,s.push(l)}let a=this._getNetworkPromise({timeoutId:n,request:e,logs:o,handler:r});s.push(a);let i=await r.waitUntil((async()=>await r.waitUntil(Promise.race(s))||await a)());if(!i)throw new u("no-response",{url:e.url});return i}_getTimeoutPromise({request:e,logs:r,handler:o}){let s;return{promise:new Promise(a=>{s=setTimeout(async()=>{a(await o.cacheMatch(e))},this._networkTimeoutSeconds*1e3)}),id:s}}async _getNetworkPromise({timeoutId:e,request:r,logs:o,handler:s}){let n,a;try{a=await s.fetchAndCachePut(r)}catch(i){i instanceof Error&&(n=i)}return e&&clearTimeout(e),(n||!a)&&(a=await s.cacheMatch(r)),a}};var q=class extends m{constructor(e={}){super(e);this.plugins.some(r=>"cacheWillUpdate"in r)||this.plugins.unshift(S)}async _handle(e,r){let o=[],s=r.fetchAndCachePut(e).catch(()=>{}),n=await r.cacheMatch(e),a;if(!n)try{n=await s}catch(i){i instanceof Error&&(a=i)}if(!n)throw new u("no-response",{url:e.url,error:a});return n}};"use strict";try{self["workbox:cacheable-response:6.4.0"]&&_()}catch{}var L=class{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let r=!0;return this._statuses&&(r=this._statuses.includes(e.status)),this._headers&&r&&(r=Object.keys(this._headers).some(o=>e.headers.get(o)===this._headers[o])),r}};var b=class{constructor(e){this.cacheWillUpdate=async({response:r})=>this._cacheableResponse.isResponseCacheable(r)?r:null,this._cacheableResponse=new L(e)}};function P(t){t.then(()=>{})}var de=(t,e)=>e.some(r=>t instanceof r),te,oe;function ge(){return te||(te=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function fe(){return oe||(oe=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var se=new WeakMap,B=new WeakMap,ae=new WeakMap,G=new WeakMap,K=new WeakMap;function we(t){let e=new Promise((r,o)=>{let s=()=>{t.removeEventListener("success",n),t.removeEventListener("error",a)},n=()=>{r(p(t.result)),s()},a=()=>{o(t.error),s()};t.addEventListener("success",n),t.addEventListener("error",a)});return e.then(r=>{r instanceof IDBCursor&&se.set(r,t)}).catch(()=>{}),K.set(e,t),e}function be(t){if(B.has(t))return;let e=new Promise((r,o)=>{let s=()=>{t.removeEventListener("complete",n),t.removeEventListener("error",a),t.removeEventListener("abort",a)},n=()=>{r(),s()},a=()=>{o(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",n),t.addEventListener("error",a),t.addEventListener("abort",a)});B.set(t,e)}var J={get(t,e,r){if(t instanceof IDBTransaction){if(e==="done")return B.get(t);if(e==="objectStoreNames")return t.objectStoreNames||ae.get(t);if(e==="store")return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return p(t[e])},set(t,e,r){return t[e]=r,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function ne(t){J=t(J)}function xe(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...r){let o=t.call(V(this),e,...r);return ae.set(o,e.sort?e.sort():[e]),p(o)}:fe().includes(t)?function(...e){return t.apply(V(this),e),p(se.get(this))}:function(...e){return p(t.apply(V(this),e))}}function Ee(t){return typeof t=="function"?xe(t):(t instanceof IDBTransaction&&be(t),de(t,ge())?new Proxy(t,J):t)}function p(t){if(t instanceof IDBRequest)return we(t);if(G.has(t))return G.get(t);let e=Ee(t);return e!==t&&(G.set(t,e),K.set(e,t)),e}var V=t=>K.get(t);function ie(t,e,{blocked:r,upgrade:o,blocking:s,terminated:n}={}){let a=indexedDB.open(t,e),i=p(a);return o&&a.addEventListener("upgradeneeded",c=>{o(p(a.result),c.oldVersion,c.newVersion,p(a.transaction))}),r&&a.addEventListener("blocked",()=>r()),i.then(c=>{n&&c.addEventListener("close",()=>n()),s&&c.addEventListener("versionchange",()=>s())}).catch(()=>{}),i}function ce(t,{blocked:e}={}){let r=indexedDB.deleteDatabase(t);return e&&r.addEventListener("blocked",()=>e()),p(r).then(()=>{})}var Ne=["get","getKey","getAll","getAllKeys","count"],_e=["put","add","delete","clear"],Q=new Map;function ue(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Q.get(e))return Q.get(e);let r=e.replace(/FromIndex$/,""),o=e!==r,s=_e.includes(r);if(!(r in(o?IDBIndex:IDBObjectStore).prototype)||!(s||Ne.includes(r)))return;let n=async function(a,...i){let c=this.transaction(a,s?"readwrite":"readonly"),l=c.store;return o&&(l=l.index(i.shift())),(await Promise.all([l[r](...i),s&&c.done]))[0]};return Q.set(e,n),n}ne(t=>({...t,get:(e,r,o)=>ue(e,r)||t.get(e,r,o),has:(e,r)=>!!ue(e,r)||t.has(e,r)}));"use strict";try{self["workbox:expiration:6.4.0"]&&_()}catch{}var ye="workbox-expiration",y="cache-entries",le=t=>{let e=new URL(t,location.href);return e.hash="",e.href},Y=class{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){let r=e.createObjectStore(y,{keyPath:"id"});r.createIndex("cacheName","cacheName",{unique:!1}),r.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&ce(this._cacheName)}async setTimestamp(e,r){e=le(e);let o={url:e,timestamp:r,cacheName:this._cacheName,id:this._getId(e)},n=(await this.getDb()).transaction(y,"readwrite",{durability:"relaxed"});await n.store.put(o),await n.done}async getTimestamp(e){let o=await(await this.getDb()).get(y,this._getId(e));return o==null?void 0:o.timestamp}async expireEntries(e,r){let o=await this.getDb(),s=await o.transaction(y).store.index("timestamp").openCursor(null,"prev"),n=[],a=0;for(;s;){let c=s.value;c.cacheName===this._cacheName&&(e&&c.timestamp<e||r&&a>=r?n.push(s.value):a++),s=await s.continue()}let i=[];for(let c of n)await o.delete(y,c.id),i.push(c.url);return i}_getId(e){return this._cacheName+"|"+le(e)}async getDb(){return this._db||(this._db=await ie(ye,1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}};var A=class{constructor(e,r={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=r.maxEntries,this._maxAgeSeconds=r.maxAgeSeconds,this._matchOptions=r.matchOptions,this._cacheName=e,this._timestampModel=new Y(e)}async expireEntries(){if(this._isRunning){this._rerunRequested=!0;return}this._isRunning=!0;let e=this._maxAgeSeconds?Date.now()-this._maxAgeSeconds*1e3:0,r=await this._timestampModel.expireEntries(e,this._maxEntries),o=await self.caches.open(this._cacheName);for(let s of r)await o.delete(s,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,P(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){let r=await this._timestampModel.getTimestamp(e),o=Date.now()-this._maxAgeSeconds*1e3;return r!==void 0?r<o:!0}else return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}};function pe(t){C.add(t)}var F=class{constructor(e={}){this.cachedResponseWillBeUsed=async({event:r,request:o,cacheName:s,cachedResponse:n})=>{if(!n)return null;let a=this._isResponseDateFresh(n),i=this._getCacheExpiration(s);P(i.expireEntries());let c=i.updateTimestamp(o.url);if(r)try{r.waitUntil(c)}catch{}return a?n:null},this.cacheDidUpdate=async({cacheName:r,request:o})=>{let s=this._getCacheExpiration(r);await s.updateTimestamp(o.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&pe(()=>this.deleteCacheAndMetadata())}_getCacheExpiration(e){if(e===D.getRuntimeName())throw new u("expire-custom-caches-only");let r=this._cacheExpirations.get(e);return r||(r=new A(e,this._config),this._cacheExpirations.set(e,r)),r}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;let r=this._getDateHeaderTimestamp(e);if(r===null)return!0;let o=Date.now();return r>=o-this._maxAgeSeconds*1e3}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;let r=e.headers.get("date"),s=new Date(r).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(let[e,r]of this._cacheExpirations)await self.caches.delete(e),await r.delete();this._cacheExpirations=new Map}};N(({request:t})=>t.mode==="navigate",new U({cacheName:"pages",plugins:[new b({statuses:[200]})]}));N(({request:t})=>t.destination==="style"||t.destination==="script"||t.destination==="worker",new q({cacheName:"assets",plugins:[new b({statuses:[200]})]}));N(({request:t})=>t.destination==="image",new T({cacheName:"images",plugins:[new b({statuses:[200]}),new F({maxAgeSeconds:60*60*24*30})]}));self.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),window.installPromptEvent=t});})();
//# sourceMappingURL=sw.js.map
