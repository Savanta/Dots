// Extension for Opera Browser - Magic Actions for YouTube™ - CHROMEACTIONS.COM - Copyright 2015 Vlad and Serge Strukoff - All Rights Reserved
window.addEventListener("load",ccMenu,!1);
function ccMenu(){function v(){"menu1"==this.id&&d("ctrb.html")}function w(b){var c=b.target.id?b.target:b.target.parentElement,a=c.id;"menu0"==t&&(a=parseInt(c.id.slice(1)),0==a?d("http://www.chromeactions.com/magic-actions-for-youtube-support.html",1):1==a?d("http://www.chromeactions.com/magic-actions-for-youtube-help-and-tips.html",1):2==a?chrome.runtime.sendMessage('{"id":7}'):3==a?d("chrome://plugins"):4==a?d("http://www.youtube.com/my_history"):5==a?d("chrome://extensions"):6==a?d("http://www.hotcleaner.com/clickclean-app.html"):
7==a?d("https://www.facebook.com/magicactions"):8==a?d("http://www.youtube.com/user/StrukoffBrothers/feed"):9==a?d("https://plus.google.com/110367533603365326399/posts"):10==a&&d("https://addons.opera.com/en/extensions/details/magic-actions-for-youtube"));b.stopPropagation()}function x(){var b=c("rng"),u=c("amnt"),a=c("paypal"),k=c("bitpay"),f=c("ppPrice");e_price2=c("bpPrice");a.setAttribute("action","https://www.paypal.com/cgi-bin/webscr");k.setAttribute("action","https://bitpay.com/checkout");
c("ppItemName").value=c("bpItemDesc").value="Donation for Magic Actions - Opera Edition";c("ppBusiness").value="webmaster@mixesoft.com";c("bpData").value="QssHQDbRWfw8q4ZrIXbQo39IRne2n99dmkMZHZ5U30pSjGO7mKX1oewbiLiSkZZ/mGmWzLvaYuMrDax7AZNkZg/3mLE2npzjwC0mUH+rwp+cScWvicGSP0ZnXXiAsFjClAJtBZ5C3Y5NgMS3TM4AUP+5v7WRXGDnMsNdxjuPIYao/vi8ici0swhr4lXPpmZAehzTcDKd5jqiCm1cx0Fjd/orQchtC44wHDamnN/JVpLQrLuZahb8NP10wkQXo7sefDInqAmVgSjNpaOGjcpd2g==";u.textContent="$ "+b.value;b.addEventListener("change",function(a){u.textContent=
"$ "+b.value;f.value=e_price2.value=b.value;a.stopPropagation()},!1);a.addEventListener("submit",function(){var a=f.value;return isNaN(a)||2>a||30<a?!1:!0},!1);k.addEventListener("submit",function(){var a=e_price2.value;return isNaN(a)||2>a||30<a?!1:!0},!1)}function d(b,c){c?chrome.windows.create({url:b,left:0,top:0,width:screen.width,height:screen.height,incognito:!0,focused:!0}):chrome.tabs.create({url:b})}function c(b){return document.getElementById(b)}var t="menu0";(function(){var b=chrome.i18n.getMessage("menu").split(";"),
d=document.createDocumentFragment(),a=c("menu"),k;a.id="menu";for(var f=0;f<b.length;f++)k=document.createElement("div"),k.className="nav",k.id="menu"+f,k.textContent=b[f],k.addEventListener("click",v,!1),d.appendChild(k);a.appendChild(d);c(t).className="nav act";a:{var a=t,g,b=c("box");if("menu0"==a)g=[3,"orange","report.png",0,7,0,"help1.png",1,3,"blue","options.png",2,3,"violet","plugins.png",3,3,"violet","history.png",4,3,"violet","extensions.png",5,3,"violet","security.png",6,0,"fb","facebook32.png",
7,0,"yt","youtube32.png",8,0,"gp","gplus32.png",9,0,"rt","rate32.png",10];else if("menu1"==a){g=c("donate");if(!g.hasAttribute("init")){for(var l=chrome.i18n.getMessage(a).split(";"),m=g.innerHTML,d=0,r;r=l[d];d++)m=m.replace("t"+(10+d),r);g.innerHTML=m;g.setAttribute("init",!0);x()}b.style.display="none";g.style.display="block";break a}d=0;a=chrome.i18n.getMessage(a).split(";");k=document.createDocumentFragment();for(var n,e,h,q,s,p=0;p<g.length;p+=4)f=p/4,n=g[p],h=g[p+1],q=g[p+2],2==n?(e=new Uint8Array(1),
crypto.getRandomValues(e),e=e[0]%h.length,f="i"+(f+e),h=h[e],q="i/menu/"+q[e],s=a[g[p+3]+e]):(f="i"+f,q="i/menu/"+q,s=a[g[p+3]]),7>n?(r=0,l=document.createElement("div"),m=document.createElement("div"),e=new Image,h="btn "+h,2<n&&(h+=" wide"),l.id=f,l.className=h,e.className="icn",m.className="txt0",e.dataset.url=e.src=q,m.textContent=s,l.appendChild(e),l.appendChild(m),k.appendChild(l)):(n=document.createElement("div"),h=document.createElement("div"),e=new Image,e.src=q,n.id=f,n.className="adt a"+
r,e.className="icnm",h.className="txt1",h.textContent=s,n.appendChild(e),l.insertBefore(n,m),l.insertBefore(h,m),r++),d++;b.innerHTML="";b.appendChild(k);b.style.display="";c("donate").style.display=""}c("box").addEventListener("click",w,!1);chrome.runtime.sendMessage('{"id":1,"ga":{"ea":"menu"}}')})()};