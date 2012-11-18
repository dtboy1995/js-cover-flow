(function(t){var e={},o=function(t){var n;if(t)t.nodeType?n=t:typeof t=="string"&&(n=document.getElementById(t));else if(e)for(var i in e)n=e[i];if(n){var r=e[n.id];return r?r:e[n.id]=new o.Api(n)}return null};o.Api=function(t){var e,n=!1;this.container=t,this.id=t.id,this.config=null,this.events={ready:new o.Signal,playlist:new o.Signal,focus:new o.Signal,click:new o.Signal},this.setup=function(t){var n={mode:"html5",flash:"coverflow.swf",width:480,height:270,backgroundcolor:"000000",gradientcolor:void 0,coverwidth:150,coverheight:"auto",covergap:40,coverangle:70,coverdepth:170,coveroffset:130,removeblackborder:!1,fixedsize:!1,opacitydecrease:.1,reflectionopacity:.3,reflectionratio:155,reflectionoffset:0,showduration:!1,showtext:!0,textstyle:".coverflow-text{color:#f1f1f1;text-align:center;font-family:Arial Rounded MT Bold,Arial;} .coverflow-text h1{font-size:14px;font-weight:normal;line-height:21px;} .coverflow-text h2{font-size:11px;font-weight:normal;} .coverflow-text a{color:#0000EE;}",textoffset:75,tweentime:.8,rotatedelay:0,focallength:250,framerate:60,x:0,y:0};return this.config=o.Utils.extend(n,t),this.config.id=this.id,this.container.innerHTML="",o.Utils.addClass(this.container,"coverflow"),this.resize(this.config.width,this.config.height),this.getMode()==="html5"?e=new o.html5(this):this.getMode()==="flash"&&(e=new o.flash(this)),this.left=e.left,this.right=e.right,this.prev=e.prev,this.next=e.next,this.to=e.to,this},this.resize=function(t,n){this.config.width=t,this.config.height=n,o.Utils.css(this.container,{width:t,height:n}),e&&e.resize(t,n)},this.getMode=function(){return o.Utils.hasFlash&&this.config.mode==="flash"?"flash":!o.Utils.isIE&&Modernizr.csstransforms3d&&Modernizr.csstransitions&&Modernizr.canvas?"html5":"flash"},this.on=function(t,e){this.events[t].on(e),n&&t==="ready"&&this.events.ready.trigger.apply(this)},this.off=function(t,e){this.events[t].off(e)},this.trigger=function(t){n=!0;var e=Array.prototype.slice.call(arguments);e.shift(),this.events[t].trigger.apply(this,e)}},t.coverflow=o})(window),function(t){t.flash=function(t){function e(t){var e="";for(var o in t)e+=typeof t[o]=="object"?o+"="+encodeURIComponent("[[JSON]]"+JSON.stringify(t[o]))+"&":o+"="+encodeURIComponent(t[o])+"&";return e.slice(0,-1)}var o='<object id="coverflow-flash" data="'+t.config.flash+'" width="100%" height="100%" type="application/x-shockwave-flash">'+'<param name="movie" value="'+t.config.flash+'" />'+'<param name="bgcolor" value="#'+t.config.backgroundcolor+'" />'+'<param name="allowscriptaccess" value="always" />'+'<param name="flashvars" value="'+e(t.config)+'" />'+'<a href="http://get.adobe.com/flashplayer/">Get Adobe Flash player</a>'+"</object>";t.container.innerHTML=o;var n=document.getElementById("coverflow-flash");this.resize=function(){},this.left=function(){n.apiLeft()},this.right=function(){n.apiRight()},this.prev=function(){n.apiPrev()},this.next=function(){n.apiNext()},this.to=function(t){n.apiTo(t)}}}(coverflow),function(t){t.html5=function(e){function o(e){a=e,u.coverheight=u.coverheight=="auto"?u.height:u.coverheight,l&&l.destroy(),l=new t.CoverFlow(d,a,u),d.appendChild(l.domElement),c&&d.removeChild(c),u.showtext===!0&&(c=document.createElement("div"),t.Utils.addClass(c,"coverflow-text"),d.appendChild(c)),l.onFocus(i),l.onClick(r),f.resize(u.width,u.height),u.rotatedelay>0&&(h&&f.stopRotation(),h=setInterval(s,u.rotatedelay),d.addEventListener("touchstart",f.stopRotation,!1),d.addEventListener("mousedown",f.stopRotation,!1)),d.addEventListener("mousewheel",n),d.addEventListener("DOMMouseScroll",n)}function n(t){t.preventDefault();var e=t.detail?t.detail*-120:t.wheelDelta,o=Math.ceil(Math.abs(e)/120);if(o>0){var n=Math.abs(e)/e,i=null;if(n>0?i=f.left:0>n&&(i=f.right),typeof i=="function")for(var r=0;o>r;r++)i()}}function i(t){if(u.showtext===!0){var o=a[t];o&&(c.innerHTML="<h1>"+(o.title===void 0?"":o.title)+"</h1><h2>"+(o.description===void 0?"":o.description)+"</h2>")}e.trigger("focus",t,a[t]?a[t].link:void 0)}function r(t){u.rotatedelay>0&&h&&f.stopRotation(),e.trigger("click",t,a[t]?a[t].link:void 0)}function s(){l.next()}var a,l,c,h,f=this,d=e.container,u=e.config,p=document.createElement("style");p.type="text/css",document.getElementsByTagName("head")[0].appendChild(p),p.appendChild(document.createTextNode(u.textstyle)),u.backgroundcolor=u.backgroundcolor.indexOf("#")==-1?"#"+u.backgroundcolor:u.backgroundcolor,d.style.backgroundColor=u.backgroundcolor,u.gradientcolor!==void 0&&(u.gradientcolor=u.gradientcolor.indexOf("#")==-1?"#"+u.gradientcolor:u.gradientcolor,d.style.background="-webkit-gradient(linear, left top, left bottom, from("+u.gradientcolor+"), to("+u.backgroundcolor+"))"),e.trigger("ready"),e.events.playlist.on(o);var v=new t.PlaylistLoader(e);v.load(e.config.playlist),this.stopRotation=function(){d.removeEventListener("touchstart",f.stopRotation,!1),d.removeEventListener("mousedown",f.stopRotation,!1),clearInterval(h)},this.resize=function(t,e){l&&l.resize(t,e),c&&(c.style.top=e-u.textoffset+"px")},this.left=function(){l.left()},this.right=function(){l.right()},this.prev=function(){l.prev()},this.next=function(){l.next()},this.to=function(t){l.to(t)}}}(coverflow),function(t){t.CoverFlow=function(e,o,n){function i(t){t.stopPropagation(),parseInt(v.domElement.firstChild.style.opacity,10)===0?(a.domElement.style.opacity=0,typeof a.hideComplete=="function"&&a.hideComplete()):parseInt(v.domElement.firstChild.style.opacity,10)===1&&typeof a.showComplete=="function"&&a.showComplete()}function r(t){var e=this,o=0;while((e=e.previousSibling)!==null)o+=1;var n=a.covers[o],i=t.offsetY||t.layerY;n.halfHeight>i&&(t.preventDefault(),n.index!=f?a.to(n.index):a.clicked(n.index))}function s(t){if([37,39,38,40,32].indexOf(t.keyCode)!==-1)switch(t.preventDefault(),t.keyCode){case 37:a.left();break;case 39:a.right();break;case 38:a.to(0);break;case 40:a.to(l-1);break;case 32:a.clicked(f)}}var a=this;this.config=n,this.hideComplete=null,this.showComplete=null;var l=o.length,c=0,h=0,f=0,d=[],u=[];this.covers=[],this.transforms=[],this.prevF=-1,this.transformProp=Modernizr.prefixed("transform"),this.space=n.coveroffset+n.covergap,this._angle="rotateY("+-n.coverangle+"deg)",this.angle="rotateY("+n.coverangle+"deg)",this.domElement=document.createElement("div"),this.domElement.className="coverflow-wrap",this.tray=document.createElement("div"),this.tray.className="coverflow-tray",this.domElement.appendChild(this.tray),this.domElement.style[Modernizr.prefixed("perspective")]=n.focallength+"px";for(var p=new t.Controller(this,this.tray,this.config),v=null,m=0;l>m;m++)v=new t.Cover(a,m,o[m].image,o[m].duration,n),this.tray.appendChild(v.domElement),v.domElement.onmousedown=r,v.domElement.style[Modernizr.prefixed("transitionDuration")]=this.config.tweentime+"s",this.covers[m]=v;v&&v.domElement.firstChild.addEventListener("webkitTransitionEnd",i,!0),e.addEventListener("touchstart",p,!0),window.addEventListener("keydown",s,!1),this.hide=function(t){a.hideComplete=t;for(var e=0;this.covers.length>e;e++)this.covers[e].domElement.firstChild.style.opacity=0},this.show=function(t){a.showComplete=t,a.domElement.style.opacity=1;for(var e=0;this.covers.length>e;e++)this.covers[e].domElement.firstChild.style.opacity=1},this.itemComplete=function(t){if(h=t>h?t:h,c+=1,c==l){a.to(0);for(var e=0;l>e;e++)this.covers[e].setY(h)}},this.left=function(){f>0&&a.to(f-1)},this.right=function(){l-1>f&&a.to(f+1)},this.prev=function(){f>0?a.to(f-1):a.to(l-1)},this.next=function(){l-1>f?a.to(f+1):a.to(0)},this.to=function(t){t>l-1?t=l-1:0>t&&(t=0),f=t,p.to(t)},this.focused=function(t){for(var e=0;d.length>e;e++)d[e](t)},this.clicked=function(t){for(var e=0;u.length>e;e++)u[e](t)},this.onFocus=function(t){d.push(t)},this.onClick=function(t){u.push(t)},this.destroy=function(){e.removeChild(a.domElement),e.removeEventListener("click",r,!1),e.removeEventListener("touchstart",p,!0),window.removeEventListener("keydown",s,!1)},this.resize=function(){t.Utils.css(this.domElement,{left:n.width*.5+n.x,top:n.height*.5+n.y})}},t.CoverFlow.prototype.updateTouchEnd=function(t){var e=this.getFocusedCover(t.currentX);t.currentX=-e*this.config.covergap,this.update(t.currentX)},t.CoverFlow.prototype.getFocusedCover=function(t){var e=-Math.round(t/this.config.covergap);return Math.min(Math.max(e,0),this.covers.length-1)},t.CoverFlow.prototype.getFocusedCoverOne=function(t){var e=-Math.round(t/this.config.covergap);return Math.min(Math.max(e,-1),this.covers.length)},t.CoverFlow.prototype.tap=function(t,e,o){var n=-Math.round(o/this.config.covergap),i=this.covers[n];if(i.domElement==t.target.parentNode){var r=this.findPos(i.domElement),s=e-r.y;i.halfHeight>s&&this.clicked(i.index)}},t.CoverFlow.prototype.findPos=function(t){var e=0,o=0;if(t.offsetParent){do e+=t.offsetLeft,o+=t.offsetTop;while((t=t.offsetParent)!==null);return{x:e,y:o}}},t.CoverFlow.prototype.setCoverStyle=function(t,e,o){this.transforms[e]!=o&&(t.domElement.style[this.transformProp]=o,this.transforms[e]=o)},t.CoverFlow.prototype.getCoverTransform=function(t,e){var o=e*this.config.covergap;return t==e?"translate3d("+o+"px, 0, 0)":e>t?"translate3d("+(o+this.space)+"px, 0, "+-this.config.coverdepth+"px) "+this._angle:"translate3d("+(o-this.space)+"px, 0, "+-this.config.coverdepth+"px) "+this.angle},t.CoverFlow.prototype.update=function(t){this.tray.style[this.transformProp]="translate3d("+t+"px, 0, 0)";var e=this.getFocusedCoverOne(t);e!=this.prevF&&(this.focused(e),this.prevF=e);for(var o=0;this.covers.length>o;o++)this.setCoverStyle(this.covers[o],o,this.getCoverTransform(e,o))}}(coverflow),function(t){t.Cover=function(e,o,n,i,r){function s(){var o,n=p.width,s=p.height,v=0,m=0,g=0;if(r.removeblackborder){var y=document.createElement("canvas");y.width=n,y.height=s,o=y.getContext("2d"),o.drawImage(p,0,0);for(var w=o.getImageData(0,0,n,s).data,C=0,x=0,E=0,b=0;s>b;b++){for(C=0,x=0;n>x;x++)E=(b*n+x)*4,C+=w[E]<<16|w[E+1]<<8|w[E+2];if(C/n>=460551)break;v++}for(b=s-1;b>=0;b--){for(C=0,x=0;n>x;x++)E=(b*n+x)*4,C+=w[E]<<16|w[E+1]<<8|w[E+2];if(C/n>=460551)break;m++}s-=v+m}var k;if(r.fixedsize?(a=Math.round(h),l=Math.round(f),l/s>a/n?(k=l/s,g+=(n-a/k)*.5):(k=a/n,v+=(s-l/k)*.5)):f>h?(a=Math.round(h),l=Math.round(s/n*h),k=h/n):(a=Math.round(n/s*f),l=Math.round(f),k=f/s),c.halfHeight=l,d.top=-(l*.5)+"px",d.left=-(a*.5)+"px",d.width=a+"px",d.height=l+"px",u.width=a,u.height=l*2,o=u.getContext("2d"),o.drawImage(p,g,v,n-2*g,s-2*v,0,0,a,l),r.showduration&&i>0){o.save();var M=t.Cover.formatTime(i);o.font="normal 10px Arial Rounded MT Bold, Arial";var T=o.measureText(M),L=T.width;o.roundRect(a-(L+9),5,L+4,11,2),o.fillStyle="#000",o.globalAlpha=.7,o.fill(),o.fillStyle="#fff",o.globalAlpha=.8,o.textAlign="right",o.fillText(M,a-7,14),o.restore()}r.reflectionopacity>0&&(d.height=l*2+"px",t.Cover.reflect(u,a,l,r.reflectionopacity,r.reflectionratio,r.reflectionoffset)),e.itemComplete(l)}var a,l,c=this,h=r.coverwidth,f=r.coverheight;this.index=o,this.halfHeight=0,this.domElement=document.createElement("div"),this.domElement.className=t.Cover.getClassName();var d=this.domElement.style;d.backgroundColor=r.backgroundcolor;var u=document.createElement("canvas");c.domElement.appendChild(u);var p=new Image;p.onload=s,p.src=n,this.setY=function(t){var e=t*.5-(t-l);this.domElement.style.top=-e+"px"}},t.Cover.getClassName=function(){return"coverflow-cell"},t.Cover.reflect=function(t,e,o,n,i,r){var s=t.getContext("2d");s.save(),s.scale(1,-1),s.drawImage(t,0,-o*2-r),s.restore(),s.globalCompositeOperation="destination-out";var a=s.createLinearGradient(0,0,0,o);a.addColorStop(i/255,"rgba(255, 255, 255, 1.0)"),a.addColorStop(0,"rgba(255, 255, 255, "+(1-n)+")"),s.translate(0,o+r),s.fillStyle=a,s.fillRect(0,0,e,o)},t.Cover.formatTime=function(t){var e=Math.floor(t/3600),o=Math.floor(t%3600/60),n=Math.floor(t%3600%60);return(e===0?"":e+""+":")+(o+"")+":"+(10>n?"0"+(n+""):n+"")},window.CanvasRenderingContext2D&&CanvasRenderingContext2D.prototype&&(CanvasRenderingContext2D.prototype.roundRect=function(t,e,o,n,i){return 2*i>o&&(i=o/2),2*i>n&&(i=n/2),this.beginPath(),this.moveTo(t+i,e),this.arcTo(t+o,e,t+o,e+n,i),this.arcTo(t+o,e+n,t,e+n,i),this.arcTo(t,e+n,t,e,i),this.arcTo(t,e,t+o,e,i),this.closePath(),this})}(coverflow),function(t){t.Controller=function(t,e,o){this.flow=t,this.elem=e,this.config=o,this.currentX=0,this.transformProp=Modernizr.prefixed("transitionDuration")},t.Controller.prototype.handleEvent=function(t){t.preventDefault(),this[t.type](t)},t.Controller.prototype.touchstart=function(t){t.stopImmediatePropagation(),this.startX=t.touches[0].pageX-this.currentX,this.pageY=t.touches[0].pageY,this.touchMoved=!1,window.addEventListener("touchmove",this,!0),window.addEventListener("touchend",this,!0),this.elem.style[this.transformProp]="0s"},t.Controller.prototype.touchmove=function(t){t.stopImmediatePropagation(),this.touchMoved=!0,this.lastX=this.currentX,this.lastMoveTime=(new Date).getTime(),this.currentX=t.touches[0].pageX-this.startX,this.flow.update(this.currentX)},t.Controller.prototype.touchend=function(t){if(t.stopImmediatePropagation(),window.removeEventListener("touchmove",this,!0),window.removeEventListener("touchend",this,!0),this.elem.style[this.transformProp]=this.config.tweentime+"s",this.touchMoved){var e=this.currentX-this.lastX,o=(new Date).getTime()-this.lastMoveTime+1;this.currentX=this.currentX+e*50/o,this.flow.updateTouchEnd(this)}else this.flow.tap(t,this.pageY,this.currentX)},t.Controller.prototype.to=function(t){this.currentX=-t*this.config.covergap,this.flow.update(this.currentX)}}(coverflow),function(t){t.PlaylistLoader=function(e){function o(t){var o=[];if(r.hasOwnProperty("route")){r.route.hasOwnProperty("playlist")&&(t=t[r.route.playlist]);for(var i=0;t.length>i;i++)o[i]={image:n(t[i],"image"),title:n(t[i],"title"),description:n(t[i],"description")}}e.events.playlist.trigger(o),e.events.playlist.off()}function n(t,e){if(r.route.hasOwnProperty(e)){for(var o=t,n=r.route[e].split("."),i=0;n.length>i;i++)o=o[n[i]];return o}return t[e]}function i(t){var o=JSON.parse(t.responseText);e.events.playlist.trigger(o),e.events.playlist.off()}var r=e.config;this.load=function(e){typeof e=="string"&&(e.indexOf("callback=?")!==-1?t.Utils.jsonp(e,o):t.Utils.ajax(e,i))}}}(coverflow),function(t){t.Signal=function(){var t=[];this.on=function(e){t.push(e)},this.trigger=function(){for(var e=Array.prototype.slice.call(arguments),o=0;t.length>o;o++)typeof t[o]=="function"&&t[o].apply(this,e)},this.off=function(e){if(e)for(var o=0;t.length>o;o++)t[o]===e&&(t.splice(o,1),o--);else t=[]}}}(coverflow),function(t){t.Utils=function(){},t.Utils.hasFlash=navigator.plugins!==void 0&&typeof navigator.plugins["Shockwave Flash"]=="object"||window.ActiveXObject&&new ActiveXObject("ShockwaveFlash.ShockwaveFlash")!==!1,t.Utils.isIE=navigator.userAgent.match(/msie/i)!==null,t.Utils.ajax=function(t,e,o){var n;n=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),n.onreadystatechange=function(){n.readyState===4&&(n.status===200?e&&e(n):o&&o(t))};try{n.open("GET",t,!0),n.send(null)}catch(i){o&&o(t)}return n},t.Utils.jsonp=function(e,o,n){var i=e.indexOf("?")===-1?"?":"&";n=n||{};for(var r in n)n.hasOwnProperty(r)&&(i+=encodeURIComponent(r)+"="+encodeURIComponent(n[r])+"&");var s=t.Utils.uniqueId("json_call");window[s]=function(t){o(t),window[s]=null};var a=document.createElement("script");a.src=e.indexOf("callback=?")!==-1?e.replace("callback=?","callback="+s)+i.slice(0,-1):e+i+"callback="+s,a.async=!0,a.onload=a.onreadystatechange=function(){this.readyState&&this.readyState!=="loaded"&&this.readyState!=="complete"||(a.onload=a.onreadystatechange=null,a&&a.parentNode&&a.parentNode.removeChild(a))};var l=document.head||document.getElementsByTagName("head")[0]||document.documentElement;l.insertBefore(a,l.firstChild)},t.Utils.extend=function(t,e){for(var o in e)e[o]&&e[o].constructor&&e[o].constructor===Object?(t[o]=t[o]||{},arguments.callee(t[o],e[o])):t[o]=e[o];return t};var e=0;t.Utils.uniqueId=function(t){var o=e++;return t?t+o:o},t.Utils.css=function(t,e){if(t)for(var o in e)if(e[o]!==void 0){if(typeof e[o]=="number"&&o!="zIndex"&&o!="opacity"){if(isNaN(e[o]))continue;e[o]=Math.ceil(e[o])+"px"}try{t.style[o]=e[o]}catch(n){}}},t.Utils.addClass=function(t,e){t.className.indexOf(e)===-1&&(t.className+=" "+e)}}(coverflow),Array.indexOf||(Array.prototype.indexOf=function(t){for(var e=0;this.length>e;e++)if(this[e]==t)return e;return-1}),window.Modernizr=function(t,e,o){function n(t){g.cssText=t}function i(t,e){return typeof t===e}function r(t,e){return!!~(""+t).indexOf(e)}function s(t,e){for(var n in t){var i=t[n];if(!r(i,"-")&&g[i]!==o)return e=="pfx"?i:!0}return!1}function a(t,e,n){for(var r in t){var s=e[t[r]];if(s!==o)return n===!1?t[r]:i(s,"function")?s.bind(n||e):s}return!1}function l(t,e,o){var n=t.charAt(0).toUpperCase()+t.slice(1),r=(t+" "+C.join(n+" ")+n).split(" ");return i(e,"string")||i(e,"undefined")?s(r,e):(r=(t+" "+x.join(n+" ")+n).split(" "),a(r,e,o))}var c,h,f,d="2.6.2",u={},p=e.documentElement,v="modernizr",m=e.createElement(v),g=m.style,y=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),w="Webkit Moz O ms",C=w.split(" "),x=w.toLowerCase().split(" "),E={},b=[],k=b.slice,M=function(t,o,n,i){var r,s,a,l,c=e.createElement("div"),h=e.body,f=h||e.createElement("body");if(parseInt(n,10))while(n--)a=e.createElement("div"),a.id=i?i[n]:v+(n+1),c.appendChild(a);return r=["&#173;",'<style id="s',v,'">',t,"</style>"].join(""),c.id=v,(h?c:f).innerHTML+=r,f.appendChild(c),h||(f.style.background="",f.style.overflow="hidden",l=p.style.overflow,p.style.overflow="hidden",p.appendChild(f)),s=o(c,t),h?c.parentNode.removeChild(c):(f.parentNode.removeChild(f),p.style.overflow=l),!!s},T={}.hasOwnProperty;f=i(T,"undefined")||i(T.call,"undefined")?function(t,e){return e in t&&i(t.constructor.prototype[e],"undefined")}:function(t,e){return T.call(t,e)},Function.prototype.bind||(Function.prototype.bind=function(t){var e=this;if(typeof e!="function")throw new TypeError;var o=k.call(arguments,1),n=function(){if(this instanceof n){var i=function(){};i.prototype=e.prototype;var r=new i,s=e.apply(r,o.concat(k.call(arguments)));return Object(s)===s?s:r}return e.apply(t,o.concat(k.call(arguments)))};return n}),E.canvas=function(){var t=e.createElement("canvas");return!!t.getContext&&!!t.getContext("2d")},E.canvastext=function(){return!!u.canvas&&!!i(e.createElement("canvas").getContext("2d").fillText,"function")},E.csstransforms3d=function(){var t=!!l("perspective");return t&&"webkitPerspective"in p.style&&M("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(e){t=e.offsetLeft===9&&e.offsetHeight===3}),t},E.csstransitions=function(){return l("transition")};for(var L in E)f(E,L)&&(h=L.toLowerCase(),u[h]=E[L](),b.push((u[h]?"":"no-")+h));return u.addTest=function(t,e){if(typeof t=="object")for(var n in t)f(t,n)&&u.addTest(n,t[n]);else{if(t=t.toLowerCase(),u[t]!==o)return u;e=typeof e=="function"?e():e,typeof enableClasses!="undefined"&&enableClasses&&(p.className+=" "+(e?"":"no-")+t),u[t]=e}return u},n(""),m=c=null,u._version=d,u._prefixes=y,u._domPrefixes=x,u._cssomPrefixes=C,u.testProp=function(t){return s([t])},u.testAllProps=l,u.testStyles=M,u.prefixed=function(t,e,o){return e?l(t,e,o):l(t,"pfx")},u}(this,this.document)