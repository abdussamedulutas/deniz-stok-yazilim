(this.webpackJsonpkrex=this.webpackJsonpkrex||[]).push([[0],{46:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(19),l=a(42),c=a.n(l),r=a(47),i=a(0),j=a(120),s=a(118),x=a(104),o=a(122),b=(a(46),a(4)),u=window.require("electron").ipcRenderer;function d(e){var t=Object(i.useState)(!1),a=Object(n.a)(t,2),l=a[0],d=a[1],O=Object(i.useState)(!1),h=Object(n.a)(O,2),f=h[0],p=h[1],v=Object(i.useState)(""),m=Object(n.a)(v,2),g=m[0],y=m[1],w=Object(i.useState)(""),S=Object(n.a)(w,2),k=S[0],I=S[1];document.title="Kullan\u0131c\u0131 Giri\u015fi";var B={marginTop:"auto",marginBottom:"auto"};function A(){return(A=Object(r.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!1),p(!1),e.next=4,u.invoke("auth","login",g,k);case 4:(t=e.sent)?(localStorage.userid=t,p("Giri\u015f Ba\u015far\u0131l\u0131 !"),setTimeout((function(){u.send("reply",{name:g,password:k})}),1e3)):d("Kullan\u0131c\u0131 ad\u0131 veya \u015fifresi hatal\u0131 !");case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(j.a,{height:"100%",display:"flex",children:Object(b.jsxs)(j.a,{width:"300px",height:"400px",margin:"auto",display:"flex",flexDirection:"column",children:[Object(b.jsx)(j.a,{style:B,fontSize:"h4.fontSize",marginBottom:"10px",textAlign:"center",children:"Kullan\u0131c\u0131 Hesab\u0131"}),Object(b.jsx)(j.a,{style:B,children:Object(b.jsx)(s.a,{label:"Ad\u0131n\u0131z",marginBottom:"10px",fullWidth:!0,onChange:function(e){return y(e.target.value)},ariant:"outlined"})}),Object(b.jsx)(j.a,{style:B,children:Object(b.jsx)(s.a,{label:"\u015eifreniz",marginBottom:"10px",fullWidth:!0,onChange:function(e){return I(e.target.value)},ariant:"outlined"})}),Object(b.jsx)(j.a,{style:B,textAlign:"center",children:Object(b.jsx)(x.a,{variant:"outlined",color:"primary",style:{marginTop:"auto"},onClick:function(){return function(){return A.apply(this,arguments)}(g,k)},children:"Kaydet"})}),Object(b.jsxs)(j.a,{style:B,textAlign:"center",children:[l?Object(b.jsx)(o.a,{severity:"warning",children:l}):null,f?Object(b.jsx)(o.a,{severity:"success",children:f}):null]})]})})})}var O=a(121),h=a(105),f=a(111),p=a(115),v=a(106),m=a(107),g=a(108),y=a(109),w=a(110),S=a(112),k=a(113),I=a(114),B=a(116),A=a(117);function K(){return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(j.a,{display:"flex",children:Object(b.jsx)("h3",{children:"T\xfcm \xdcr\xfcnler"})})})}function T(){var e=Object(i.useState)(1),t=Object(n.a)(e,2),a=t[0],l=t[1];return Object(b.jsxs)(j.a,{display:"flex",flexBasis:"row",height:"100%",overflow:"auto",children:[Object(b.jsx)(j.a,{flex:"0 0 auto",width:"200px",height:"100%",overflow:"auto",style:{boxShadow:"0 0 60px -30px black"},children:Object(b.jsxs)(O.a,{orientation:"vertical",variant:"scrollable",value:a,scrollButtons:"auto",onChange:function(e,t){console.log(t),l(t)},style:{height:"100%"},children:[Object(b.jsx)(h.a,{tabIndex:"0",label:"Faturalar",icon:Object(b.jsx)(v.a,{})}),Object(b.jsx)(h.a,{tabIndex:"1",label:"\xdcr\xfcnler",icon:Object(b.jsx)(m.a,{})}),Object(b.jsx)(h.a,{tabIndex:"2",label:"M\xfc\u015fteriler",icon:Object(b.jsx)(g.a,{})}),Object(b.jsx)(h.a,{tabIndex:"3",label:"Stoklar",icon:Object(b.jsx)(y.a,{})}),Object(b.jsx)(h.a,{tabIndex:"4",label:"Sat\u0131c\u0131lar",icon:Object(b.jsx)(w.a,{})}),Object(b.jsx)(f.a,{}),Object(b.jsx)(h.a,{tabIndex:"5",label:"Kullan\u0131c\u0131lar",icon:Object(b.jsx)(S.a,{})}),Object(b.jsx)(h.a,{tabIndex:"6",label:"Telefon Numaralar\u0131",icon:Object(b.jsx)(k.a,{})}),Object(b.jsx)(f.a,{}),Object(b.jsx)(h.a,{tabIndex:"7",label:"Son i\u015flemler",icon:Object(b.jsx)(I.a,{})}),Object(b.jsx)(h.a,{tabIndex:"8",label:"Yedekleme",icon:Object(b.jsx)(p.a,{className:"fa fa-refresh fa-2x"})}),Object(b.jsx)(h.a,{tabIndex:"9",label:"G\xfcncellemeler",icon:Object(b.jsx)(B.a,{})}),Object(b.jsx)(h.a,{tabIndex:"10",label:"Ayarlar",icon:Object(b.jsx)(A.a,{})})]})}),Object(b.jsxs)(j.a,{flex:"1 1 auto",padding:"20px",children:[Object(b.jsx)(F,{value:a,index:0,title:"Faturalar",children:"0"}),Object(b.jsx)(F,{value:a,index:1,title:"\xdcr\xfcnler",children:Object(b.jsx)(K,{})}),Object(b.jsx)(F,{value:a,index:2,title:"M\xfc\u015fteriler",children:"2"}),Object(b.jsx)(F,{value:a,index:3,title:"Stoklar",children:"3"}),Object(b.jsx)(F,{value:a,index:4,title:"Sat\u0131c\u0131lar",children:"4"}),Object(b.jsx)(F,{value:a,index:6,title:"Kullan\u0131c\u0131lar",children:"5"}),Object(b.jsx)(F,{value:a,index:7,title:"Telefon Numaralar\u0131",children:"5"}),Object(b.jsx)(F,{value:a,index:9,title:"Son i\u015flemler",children:"6"}),Object(b.jsx)(F,{value:a,index:10,title:"Yedekleme",children:"6"}),Object(b.jsx)(F,{value:a,index:11,title:"G\xfcncellemeler",children:"7"}),Object(b.jsx)(F,{value:a,index:12,title:"Ayarlar",children:"7"})]})]})}function F(e){var t=e.value==e.index;return t&&(document.title=e.title),Object(b.jsx)(j.a,{display:t?"block":"none",overflow:"auto",children:e.children})}var z=a(9),C=window.require("electron").ipcRenderer;function G(){var e=Object(i.useState)(!1),t=Object(n.a)(e,2),a=t[0],l=t[1];return C.on("show-page",(function(e,t){l(t)})),Object(b.jsx)(q,{screen:a})}function q(e){switch(e.screen){case"login":return Object(b.jsx)(d,{});case"main":return Object(b.jsx)(T,{});default:return Object(b.jsx)(b.Fragment,{})}}Object(z.render)(Object(b.jsx)(G,{}),document.querySelector("#root"))}},[[71,1,2]]]);
//# sourceMappingURL=main.6e4ffe4c.chunk.js.map