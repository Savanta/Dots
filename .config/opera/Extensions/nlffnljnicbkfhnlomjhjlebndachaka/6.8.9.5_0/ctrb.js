// Extension for Opera Browser - Magic Actions for YouTube™ - CHROMEACTIONS.COM - Copyright 2015 Vlad and Serge Strukoff - All Rights Reserved
window.addEventListener("load",function(){function e(a){var c=window.innerWidth*window.devicePixelRatio;d=null;b("qr").innerHTML="";document.body.style.setProperty("font-size",(1E3>c?75:parseInt(c/13.66))+"%");a&&f()}function f(){var a=b("qr"),c="http://mixesoft.com/app/donate.php?m="+b("ppPrice").value;d?d.makeCode(c):d=new QRCode(a,{text:c,width:a.offsetWidth,height:a.offsetHeight})}function k(a){this.paused?this.play():this.pause();a.stopPropagation()}function b(a){return document.getElementById(a)}
var d;e();setTimeout(function(){var a,c=b("rng"),d=b("amnt");a=b("paypal");var e=b("bitpay"),g=b("ppPrice"),h=b("bpPrice");b("ppItemName").value=b("bpItemDesc").value="Donation for Magic Actions - Opera Edition";b("ppBusiness").value="webmaster@mixesoft.com";b("bpData").value="QssHQDbRWfw8q4ZrIXbQo39IRne2n99dmkMZHZ5U30pSjGO7mKX1oewbiLiSkZZ/mGmWzLvaYuMrDax7AZNkZg/3mLE2npzjwC0mUH+rwp+cScWvicGSP0ZnXXiAsFjClAJtBZ5C3Y5NgMS3TM4AUP+5v7WRXGDnMsNdxjuPIYao/vi8ici0swhr4lXPpmZAehzTcDKd5jqiCm1cx0Fjd/orQchtC44wHDamnN/JVpLQrLuZahb8NP10wkQXo7sefDInqAmVgSjNpaOGjcpd2g==";
d.textContent="$ "+c.value;c.addEventListener("change",function(a){d.textContent="$ "+c.value;g.value=h.value=c.value;f();a.stopPropagation()},!1);a.addEventListener("submit",function(){var a=g.value;return isNaN(a)||2>a||100<a?!1:!0},!1);e.addEventListener("submit",function(){var a=h.value;return isNaN(a)||2>a||100<a?!1:!0},!1);a=document.createElement("script");a.onload=function(){f()};a.src="qr.js";document.head.appendChild(a);b("video").addEventListener("click",k,!1);chrome.runtime.sendMessage('{"id":1,"ga":{"ea":"extctrb"}}')},
250);window.addEventListener("resize",e,!1)},!1);
