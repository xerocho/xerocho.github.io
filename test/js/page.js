(function(){'use strict';function a(a){const b=B.createContextualFragment(a);return b.children[0]}function b(a){return(a+'').replace(/[&<>"'\/]/g,(a)=>C[a])}function c(a,...c){return c=c.map((a)=>b(a)),a.reduce((a,b,d)=>a+=b+(c[d]||''),'')}function d(a){return new Response(a).text()}function e({removeClass:a=!1}={}){return function(b,c='active',d='transition'){if(a){if(!b.classList.contains(c))return Promise.resolve();}else if(b.classList.contains(c))return Promise.resolve();return new Promise((e)=>{const f=(a)=>{a.target!=b||(b.removeEventListener('webkitTransitionEnd',f),b.removeEventListener('transitionend',f),b.classList.remove(d),e())};b.classList.add(d),requestAnimationFrame(()=>{b.addEventListener('webkitTransitionEnd',f),b.addEventListener('transitionend',f),b.classList[a?'remove':'add'](c)})})}}function f(a){return{x:a.pageX,y:a.pageY}}function g(a,b){var c=Math.abs;const d=c(b.x-a.x),e=c(b.y-a.y);return Math.sqrt(d*d+e*e)}function h(a,b){return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}}function i(a){return a.touches?Array.from(a.touches).map((a)=>f(a)):[f(a)]}function j(a,b){const c=Math.pow(10,b);return Math.floor(Math.round(a*c))/c}function k(a){return 1024>a?a+' bytes':j(a/1024,2)+'k'}function l(){}function m(){m.init.call(this)}function n(a){return void 0===a._maxListeners?m.defaultMaxListeners:a._maxListeners}function o(a,b,c){if(b)a.call(c);else for(var d=a.length,e=y(a,d),f=0;f<d;++f)e[f].call(c)}function p(a,b,c,d){if(b)a.call(c,d);else for(var e=a.length,f=y(a,e),g=0;g<e;++g)f[g].call(c,d)}function q(a,b,c,d,e){if(b)a.call(c,d,e);else for(var f=a.length,g=y(a,f),h=0;h<f;++h)g[h].call(c,d,e)}function r(a,b,c,d,e,f){if(b)a.call(c,d,e,f);else for(var g=a.length,h=y(a,g),j=0;j<g;++j)h[j].call(c,d,e,f)}function s(a,b,c,d){if(b)a.apply(c,d);else for(var e=a.length,f=y(a,e),g=0;g<e;++g)f[g].apply(c,d)}function t(a,b,c,d){var e,f,g;if('function'!=typeof c)throw new TypeError('"listener" argument must be a function');if(f=a._events,f?(f.newListener&&(a.emit('newListener',b,c.listener?c.listener:c),f=a._events),g=f[b]):(f=a._events=new l,a._eventsCount=0),!g)g=f[b]=c,++a._eventsCount;else if('function'==typeof g?g=f[b]=d?[c,g]:[g,c]:d?g.unshift(c):g.push(c),!g.warned&&(e=n(a),e&&0<e&&g.length>e)){g.warned=!0;var h=new Error('Possible EventEmitter memory leak detected. '+g.length+' '+b+' listeners added. Use emitter.setMaxListeners() to increase limit');h.name='MaxListenersExceededWarning',h.emitter=a,h.type=b,h.count=g.length,u(h)}return a}function u(a){'function'==typeof console.warn?console.warn(a):console.log(a)}function v(a,b,c){function d(){a.removeListener(b,d),e||(e=!0,c.apply(a,arguments))}var e=!1;return d.listener=c,d}function w(a){var b=this._events;if(b){var c=b[a];if('function'==typeof c)return 1;if(c)return c.length}return 0}function x(a,b){for(var c=b,d=c+1,e=a.length;d<e;c+=1,d+=1)a[c]=a[d];a.pop()}function y(a,b){for(var c=Array(b);b--;)c[b]=a[b];return c}function z(a){for(var b=Array(a.length),c=0;c<b.length;++c)b[c]=a[c].listener||a[c];return b}const A=new Promise((a)=>{function b(){'loading'!=document.readyState&&a()}document.addEventListener('readystatechange',b),b()}),B=document.createRange();B.selectNode(document.documentElement);const C={"&":'&amp;',"<":'&lt;',">":'&gt;','"':'&quot;',"'":'&#39;',"/":'&#x2F;'},D=e(),E=e({removeClass:!0});let F=(()=>{function a(){return c||(c=new Promise((a,b)=>{const c=indexedDB.open('svgo-keyval',1);c.onerror=()=>{b(c.error)},c.onupgradeneeded=()=>{c.result.createObjectStore('keyval')},c.onsuccess=()=>{a(c.result)}})),c}async function b(b,c){const d=await a();return new Promise((a,e)=>{const f=d.transaction('keyval',b);f.oncomplete=()=>a(),f.onerror=()=>e(f.error),c(f.objectStore('keyval'))})}let c;return{async get(a){let c;return await b('readonly',(b)=>{c=b.get(a)}),c.result},set(a,c){return b('readwrite',(b)=>{b.put(c,a)})},delete(a){return b('readwrite',(b)=>{b.delete(a)})}}})();self.indexedDB||(F={get:(a)=>Promise.resolve(localStorage.getItem(a)),set:(a,b)=>Promise.resolve(localStorage.setItem(a,b)),delete:(a)=>Promise.resolve(localStorage.removeItem(a))}),'use strict';class G{constructor(a){this._requestId=0,this._pending={},this._url=a,this._worker=new Worker(this._url),this._worker.onmessage=(a)=>this._onMessage(a)}async release(){this._worker&&(this._worker.terminate(),this._worker=null);for(const a of Object.keys(this._pending))this._fulfillPending(id,null,new Error('Worker terminated: '+this._url))}_postMessage(a){this._worker.postMessage(a)}_onMessage(a){return a.data.id?void this._fulfillPending(a.data.id,a.data.result,a.data.error):void console.log('Unexpected message',a)}_fulfillPending(a,b,c){const d=this._pending[a];return d?(delete this._pending[a],c?void d[1](new Error(c)):void d[0](b)):void console.log('No resolver for',{id:a,result:b,error:c})}_requestResponse(a){return new Promise((b,c)=>{a.id=++this._requestId,this._pending[a.id]=[b,c],this._postMessage(a)})}}const H=new class extends G{constructor(){super('js/gzip-worker.js')}compress(a){return this._requestResponse({data:a})}};class I{constructor(a,b,c){this.text=a,this._compressedSize=null,this._url='',this._blob=null,this.width=b,this.height=c}async size({compress:a}){return a?(this._compressedSize||(this._compressedSize=H.compress(this.text).then((a)=>a.byteLength)),this._compressedSize):this.text.length}_create(){this._blob=new Blob([this.text],{type:'image/svg+xml'}),this._url=URL.createObjectURL(this._blob)}get blob(){return this._blob||this._create(),this._blob}get url(){return this._url||this._create(),this._url}release(){this._url&&(this._blob=null,URL.revokeObjectURL(this._url))}}class J{constructor(a,{eventArea:b=a,shouldCaptureFunc:c=()=>!0}={}){this._target=a,this._shouldCaptureFunc=c,this._dx=0,this._dy=0,this._scale=1,this._active=0,this._lastPoints=[],['_onPointerDown','_onPointerMove','_onPointerUp'].forEach((a)=>{this[a]=this[a].bind(this)}),b.addEventListener('mousedown',this._onPointerDown),b.addEventListener('touchstart',this._onPointerDown),b.addEventListener('wheel',(a)=>this._onWheel(a))}reset(){this._dx=0,this._dy=0,this._scale=1,this._update()}_onWheel(a){if(!this._shouldCaptureFunc(a.target))return;a.preventDefault();const b=this._target.getBoundingClientRect();let c=a.deltaY;1===a.deltaMode&&(c*=15),c=Math.max(Math.min(c,60),-60);const d=c/300+1;0.05>this._scale*d||(this._scale*=d,this._dx-=(a.pageX-b.left)*(d-1),this._dy-=(a.pageY-b.top)*(d-1),this._update())}_onFirstPointerDown(){document.addEventListener('mousemove',this._onPointerMove),document.addEventListener('mouseup',this._onPointerUp),document.addEventListener('touchmove',this._onPointerMove),document.addEventListener('touchend',this._onPointerUp)}_onPointerDown(a){('mousedown'!=a.type||1==a.which)&&this._shouldCaptureFunc(a.target)&&(a.preventDefault(),this._lastPoints=i(a),this._active++,1===this._active&&this._onFirstPointerDown(a))}_onPointerMove(a){a.preventDefault();const b=i(a),c=b.reduce(h),d=this._lastPoints.reduce(h),e=this._target.getBoundingClientRect();if(this._dx+=c.x-d.x,this._dy+=c.y-d.y,b[1]){const a=g(b[0],b[1])/g(this._lastPoints[0],this._lastPoints[1]);this._scale*=a,this._dx-=(c.x-e.left)*(a-1),this._dy-=(c.y-e.top)*(a-1)}this._update(),this._lastPoints=b}_update(){this._target.style.WebkitTransform=this._target.style.transform=`translate3d(${this._dx}px, ${this._dy}px, 0) scale(${this._scale})`}_onPointerUp(a){return a.preventDefault(),this._active--,this._lastPoints.pop(),this._active?void(this._lastPoints=i(a)):void(document.removeEventListener('mousemove',this._onPointerMove),document.removeEventListener('mouseup',this._onPointerUp),document.removeEventListener('touchmove',this._onPointerMove),document.removeEventListener('touchend',this._onPointerUp))}}class K{constructor(){this.container=a('<div class="svg-output"><div class="svg-container"><iframe class="svg-frame" sandbox="allow-scripts"></iframe></div><div class="svg-clickjacker"></div></div>'),this._svgFrame=this.container.querySelector('.svg-frame'),this._svgFrame.scrolling='no',this._svgContainer=this.container.querySelector('.svg-container'),A.then(()=>{this._panZoom=new J(this._svgContainer,{eventArea:this.container})})}setSvg(a){const b=this._nextLoadPromise();return this._svgFrame.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(a.text),this._svgFrame.width=a.width,this._svgFrame.height=a.height,b}reset(){this._svgFrame.src='about:blank',this._panZoom.reset()}_nextLoadPromise(){return new Promise((a)=>{const b=()=>{this._svgFrame.removeEventListener('load',b),a()};this._svgFrame.addEventListener('load',b)})}}const L=new class extends G{constructor(){super('js/prism-worker.js')}highlight(a){return this._requestResponse({data:a})}};class M{constructor(){this.container=a('<div class="code-output"><pre><code></code></pre></div>'),this._codeEl=this.container.querySelector('code')}async setSvg(a){this._codeEl.innerHTML=await L.highlight(a.text)}reset(){this._codeEl.innerHTML=''}}class N{constructor(){this.container=a('<div class="output-switcher"></div>'),this._types={image:new K,code:new M},this._svgFile=null,this._switchQueue=Promise.resolve(),this.set('image',{noAnimate:!0})}update(a){return this._svgFile=a,this._types[this._activeType].setSvg(a)}reset(){this._types[this._activeType].reset()}set(a,{noAnimate:b=!1}={}){return this._switchQueue=this._switchQueue.then(async()=>{const c=this._activeType&&this._types[this._activeType].container;this._activeType=a;const d=this._types[this._activeType].container;if(this.container.appendChild(d),this._svgFile&&(await this.update(this._svgFile)),b)d.classList.add('active'),c&&c.classList.remove('active');else{const a=[D(d)];c&&a.push(E(c)),await Promise.all(a)}c&&this.container.removeChild(c)})}}class O{constructor(){this.container=a('<div class="ripple"></div>')}animate(){this.container.classList.remove('animate'),this.container.offsetLeft,this.container.classList.add('animate')}}class P{constructor(){this.container=a('<div class="spinner"><div class="spinner-container"><div class="spinner-layer"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div>'),this._showTimeout=null,this.container.style.display='none';const b=(a)=>{a.target==this.container&&(this.container.style.display='none')};this.container.addEventListener('webkitAnimationEnd',b),this.container.addEventListener('animationend',b)}show(a=300){clearTimeout(this._showTimeout),this.container.style.display='none',this.container.classList.remove('cooldown'),this._showTimeout=setTimeout(()=>{this.container.style.display=''},a)}hide(){clearTimeout(this._showTimeout),this.container.classList.add('cooldown')}}class Q{constructor({title:b,href:c,iconSvg:d,classList:e,minor:f}){this.container=a((c?'<a>':'<div role="button" tabindex="0">')+d+(c?'</a>':'</div>')+''),c&&(this.container.href=c),b&&this.container.setAttribute('title',b),this.container.classList.add(f?'minor-floating-action-button':'floating-action-button'),e&&e.forEach((a)=>{this.container.classList.add(a)}),this._ripple=new O,this.container.appendChild(this._ripple.container),this._spinner=new P,this.container.appendChild(this._spinner.container),this.container.addEventListener('click',(a)=>this._onClick(a))}_onClick(){this._ripple.animate()}working(){this._spinner.show(500)}done(){this._spinner.hide()}}class R extends Q{constructor(){const a='Download';super({title:a,href:'./',iconSvg:'<svg viewBox="0 0 24 24" class="icon">'+`<title>${a}</title>`+'<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>'}),this._svgFile=null}_onClick(a){super._onClick(a),'msSaveBlob'in navigator&&(a.preventDefault(),navigator.msSaveBlob(this._svgFile.blob,this._svgFile.filename))}setDownload(a,b){this.container.download=a,this.container.href=b.url,this._svgFile=b}}const S=document.queryCommandSupported&&document.queryCommandSupported('copy');class T extends Q{constructor(){const a='Copy as text';super({title:a,iconSvg:'<svg viewBox="0 0 24 24" class="icon">'+`<title>${a}</title>`+'<path d="M16 1H4C3 1 2 2 2 3v14h2V3h12V1zm3 4H8C7 5 6 6 6 7v14c0 1 1 2 2 2h11c1 0 2-1 2-2V7c0-1-1-2-2-2zm0 16H8V7h11v14z"/></svg>',minor:!0}),this._text=null,this._pre=document.createElement('pre')}_onClick(a){super._onClick(a),this._pre.textContent=this._text,document.body.appendChild(this._pre),getSelection().removeAllRanges();const b=document.createRange();b.selectNode(this._pre),window.getSelection().addRange(b),document.execCommand('copy'),getSelection().removeAllRanges(),document.body.removeChild(this._pre)}setCopyText(a){this._text=a}}class U extends Q{constructor(){const a='Preview on vivid background';super({title:a,iconSvg:'<svg viewBox="0 0 24 24" class="icon">'+`<title>${a}</title>`+'<path d="M21.143 9.667c-.733-1.392-1.914-3.05-3.617-4.753-2.977-2.978-5.478-3.914-6.785-3.914-.414 0-.708.094-.86.246l-1.361 1.36c-1.899-.236-3.42.106-4.294.983-.876.875-1.164 2.159-.792 3.523.492 1.806 2.305 4.049 5.905 5.375.038.323.157.638.405.885.588.588 1.535.586 2.121 0s.588-1.533.002-2.119c-.588-.587-1.537-.588-2.123-.001l-.17.256c-2.031-.765-3.395-1.828-4.232-2.9l3.879-3.875c.496 2.73 6.432 8.676 9.178 9.178l-7.115 7.107c-.234.153-2.798-.316-6.156-3.675-3.393-3.393-3.175-5.271-3.027-5.498l1.859-1.856c-.439-.359-.925-1.103-1.141-1.689l-2.134 2.131c-.445.446-.685 1.064-.685 1.82 0 1.634 1.121 3.915 3.713 6.506 2.764 2.764 5.58 4.243 7.432 4.243.648 0 1.18-.195 1.547-.562l8.086-8.078c.91.874-.778 3.538-.778 4.648 0 1.104.896 1.999 2 1.999 1.105 0 2-.896 2-2 0-3.184-1.425-6.81-2.857-9.34zm-16.209-5.371c.527-.53 1.471-.791 2.656-.761l-3.209 3.206c-.236-.978-.049-1.845.553-2.445zm9.292 4.079l-.03-.029c-1.292-1.292-3.803-4.356-3.096-5.063.715-.715 3.488 1.521 5.062 3.096.862.862 2.088 2.247 2.937 3.458-1.717-1.074-3.491-1.469-4.873-1.462z"/></svg>',classList:['fillAB'],minor:!0})}_onClick(a){super._onClick(a),this.container.classList.contains('active')?(this.container.classList.remove('active'),this.setColor('transparent')):(this.container.classList.add('active'),this.setColor('rgba(0, 0, 0, 0.7)'))}setColor(a){document.documentElement.style.backgroundColor=a}}class V{constructor(){this.container=a('<div class="results"><span class="size"></span> <span class="diff"></span><span class="remain"></span><span class="over"></span></div>'),this._sizeEl=this.container.querySelector('.size'),this._newSizeEl=this.container.querySelector('.newSize'),this._diffEl=this.container.querySelector('.diff'),this._remainEl=this.container.querySelector('.remain'),this._overEl=this.container.querySelector('.over')}update({size:a,comparisonSize:b}){const c=a-15359;return(this._sizeEl.textContent=b?k(b)+' \u2192 '+k(a):k(a),this._diffEl.classList.remove('decrease','increase'),!b)?(this._diffEl.textContent='',void(this._overEl.textContent='')):void(a===b?this._diffEl.textContent='100%':(this._diffEl.textContent=j(100*(a/b),2)+'%',this._diffEl.classList.add(a>b?'increase':'decrease')),this._remainEl.textContent='  ('+a.toFixed()+'/15359)',this._overEl.classList.remove('decrease','increase'),0>c?(this._overEl.textContent='[ '+c.toFixed()+' ]',this._overEl.classList.add('increase')):(this._overEl.textContent='[ +'+c.toFixed()+' ]',this._overEl.classList.add('decrease')))}}var W;l.prototype=Object.create(null),m.EventEmitter=m,m.usingDomains=!1,m.prototype.domain=void 0,m.prototype._events=void 0,m.prototype._maxListeners=void 0,m.defaultMaxListeners=10,m.init=function(){this.domain=null,m.usingDomains&&W.active&&!(this instanceof W.Domain)&&(this.domain=W.active),this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=new l,this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},m.prototype.setMaxListeners=function(a){if('number'!=typeof a||0>a||isNaN(a))throw new TypeError('"n" argument must be a positive number');return this._maxListeners=a,this},m.prototype.getMaxListeners=function(){return n(this)},m.prototype.emit=function(a){var b,c,d,e,f,g,h,i='error'===a;if(g=this._events,g)i=i&&null==g.error;else if(!i)return!1;if(h=this.domain,i){if(b=arguments[1],h)b||(b=new Error('Uncaught, unspecified "error" event')),b.domainEmitter=this,b.domain=h,b.domainThrown=!1,h.emit('error',b);else if(b instanceof Error)throw b;else{var j=new Error('Uncaught, unspecified "error" event. ('+b+')');throw j.context=b,j}return!1}if(c=g[a],!c)return!1;var k='function'==typeof c;switch(d=arguments.length,d){case 1:o(c,k,this);break;case 2:p(c,k,this,arguments[1]);break;case 3:q(c,k,this,arguments[1],arguments[2]);break;case 4:r(c,k,this,arguments[1],arguments[2],arguments[3]);break;default:for(e=Array(d-1),f=1;f<d;f++)e[f-1]=arguments[f];s(c,k,this,e);}return!1,!0},m.prototype.addListener=function(a,b){return t(this,a,b,!1)},m.prototype.on=m.prototype.addListener,m.prototype.prependListener=function(a,b){return t(this,a,b,!0)},m.prototype.once=function(a,b){if('function'!=typeof b)throw new TypeError('"listener" argument must be a function');return this.on(a,v(this,a,b)),this},m.prototype.prependOnceListener=function(a,b){if('function'!=typeof b)throw new TypeError('"listener" argument must be a function');return this.prependListener(a,v(this,a,b)),this},m.prototype.removeListener=function(a,b){var c,d,e,f,g;if('function'!=typeof b)throw new TypeError('"listener" argument must be a function');if(d=this._events,!d)return this;if(c=d[a],!c)return this;if(c===b||c.listener&&c.listener===b)0==--this._eventsCount?this._events=new l:(delete d[a],d.removeListener&&this.emit('removeListener',a,c.listener||b));else if('function'!=typeof c){for(e=-1,f=c.length;0<f--;)if(c[f]===b||c[f].listener&&c[f].listener===b){g=c[f].listener,e=f;break}if(0>e)return this;if(1===c.length){if(c[0]=void 0,0==--this._eventsCount)return this._events=new l,this;delete d[a]}else x(c,e);d.removeListener&&this.emit('removeListener',a,g||b)}return this},m.prototype.removeAllListeners=function(a){var b,c;if(c=this._events,!c)return this;if(!c.removeListener)return 0===arguments.length?(this._events=new l,this._eventsCount=0):c[a]&&(0==--this._eventsCount?this._events=new l:delete c[a]),this;if(0===arguments.length){for(var d,e=Object.keys(c),f=0;f<e.length;++f)d=e[f],'removeListener'===d||this.removeAllListeners(d);return this.removeAllListeners('removeListener'),this._events=new l,this._eventsCount=0,this}if(b=c[a],'function'==typeof b)this.removeListener(a,b);else if(b)do this.removeListener(a,b[b.length-1]);while(b[0]);return this},m.prototype.listeners=function(a){var b,c,d=this._events;return d?(b=d[a],c=b?'function'==typeof b?[b.listener||b]:z(b):[]):c=[],c},m.listenerCount=function(a,b){return'function'==typeof a.listenerCount?a.listenerCount(b):w.call(a,b)},m.prototype.listenerCount=w,m.prototype.eventNames=function(){return 0<this._eventsCount?Reflect.ownKeys(this._events):[]};class X{constructor(b){this.container=a(`
      <div class="material-slider">
        <div class="track">
          <div class="track-on"></div>
          <div class="handle">
            <div class="arrow"></div>
            <div class="val"></div>
          </div>
        </div>
      </div>
    `),this.range=b,this._handle=this.container.querySelector('.handle'),this._trackOn=this.container.querySelector('.track-on'),this._val=this.container.querySelector('.val'),b.parentNode.insertBefore(this.container,b),this.container.insertBefore(b,this.container.firstChild),b.addEventListener('input',()=>this._onInputChange()),this.range.addEventListener('mousedown',()=>this._onRangeMouseDown()),this.range.addEventListener('touchstart',()=>this._onRangeTouchStart()),this.range.addEventListener('touchend',()=>this._onRangeTouchEnd()),this._setPosition()}_onRangeTouchStart(){this.range.focus()}_onRangeTouchEnd(){this.range.blur()}_onRangeMouseDown(){this.range.classList.add('active');const a=()=>{requestAnimationFrame(()=>{this.range.blur()}),this.range.classList.remove('active'),document.removeEventListener('mouseup',a)};document.addEventListener('mouseup',a)}set value(a){this.range.value=a,this._update()}_onInputChange(){this._update()}_update(){requestAnimationFrame(()=>this._setPosition())}_setPosition(){const{min:a,max:b,value:c}=this.range;this._trackOn.style.width=this._handle.style.left=100*((+c-a)/(b-a))+'%',this._val.textContent=c}}class Y extends m{constructor(){super(),this._throttleTimeout=null,A.then(()=>{this._pluginInputs=Array.from(document.querySelectorAll('.settings .plugins input')),this._globalInputs=Array.from(document.querySelectorAll('.settings .global input')),this._resetRipple=new O,this._resetBtn=document.querySelector('.setting-reset'),this._resetBtn.appendChild(this._resetRipple.container),this._sliderMap=new WeakMap,Array.from(document.querySelectorAll('.settings input[type=range]')).forEach((a)=>this._sliderMap.set(a,new X(a))),this.container=document.querySelector('.settings'),this._scroller=document.querySelector('.settings-scroller'),this.container.addEventListener('change',(a)=>this._onChange(a)),this.container.addEventListener('input',(a)=>this._onChange(a)),this._scroller.addEventListener('wheel',(a)=>this._onMouseWheel(a)),this._resetBtn.addEventListener('click',(a)=>this._onReset(a)),this._scroller.addEventListener('mousedown',(a)=>{a.target.closest('input[type=range]')||a.preventDefault()})})}_onMouseWheel(a){a.deltaMode||(a.preventDefault(),a.currentTarget.scrollTop+=a.deltaY)}_onChange(a){clearTimeout(this._throttleTimeout),'range'==a.target.type?this._throttleTimeout=setTimeout(()=>this.emit('change'),150):this.emit('change')}_onReset(){this._resetRipple.animate();const a=this.getSettings();for(const a of this._globalInputs)'checkbox'==a.type?a.checked=a.hasAttribute('checked'):'range'==a.type&&(this._sliderMap.get(a).value=a.getAttribute('value'));for(const a of this._pluginInputs)a.checked=a.hasAttribute('checked');this.emit('reset',a),this.emit('change')}setSettings(a){for(const b of this._globalInputs)b.name in a&&('checkbox'==b.type?b.checked=a[b.name]:'range'==b.type&&(this._sliderMap.get(b).value=a[b.name]));for(const b of this._pluginInputs)b.name in a.plugins&&(b.checked=a.plugins[b.name])}getSettings(){const a=[],b={plugins:{}};return this._globalInputs.forEach((c)=>{'gzip'!=c.name&&'original'!=c.name&&('checkbox'==c.type?a.push(+c.checked):a.push('|'+c.value+'|')),b[c.name]='checkbox'==c.type?c.checked:c.value}),this._pluginInputs.forEach((c)=>{a.push(+c.checked),b.plugins[c.name]=c.checked}),b.fingerprint=a.join(),b}}class Z extends m{constructor(){super(),this.allowHide=!1,this._spinner=new P,A.then(()=>{this.container=document.querySelector('.main-menu'),this._loadFileInput=document.querySelector('.load-file-input'),this._pasteInput=document.querySelector('.paste-input'),this._loadDemoBtn=document.querySelector('.load-demo'),this._loadFileBtn=document.querySelector('.load-file'),this._pasteLabel=document.querySelector('.menu-input'),this._overlay=this.container.querySelector('.overlay'),this._menu=this.container.querySelector('.menu'),document.querySelector('.menu-btn').addEventListener('click',(a)=>this._onMenuButtonClick(a)),this._overlay.addEventListener('click',(a)=>this._onOverlayClick(a)),this._loadFileBtn.addEventListener('click',(a)=>this._onLoadFileClick(a)),this._loadDemoBtn.addEventListener('click',(a)=>this._onLoadDemoClick(a)),this._loadFileInput.addEventListener('change',(a)=>this._onFileInputChange(a)),this._pasteInput.addEventListener('input',(a)=>this._onTextInputChange(a))})}show(){this.container.classList.remove('hidden'),E(this._overlay,'hidden'),E(this._menu,'hidden')}hide(){this.allowHide&&(this.stopSpinner(),this.container.classList.add('hidden'),D(this._overlay,'hidden'),D(this._menu,'hidden'))}stopSpinner(){this._spinner.hide()}showFilePicker(){this._loadFileInput.click()}_onOverlayClick(a){a.preventDefault(),this.hide()}_onMenuButtonClick(a){a.preventDefault(),this.show()}_onTextInputChange(){const a=this._pasteInput.value.trim();a.includes('</svg>')&&(this._pasteInput.value='',this._pasteInput.blur(),this._pasteLabel.appendChild(this._spinner.container),this._spinner.show(),this.emit('svgDataLoad',{data:a,filename:'image.svg'}))}_onLoadFileClick(a){a.preventDefault(),a.target.blur(),this.showFilePicker()}async _onFileInputChange(){const a=this._loadFileInput.files[0];a&&(this._loadFileBtn.appendChild(this._spinner.container),this._spinner.show(),this.emit('svgDataLoad',{data:await d(a),filename:a.name}))}async _onLoadDemoClick(a){a.preventDefault(),a.target.blur(),this._loadDemoBtn.appendChild(this._spinner.container),this._spinner.show();try{this.emit('svgDataLoad',{data:await fetch('test-svgs/car-lite.svg').then((a)=>a.text()),filename:'car-lite.svg'})}catch(a){{this.stopSpinner();let a;a='serviceWorker'in navigator&&navigator.serviceWorker.controller?Error('Demo not available offline'):Error('Couldn\'t fetch demo SVG'),this.emit('error',{error:a})}}}}class ${constructor(b,c,d){this.container=a('<div class="toast"><div class="toast-content"></div></div>'),this._content=this.container.querySelector('.toast-content'),this._content.textContent=b,this._answerResolve,this._hideTimeout,this.answer=new Promise((a)=>this._answerResolve=a),d.forEach((a)=>{var b=document.createElement('button');b.className='unbutton',b.textContent=a,b.addEventListener('click',()=>{this._answerResolve(a)}),this.container.appendChild(b)}),c&&(this._hideTimeout=setTimeout(()=>this.hide(),c))}hide(){return clearTimeout(this._hideTimeout),this._answerResolve(),D(this.container,'hide')}}class _{constructor(){this.container=a('<div class=\'toasts\'></div>')}show(a,{duration:b=0,buttons:c=['dismiss']}={}){const d=new $(a,b,c);return this.container.appendChild(d.container),d.answer.then(()=>d.hide()).then(()=>{this.container.removeChild(d.container)}),d}}class aa extends m{constructor(){super(),this.container=a('<div class="drop-overlay">Drop it!</div>'),this._activeEnters=0,this._currentEnteredElement=null,A.then(()=>{document.addEventListener('dragover',(a)=>a.preventDefault()),document.addEventListener('dragenter',(a)=>this._onDragEnter(a)),document.addEventListener('dragleave',(a)=>this._onDragLeave(a)),document.addEventListener('drop',(a)=>this._onDrop(a))})}_onDragEnter(a){this._currentEnteredElement==a.target||(this._currentEnteredElement=a.target,!this._activeEnters++&&D(this.container))}_onDragLeave(){this._currentEnteredElement=null,--this._activeEnters||E(this.container)}async _onDrop(a){a.preventDefault(),this._activeEnters=0,E(this.container);const b=a.dataTransfer.files[0];b&&this.emit('svgDataLoad',{data:await d(b),filename:b.name})}}class ba{constructor(){A.then(()=>{this.container=document.querySelector('.preloader'),this.activated=this.container.classList.contains('active'),this.hide()})}async hide(){await E(this.container,'active'),this.container.style.display='none'}}class ca{constructor(b){this.container=a('<section class="changelog"></section>'),this._loadedVersion=b}async showLogFrom(b){if(b==this._loadedVersion)return;const d=await fetch('changelog.json').then((a)=>a.json());let e=0,f=0;for(var g=0;g<d.length;g++){const a=d[g];if(a.version===this._loadedVersion)e=g;else if(a.version===b)break;f=g+1}const h=d.slice(e,f).reduce((a,b)=>a.concat(b.changes),[]).map((a)=>c`<li>${a}</li>`);this.container.appendChild(a('<h1>Updated!</h1>')),this.container.appendChild(a('<ul>'+h.join('')+'</ul>')),await A,D(this.container)}}class da{constructor(a){this._results=a,A.then(()=>{this._mobileContainer=document.querySelector('.results-container-mobile'),this._container=document.querySelector('.results-container'),this._query=matchMedia('(min-width: 640px)'),this._query.addListener(()=>this._positionResults()),this._positionResults()})}_positionResults(){this._query.matches?this._container.appendChild(this._results.container):this._mobileContainer.appendChild(this._results.container)}}class ea extends m{constructor(){super(),this.container=null,A.then(()=>{this.container=document.querySelector('.view-toggler'),this.container.output[0].checked=!0,this.container.addEventListener('change',(a)=>this._onChange(a))})}_onChange(){let a=this.container.output.value;a||(a=Array.from(this.container.output).reduce((a,b)=>a||(b.checked?b.value:''),'')),this.emit('change',{value:a})}}class fa{constructor(a){this._size=a,this.purge()}purge(){this._fingerprints=[],this._items=[],this._index=0}add(a,b){const c=this._items[this._index];c&&c.release(),this._fingerprints[this._index]=a,this._items[this._index]=b,this._index=(this._index+1)%this._size}match(a){return this._items[this._fingerprints.indexOf(a)]}}class ga{constructor(...a){this._activated=!1,this._toActivate=a}activate(){if(!this._activated)return this._activated=!0,Promise.all(this._toActivate.map((a)=>D(a)))}}const ha=new class extends G{constructor(){super('js/svgo-worker.js'),this._abortOnNextIteration=!1,this._currentJob=Promise.resolve()}async load(a){const{width:b,height:c}=await this._requestResponse({action:'load',data:a});return new I(a,b,c)}process(a,b){return this._currentJob=this.abortCurrent().then(async()=>{this._abortOnNextIteration=!1;let c=await this._requestResponse({action:'process',settings:a});var d=new I(c.data,c.dimensions.width,c.dimensions.height);if(b(d),a.multipass)for(;c=await this.nextPass();){if(this._abortOnNextIteration)throw Error('abort');d=new I(c.data,c.dimensions.width,c.dimensions.height),b(d)}return d})}nextPass(){return this._requestResponse({action:'nextPass'})}async abortCurrent(){this._abortOnNextIteration=!0,await this._currentJob}async release(){await this.abortCurrent(),super.release()}};(function(){var a='mouse';document.body.addEventListener('focus',(b)=>{b.target.classList.add('key'==a?'key-focused':'mouse-focused')},!0),document.body.addEventListener('blur',(a)=>{a.target.classList.remove('key-focused'),a.target.classList.remove('mouse-focused')},!0),document.body.addEventListener('keydown',()=>{a='key'},!0),document.body.addEventListener('mousedown',()=>{a='mouse'},!0)})(),new class{constructor(){this._container=null,this._mainUi=null,this._outputUi=new N,this._downloadButtonUi=new R,this._copyButtonUi=new T,this._bgFillUi=new U,this._resultsUi=new V,this._settingsUi=new Y,this._mainMenuUi=new Z,this._toastsUi=new _,this._dropUi=new aa,this._preloaderUi=new ba,this._changelogUi=new ca(self.version),this._resultsContainerUi=new da(this._resultsUi),this._viewTogglerUi=new ea,this._settingsUi.on('change',()=>this._onSettingsChange()),this._settingsUi.on('reset',(a)=>this._onSettingsReset(a)),this._mainMenuUi.on('svgDataLoad',(a)=>this._onInputChange(a)),this._dropUi.on('svgDataLoad',(a)=>this._onInputChange(a)),this._mainMenuUi.on('error',({error:a})=>this._handleError(a)),this._viewTogglerUi.on('change',(a)=>this._onViewSelectionChange(a)),window.addEventListener('keydown',(a)=>this._onGlobalKeyDown(a)),this._inputItem=null,this._cache=new fa(10),this._latestCompressJobId=0,this._userHasInteracted=!1,this._reloading=!1,'serviceWorker'in navigator&&navigator.serviceWorker.register('sw.js',{scope:'./'}).then((a)=>{a.addEventListener('updatefound',()=>this._onUpdateFound(a))}),F.get('last-seen-version').then((a)=>{a&&this._changelogUi.showLogFrom(a),F.set('last-seen-version',self.version)}),A.then(()=>{this._container=document.querySelector('.app-output'),this._mainUi=new ga(document.querySelector('.toolbar'),document.querySelector('.action-button-container'),this._outputUi.container,this._settingsUi.container);const a=document.querySelector('.action-button-container'),b=document.querySelector('.minor-action-container');b.appendChild(this._bgFillUi.container),S&&b.appendChild(this._copyButtonUi.container),a.appendChild(this._downloadButtonUi.container),document.querySelector('.output').appendChild(this._outputUi.container),this._container.appendChild(this._toastsUi.container),this._container.appendChild(this._dropUi.container),document.querySelector('.menu-extra').appendChild(this._changelogUi.container),this._loadSettings(),this._preloaderUi.activated&&this._toastsUi.show('Ready now!',{duration:3e3})})}_onGlobalKeyDown(a){'o'===a.key&&(a.ctrlKey||a.metaKey)&&(a.preventDefault(),this._mainMenuUi.showFilePicker())}_onViewSelectionChange(a){this._outputUi.set(a.value)}_onUpdateFound(a){const b=a.installing;a.installing.addEventListener('statechange',async()=>{if(!this._reloading){if('activated'==b.state&&!navigator.serviceWorker.controller)return void this._toastsUi.show('Ready to work offline',{duration:5e3});if('activated'==b.state&&navigator.serviceWorker.controller){if(!this._userHasInteracted)return this._reloading=!0,void location.reload();const a=this._toastsUi.show('Update available',{buttons:['reload','dismiss']}),b=await a.answer;'reload'==b&&(this._reloading=!0,location.reload())}}})}_onSettingsChange(){const a=this._settingsUi.getSettings();this._saveSettings(a),this._compressSvg(a)}async _onSettingsReset(a){const b=this._toastsUi.show('Settings reset',{buttons:['undo','dismiss'],duration:5e3});'undo'===(await b.answer)&&(this._settingsUi.setSettings(a),this._onSettingsChange())}async _onInputChange(a){const b=this._settingsUi.getSettings();this._userHasInteracted=!0;try{this._inputItem=await ha.load(a.data),this._inputFilename=a.filename}catch(a){{const b=new Error('Load failed: '+a.message);return this._mainMenuUi.stopSpinner(),void this._handleError(b)}}this._cache.purge();let c=!0;const d=()=>{c&&(this._outputUi.reset(),this._mainUi.activate(),this._mainMenuUi.allowHide=!0,this._mainMenuUi.hide(),c=!1)};this._compressSvg(b,()=>d()),c&&d()}_handleError(a){this._toastsUi.show(a.message),console.error(a)}async _loadSettings(){const a=await F.get('settings');a&&this._settingsUi.setSettings(a)}_saveSettings(a){const b=Object.assign({},a);delete b.original,F.set('settings',b)}async _compressSvg(a,b=function(){}){const c=this._latestCompressJobId=Math.random();if(await ha.abortCurrent(),c==this._latestCompressJobId){if(a.original)return void this._updateForFile(this._inputItem,{compress:a.gzip});const c=this._cache.match(a.fingerprint);if(c)return void this._updateForFile(c,{compareToFile:this._inputItem,compress:a.gzip});this._downloadButtonUi.working();try{const c=await ha.process(a,(c)=>{b(c),this._updateForFile(c,{compareToFile:this._inputItem,compress:a.gzip})});this._cache.add(a.fingerprint,c)}catch(a){if('abort'==a.message)return;a.message='Minifying error: '+a.message,this._handleError(a)}finally{this._downloadButtonUi.done()}}}async _updateForFile(a,{compareToFile:b,compress:c}){this._outputUi.update(a),this._downloadButtonUi.setDownload(this._inputFilename,a),this._copyButtonUi.setCopyText(a.text),this._resultsUi.update({comparisonSize:b&&(await b.size({compress:c})),size:await a.size({compress:c})})}}})();
//# sourceMappingURL=page.js.map
