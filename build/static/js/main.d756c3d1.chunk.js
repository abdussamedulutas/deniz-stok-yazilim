(this.webpackJsonpkrex=this.webpackJsonpkrex||[]).push([[0],{145:function(e,t,a){"use strict";a.r(t);var n=a(8),l=a(81),r=a.n(l),c=a(99),i=a(0),j=a(207),s=a(117),o=a(53),x=a(209),b=(a(97),a(4)),u=window.require("electron").ipcRenderer;function d(e){var t=Object(i.useState)(!1),a=Object(n.a)(t,2),l=a[0],d=a[1],O=Object(i.useState)(!1),h=Object(n.a)(O,2),f=h[0],m=h[1],p=Object(i.useState)(""),g=Object(n.a)(p,2),v=g[0],y=g[1],k=Object(i.useState)(""),w=Object(n.a)(k,2),S=w[0],I=w[1];document.title="Kullan\u0131c\u0131 Giri\u015fi";var B={marginTop:"auto",marginBottom:"auto"};function C(){return(C=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!1),m(!1),e.next=4,u.invoke("auth","login",v,S);case 4:(t=e.sent)?(localStorage.userid=t,m("Giri\u015f Ba\u015far\u0131l\u0131 !"),setTimeout((function(){u.send("reply",{name:v,password:S})}),1e3)):d("Kullan\u0131c\u0131 ad\u0131 veya \u015fifresi hatal\u0131 !");case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(j.a,{height:"100%",display:"flex",children:Object(b.jsxs)(j.a,{width:"300px",height:"400px",margin:"auto",display:"flex",flexDirection:"column",children:[Object(b.jsx)(j.a,{style:B,fontSize:"h4.fontSize",marginBottom:"10px",textAlign:"center",children:"Kullan\u0131c\u0131 Hesab\u0131"}),Object(b.jsx)(j.a,{style:B,children:Object(b.jsx)(s.a,{label:"Ad\u0131n\u0131z",marginBottom:"10px",fullWidth:!0,onChange:function(e){return y(e.target.value)},ariant:"outlined"})}),Object(b.jsx)(j.a,{style:B,children:Object(b.jsx)(s.a,{label:"\u015eifreniz",marginBottom:"10px",fullWidth:!0,onChange:function(e){return I(e.target.value)},ariant:"outlined"})}),Object(b.jsx)(j.a,{style:B,textAlign:"center",children:Object(b.jsx)(o.a,{variant:"outlined",color:"primary",style:{marginTop:"auto"},onClick:function(){return function(){return C.apply(this,arguments)}(v,S)},children:"Kaydet"})}),Object(b.jsxs)(j.a,{style:B,textAlign:"center",children:[l?Object(b.jsx)(x.a,{severity:"warning",children:l}):null,f?Object(b.jsx)(x.a,{severity:"success",children:f}):null]})]})})})}var O=a(208),h=a(195),f=a(200),m=a(204),p=a(196),g=a(192),v=a(197),y=a(198),k=a(199),w=a(201),S=a(202),I=a(203),B=a(205),C=a(206),N=a(82),T=a(43),A=a(107),K=a(44),z=a(104),D=a(193),F=a(194);function M(){var e={marginTop:"auto",marginBottom:"auto"};return Object(b.jsxs)(j.a,{display:"flex",flexDirection:"column",height:"100%",children:[Object(b.jsxs)(j.a,{display:"flex",marginBottom:"20px",children:[Object(b.jsx)(g.a,{style:e}),Object(b.jsx)("h3",{style:Object(N.a)({marginLeft:"10px"},e),children:"T\xfcm \xdcr\xfcnler"}),Object(b.jsxs)(o.a,{variant:"contained",color:"primary",style:Object(N.a)({marginLeft:"auto"},e),children:[Object(b.jsx)(D.a,{}),"\xdcr\xfcn Ekle"]})]}),Object(b.jsx)(j.a,{flex:"1 1 auto",display:"flex",children:Object(b.jsx)(z.a,{checkboxSelection:"true",showColumnRightBorder:!0,showCellRightBorder:!0,columns:[{field:"id",headerName:"ID",hide:!0},{field:"marka",headerName:"Marka",flex:20},{field:"model",headerName:"Model",flex:20},{field:"fiyat",headerName:"Fiyat",flex:10,type:"number"},{field:"renk",headerName:"Renk",flex:20},{field:"kdv",headerName:"K.D.V.",flex:10,type:"number"},{field:"I",headerName:" ",renderCell:function(e){return Object(b.jsx)(q,{})},flex:5,sortable:!1,filterable:!1}],rows:Array(1e3).fill(0).map((function(e,t){return{id:t,marka:G(["Samsung","Sony","Pixel","Casper","Nokia"]),model:G(["A","B","C","D","E","J","Z"])+R(1,5),fiyat:R(1e3,9e3)+"TL",renk:G(["mavi","beyaz","gri","siyah","mor","lacivery","sar\u0131","ye\u015fil","turuncu"]),kdv:G([8,20,32,45,70])+"%"}}))})})]})}function R(e,t){return parseInt(e+Math.random()*t)}function G(e){return e[R(0,e.length)]}function q(){var e=Object(i.useState)(null),t=Object(n.a)(e,2),a=t[0],l=t[1],r=Boolean(a),c=function(){l(null)};return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(T.a,{onClick:function(e){l(e.currentTarget)},children:Object(b.jsx)(F.a,{})}),Object(b.jsxs)(A.a,{anchorEl:a,keepMounted:!0,open:r,onClose:c,children:[Object(b.jsx)(K.a,{onClick:c,children:"D\xfczenle"}),Object(b.jsx)(K.a,{onClick:c,children:"Sil"})]})]})}function E(){var e=Object(i.useState)(1),t=Object(n.a)(e,2),a=t[0],l=t[1];return Object(b.jsxs)(j.a,{display:"flex",flexBasis:"row",height:"100%",overflow:"auto",children:[Object(b.jsx)(j.a,{flex:"0 0 auto",width:"200px",height:"100%",overflow:"auto",style:{boxShadow:"0 0 60px -30px black"},children:Object(b.jsxs)(O.a,{orientation:"vertical",variant:"scrollable",value:a,scrollButtons:"auto",onChange:function(e,t){console.log(t),l(t)},style:{height:"100%"},children:[Object(b.jsx)(h.a,{tabIndex:"0",label:"Faturalar",icon:Object(b.jsx)(p.a,{})}),Object(b.jsx)(h.a,{tabIndex:"1",label:"\xdcr\xfcnler",icon:Object(b.jsx)(g.a,{})}),Object(b.jsx)(h.a,{tabIndex:"2",label:"M\xfc\u015fteriler",icon:Object(b.jsx)(v.a,{})}),Object(b.jsx)(h.a,{tabIndex:"3",label:"Stoklar",icon:Object(b.jsx)(y.a,{})}),Object(b.jsx)(h.a,{tabIndex:"4",label:"Sat\u0131c\u0131lar",icon:Object(b.jsx)(k.a,{})}),Object(b.jsx)(f.a,{}),Object(b.jsx)(h.a,{tabIndex:"5",label:"Kullan\u0131c\u0131lar",icon:Object(b.jsx)(w.a,{})}),Object(b.jsx)(h.a,{tabIndex:"6",label:"Telefon Numaralar\u0131",icon:Object(b.jsx)(S.a,{})}),Object(b.jsx)(f.a,{}),Object(b.jsx)(h.a,{tabIndex:"7",label:"Son i\u015flemler",icon:Object(b.jsx)(I.a,{})}),Object(b.jsx)(h.a,{tabIndex:"8",label:"Yedekleme",icon:Object(b.jsx)(m.a,{className:"fa fa-refresh fa-2x"})}),Object(b.jsx)(h.a,{tabIndex:"9",label:"G\xfcncellemeler",icon:Object(b.jsx)(B.a,{})}),Object(b.jsx)(h.a,{tabIndex:"10",label:"Ayarlar",icon:Object(b.jsx)(C.a,{})})]})}),Object(b.jsxs)(j.a,{flex:"1 1 auto",padding:"20px",children:[Object(b.jsx)(J,{value:a,index:0,title:"Faturalar",children:"0"}),Object(b.jsx)(J,{value:a,index:1,title:"\xdcr\xfcnler",children:Object(b.jsx)(M,{})}),Object(b.jsx)(J,{value:a,index:2,title:"M\xfc\u015fteriler",children:"2"}),Object(b.jsx)(J,{value:a,index:3,title:"Stoklar",children:"3"}),Object(b.jsx)(J,{value:a,index:4,title:"Sat\u0131c\u0131lar",children:"4"}),Object(b.jsx)(J,{value:a,index:6,title:"Kullan\u0131c\u0131lar",children:"5"}),Object(b.jsx)(J,{value:a,index:7,title:"Telefon Numaralar\u0131",children:"5"}),Object(b.jsx)(J,{value:a,index:9,title:"Son i\u015flemler",children:"6"}),Object(b.jsx)(J,{value:a,index:10,title:"Yedekleme",children:"6"}),Object(b.jsx)(J,{value:a,index:11,title:"G\xfcncellemeler",children:"7"}),Object(b.jsx)(J,{value:a,index:12,title:"Ayarlar",children:"7"})]})]})}function J(e){var t=e.value==e.index;return t&&(document.title=e.title),Object(b.jsx)(j.a,{display:t?"block":"none",overflow:"auto",height:"100%",children:e.children})}var L=a(14),W=a(106),Y=a(46),H=a(191),P=window.require("electron").ipcRenderer;function V(){var e=Object(i.useState)(!1),t=Object(n.a)(e,2),a=t[0],l=t[1];return P.on("show-page",(function(e,t){l(t)})),Object(b.jsx)(Z,{screen:a})}function Z(e){switch(e.screen){case"login":return Object(b.jsx)(d,{});case"main":return Object(b.jsx)(E,{});default:return Object(b.jsx)(b.Fragment,{})}}var Q=Object(Y.a)({},W.trTR);Object(L.render)(Object(b.jsx)(H.a,{theme:Q,children:Object(b.jsx)(V,{})}),document.querySelector("#root"))},97:function(e,t,a){}},[[145,1,2]]]);
//# sourceMappingURL=main.d756c3d1.chunk.js.map