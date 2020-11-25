(this["webpackJsonpphoto-app"]=this["webpackJsonpphoto-app"]||[]).push([[0],{25:function(n,t,e){},37:function(n,t,e){},44:function(n,t,e){"use strict";e.r(t);var o=e(2),i=e(3),c=e.n(i),r=e(26),a=e.n(r),l=(e(37),e(7)),s=e(4),u=e(5);function d(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n"]);return d=function(){return n},n}function f(){var n=Object(s.a)(["\n    display: flex;\n    flex-direction: column;\n"]);return f=function(){return n},n}function h(){var n=Object(s.a)(["\n    color: white;\n"]);return h=function(){return n},n}function j(){var n=Object(s.a)(["\n    display:inline-block;\n    padding: 0.35em 1.2em;\n    border: 0.1em solid #FFFFFF;\n    margin: 0 0.3em 0.3em 0;\n    border-radius:0.12em;\n    box-sizing: border-box;\n    text-decoration:none;\n    font-weight:300;\n    color:#FFFFFF;\n    text-align:center;\n    transition: all 0.2s;\n    background-color: transparent;\n    width: 120px;\n    font-size: 20px;\n    transition: color 300ms;\n    transition: background-color 350ms;\n\n    &:hover{\n        background-color: white;\n        color: black;\n        cursor: pointer;\n    }\n"]);return j=function(){return n},n}function p(){var n=Object(s.a)(["\n    width: 400px;\n    height: 30px;\n    font-size: 20px;\n    transition: height 500ms;\n\n    &:focus {\n        height: 40px;\n    }\n"]);return p=function(){return n},n}var m=u.a.input(p()),b=u.a.button(j()),g=u.a.div(h()),v=u.a.div(f()),x=u.a.div(d()),O=e(21),w=(e(39),O.a.initializeApp({apiKey:"AIzaSyDdoQaGgfQzmsXKHgytAROdzRjVaw_wE3M",authDomain:"photos-634e7.firebaseapp.com",databaseURL:"https://photos-634e7.firebaseio.com",projectId:"photos-634e7",storageBucket:"photos-634e7.appspot.com",messagingSenderId:"23335646481",appId:"1:23335646481:web:f6d39ff77620ebd80388b0",measurementId:"G-K4NLQYSDWM"}).firestore());O.a;function y(){var n=Object(s.a)(["\n    cursor: pointer;\n    -webkit-touch-callout: none; \n    -webkit-user-select: none; \n    -khtml-user-select: none; \n    -moz-user-select: none; \n    -ms-user-select: none; \n    user-select: none; \n"]);return y=function(){return n},n}function I(){var n=Object(s.a)(["\n    width: 90%;\n    padding: 0;\n    margin: 0;\n    list-style-type: none;\n    color: whitesmoke;\n    display: flex;\n    justify-content: space-between;\n    font-size: 25px;\n"]);return I=function(){return n},n}function P(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n"]);return P=function(){return n},n}var C=u.a.div(P()),k=u.a.ul(I()),F=u.a.li(y()),E=function(n){var t=function(t){var e=[];w.collection("posts").where("continent","==",t).get().then((function(t){t.docs.forEach((function(n){e.push(n.data())})),console.log(e),n.setHomePhotoInformation(e)}))};return Object(o.jsxs)(C,{className:"test",children:[Object(o.jsxs)(k,{children:[Object(o.jsx)(F,{onClick:function(){return t("North America")},children:"NORTH AMERICA"}),Object(o.jsx)(F,{onClick:function(){return t("South America")},children:"SOUTH AMERICA"}),Object(o.jsx)(F,{onClick:function(){return t("Europe")},children:"EUROPE"}),Object(o.jsx)(F,{onClick:function(){return t("Oceania")},children:"OCEANIA"}),Object(o.jsx)(F,{onClick:function(){return t("Asia")},children:"ASIA"}),Object(o.jsx)(F,{onClick:function(){return t("Africa")},children:"AFRICA"})]}),n.user?Object(o.jsx)(b,{onClick:function(){return n.setPageRoute("Upload")},children:"Upload"}):null,n.user?Object(o.jsx)(b,{onClick:function(){return n.setPageRoute("Profile")},children:"Profile"}):Object(o.jsx)(b,{onClick:function(){return n.setPageRoute("Login")},children:"Log in"})]})};function S(){var n=Object(s.a)(["\n    -webkit-overflow-scrolling: touch;\n    height: ",";\n    max-height: ",";\n    overflow-Y: scroll;\n"]);return S=function(){return n},n}var R=u.a.div(S(),(function(n){return n.scrollHeight}),(function(n){return n.maxHeight})),A=function(n){return Object(o.jsx)(R,{scrollHeight:n.scrollHeight,children:n.children})},N=e(10),L=function(n){var t=N.a.firestore.FieldValue.increment(1);w.collection("preview-posts").doc(n).update({views:t}).then((function(){return null}))};function z(){var n=Object(s.a)(["\n    height: 300px;\n    width: auto;\n    padding-right: 10px;\n    cursor: pointer;\n"]);return z=function(){return n},n}function B(){var n=Object(s.a)(["\n    overflow-x: scroll;\n    display: flex;\n    -webkit-overflow-scrolling: touch;\n"]);return B=function(){return n},n}function H(){var n=Object(s.a)(["\n    color: white;\n    cursor: pointer;\n"]);return H=function(){return n},n}function D(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-end;\n"]);return D=function(){return n},n}function M(){var n=Object(s.a)(["\n    color: white;\n    font-size: 25px\n"]);return M=function(){return n},n}var G=u.a.div(M()),T=u.a.div(D()),U=u.a.div(H()),Y=u.a.div(B()),V=u.a.img(z()),K=function(n){return Object(o.jsx)("div",{children:Object(o.jsx)(V,{onClick:function(){n.setCollectionsList([]),n.getFeaturedPhotoInfo(n.info.id),w.collection("preview-posts").where("image","==",n.url).get().then((function(n){L(n.docs[0].ref.id)}))},className:"grid-item",alt:"",src:n.url})})},Q=function(n){return Object(o.jsx)("div",{children:n.photos?Object(o.jsxs)("div",{children:[Object(o.jsxs)(T,{children:[Object(o.jsx)(G,{children:n.title}),Object(o.jsx)(U,{onClick:function(){var t=[];w.collection("posts").where(n.place,"==",n.placeName).get().then((function(e){e.docs.forEach((function(n){t.push(n.data())})),n.setHomePhotoInformation(t),n.setPageRoute("GetPhotos")}))},children:"See more"})]}),Object(o.jsx)(Y,{children:n.photos.map((function(t,e){return t.image!==n.photoInformation.image?Object(o.jsx)(K,{setCollectionsList:n.setCollectionsList,getFeaturedPhotoInfo:n.getFeaturedPhotoInfo,getPost:n.getPost,getCountries:n.getCountries,setPhotoInformation:n.setPhotoInformation,setHomePhotoInformation:n.setHomePhotoInformation,info:t,url:t.image},e):null}))})]}):null})},_=e(22),J=e(12);function W(){var n=Object(s.a)(["\n    height: 35px;\n"]);return W=function(){return n},n}function X(){var n=Object(s.a)(["\n    display:inline-block;\n    border: 0.1em solid #FFFFFF;\n    margin: 0 0.3em 0.3em 0;\n    border-radius:0.12em;\n    box-sizing: border-box;\n    color: white;\n    background-color: black;\n    height: 30px;\n    font-size: 17px;\n"]);return X=function(){return n},n}function q(){var n=Object(s.a)(["\n    display:inline-block;\n    padding: 0.35em 1.2em;\n    border: 0.1em solid #FFFFFF;\n    margin: 0 0.3em 0.3em 0;\n    border-radius:0.12em;\n    box-sizing: border-box;\n    text-decoration:none;\n    font-weight:300;\n    color:#FFFFFF;\n    text-align:center;\n    transition: all 0.2s;\n    background-color: transparent;\n    width: 200px;\n    font-size: 15px;\n    transition: background-color 350ms;\n    cursor: pointer;\n"]);return q=function(){return n},n}function Z(){var n=Object(s.a)(["\n    color: red;\n"]);return Z=function(){return n},n}function $(){var n=Object(s.a)(["\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    font-size: 18px;\n    height: 30px;\n    &:hover {\n        background-color: gray;\n    }\n"]);return $=function(){return n},n}function nn(){var n=Object(s.a)(["\n    width: 250px;\n    background-color: black;\n    position: absolute;\n"]);return nn=function(){return n},n}var tn=u.a.div(nn()),en=u.a.div($()),on=u.a.div(Z()),cn=u.a.button(q()),rn=u.a.input(X()),an=u.a.button(W()),ln=function(n){var t=function(t){var o={preview:N.a.firestore.FieldValue.delete()};t&&(o.timestamp=Date.now());var c=w.collection("users").doc(n.user);c.collection("collection-names").doc(n.collection).update(o).then((function(){c.collection("collections").where("collection","==",n.collection).orderBy("timestamp","desc").limit(4).get().then((function(o){var r=[];o.docs.forEach((function(n){r.push(n.data().image)})),c.collection("collection-names").doc(n.collection).set({preview:r},{merge:!0}),t?e():i()}))}))},e=function(){var t=n.collectionsList;t[n.index][1]=!0,n.setCollectionsList(Object(J.a)(t))},i=function(){var t=n.collectionsList;t[n.index][1]=!1,n.setCollectionsList(Object(J.a)(t))};return Object(o.jsxs)(en,{className:"dropdown",onClick:null,children:[Object(o.jsx)("div",{className:"dropdown",children:n.collection}),n.collectionsList.length>0?n.bool?Object(o.jsx)("div",{style:{cursor:"pointer"},className:"dropdown",onClick:function(){w.collection("users").doc(n.user).collection("collections").where("image","==",n.photoInformation.image).where("collection","==",n.collection).get().then((function(n){n.docs[0].ref.delete().then((function(){t(!1)}))}))},children:"Remove"}):Object(o.jsx)("div",{style:{cursor:"pointer"},className:"dropdown",onClick:function(){var e=w.collection("users").doc(n.user).collection("collections");n.bool||e.where("image","==",n.photoInformation.image).where("collection","==",n.collection).get().then((function(o){0===o.docs.length&&e.add({id:n.photoInformation.id,image:n.photoInformation.image,country:n.photoInformation.country,city:n.photoInformation.city,title:n.photoInformation.title,collection:n.collection,timestamp:Date.now()}).then((function(){t(!0)}))}))},children:"Add"}):null]})},sn=function(n){var t,e=Object(i.useState)(!1),c=Object(l.a)(e,2),r=c[0],a=c[1],s=Object(i.useState)(!1),u=Object(l.a)(s,2),d=u[0],f=u[1];return Object(o.jsxs)(tn,{children:[Object(o.jsx)(A,{scrollHeight:"120px",maxHeight:"200px",children:null===(t=n.collectionsList)||void 0===t?void 0:t.map((function(t,e){return Object(o.jsx)(ln,{setCollectionsList:n.setCollectionsList,collectionsList:n.collectionsList,setCollectionsBoolArray:n.setCollectionsBoolArray,collectionsBoolArray:n.collectionsBoolArray,index:e,className:"dropdown",user:n.user,photoInformation:n.photoInformation,collection:t[0],bool:t[1]},e)}))}),r?Object(o.jsxs)("div",{children:[Object(o.jsx)(rn,{autoComplete:"off",placeholder:"collection name",id:"collection-name",className:"dropdown"}),Object(o.jsx)(an,{onClick:function(){var t=document.getElementById("collection-name").value;!n.collectionsList.includes(t)&&t.length>0?w.collection("users").doc(n.user).collection("collection-names").doc(t).set({name:t,timestamp:Date.now(),preview:[n.photoInformation.image]},{merge:!0}).then((function(){!function(t){var e=w.collection("users").doc(n.user).collection("collections");e.where("image","==",n.photoInformation.image).where("collection","==",t).get().then((function(o){0===o.docs.length&&e.add(Object(_.a)(Object(_.a)({},n.photoInformation),{},{collection:t,timestamp:Date.now()}))}))}(t),n.setCollectionsList([[t,!0]].concat(Object(J.a)(n.collectionsList))),f(!1),document.getElementById("collection-name").value=""})):f(!0)},className:"dropdown",children:"Enter"})]}):Object(o.jsx)(cn,{onClick:function(){return a(!0)},className:"dropdown",children:"Create new collection"}),d?Object(o.jsx)(on,{children:"Collection already exists"}):null]})};function un(){var n=Object(s.a)(["\n    height: 500px;\n    width: auto;\n    position: relative;\n"]);return un=function(){return n},n}function dn(){var n=Object(s.a)(["\n    width: 60vw;\n    height: 40px;\n    font-size: 20px;\n"]);return dn=function(){return n},n}function fn(){var n=Object(s.a)(["\n    width: 60vw;\n    height: 150px;\n    font-size: 20px;\n"]);return fn=function(){return n},n}function hn(){var n=Object(s.a)(["\n    width: 60vw;\n    height: 40px;\n    font-size: 20px;\n"]);return hn=function(){return n},n}function jn(){var n=Object(s.a)(["\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n"]);return jn=function(){return n},n}function pn(){var n=Object(s.a)(["\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%,-50%);\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: column; \n    align-items: center;\n"]);return pn=function(){return n},n}function mn(){var n=Object(s.a)(["\n    color: white;\n    background-color: #ff6257;\n    border: none;\n    width: 60vw;\n    height: 50px;\n    cursor: pointer;\n    transition: background-color 400ms;\n\n    &:hover {\n        /* background-color: #212121; */\n    }\n"]);return mn=function(){return n},n}function bn(){var n=Object(s.a)(["\n    color: white;\n    background-color: #141414;\n    border: none;\n    width: 60vw;\n    height: 50px;\n    cursor: pointer;\n    transition: background-color 400ms;\n\n    &:hover {\n        background-color: #212121;\n    }\n"]);return bn=function(){return n},n}function gn(){var n=Object(s.a)(["\n    color: white;\n    background-color: #141414;\n    border: none;\n    width: 120px;\n    height: 50px;\n    cursor: pointer;\n    transition: background-color 400ms;\n\n    &:hover {\n        background-color: #212121;\n    }\n"]);return gn=function(){return n},n}var vn=u.a.button(gn()),xn=u.a.button(bn()),On=u.a.button(mn()),wn=u.a.div(pn()),yn=u.a.div(jn()),In=u.a.input(hn()),Pn=u.a.textarea(fn()),Cn=u.a.select(dn()),kn=(u.a.img(un()),e(30)),Fn=e.n(kn);function En(){var n=Object(s.a)(["\n    width: 70vw;\n"]);return En=function(){return n},n}function Sn(){var n=Object(s.a)(["\n    color: white;\n    padding: 0 20%;\n    font-size: 20px;\n    white-space: pre-wrap;\n    text-align: justify;\n    text-justify: inter-word;\n"]);return Sn=function(){return n},n}function Rn(){var n=Object(s.a)(["\n    color: white;\n"]);return Rn=function(){return n},n}function An(){var n=Object(s.a)(["\n    width: 90vw;\n"]);return An=function(){return n},n}function Nn(){var n=Object(s.a)(["\n    color: white;\n    font-size: 40px;\n"]);return Nn=function(){return n},n}function Ln(){var n=Object(s.a)(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n"]);return Ln=function(){return n},n}function zn(){var n=Object(s.a)(["\n    width: 80%;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n"]);return zn=function(){return n},n}function Bn(){var n=Object(s.a)(["\n    display: flex;\n    flex-direction: column;\n    /* justify-content: center; */\n    align-items: center;\n"]);return Bn=function(){return n},n}var Hn=u.a.div(Bn()),Dn=u.a.div(zn()),Mn=u.a.div(Ln()),Gn=u.a.div(Nn()),Tn=u.a.img(An()),Un=u.a.div(Rn()),Yn=u.a.div(Sn()),Vn=u.a.img(En()),Kn=function(n){var t,e,c,r,a,s,u,d,f=Object(i.useState)([]),h=Object(l.a)(f,2),j=h[0],p=h[1],m=Object(i.useState)(null),b=Object(l.a)(m,2),g=b[0],v=b[1],x=Object(i.useState)(null),O=Object(l.a)(x,2),y=O[0],I=O[1],P=Object(i.useState)([]),C=Object(l.a)(P,2),k=C[0],F=C[1],E=Object(i.useState)([]),S=Object(l.a)(E,2),R=S[0],A=S[1],N=function(){var t=n.photoInformation,e=t.city,o=t.continent,i=t.country,c=w.collection("preview-posts").where("continent","==",o).where("country","==",i);c.where("city","==",e).get().then((function(n){var t=[];n.forEach((function(n){t.push(n.data())})),A(t)})),c.get().then((function(n){var t=[];n.docs.forEach((function(n){t.push(n.data())})),F(t)})),window.scrollTo({top:0})},L=function(n){w.collection("posts").doc(n).get().then((function(n){N(n.data())}))};Object(i.useEffect)((function(){return N(n.photoInformation.id)}),[]);return window.onclick=function(n){n.target.matches(".dropdown")||I(!1)},Object(o.jsxs)("div",{children:[Object(o.jsx)(vn,{onClick:function(){return n.setPageRoute("GetPhotos")},children:"Back"}),Object(o.jsxs)(Hn,{children:[Object(o.jsx)(Gn,{children:null===(t=n.photoInformation)||void 0===t?void 0:t.title}),Object(o.jsx)(Tn,{alt:"display",src:null===n||void 0===n||null===(e=n.photoInformation)||void 0===e?void 0:e.image}),Object(o.jsxs)(Dn,{children:[(null===n||void 0===n?void 0:n.user)?Object(o.jsxs)("div",{children:[Object(o.jsx)(vn,{className:"dropdown",onClick:function(){0===(null===j||void 0===j?void 0:j.length)?function(){var t=[];w.collection("users").doc(n.user).collection("collection-names").orderBy("timestamp","desc").get().then((function(e){e.docs.length>0?e.docs.forEach((function(o,i){var c=[];c.push(o.data().name),w.collection("users").doc(n.user).collection("collections").where("collection","==",o.data().name).where("id","==",n.photoInformation.id).get().then((function(n){n&&(n.docs.length>0?c.push(!0):c.push(!1)),t.push(c),i+1===e.docs.length&&(p(t),I(!y))}))})):I(!y)}))}():I(!y)},children:Object(o.jsx)("div",{className:"dropdown",children:"Add to collection"})}),y?Object(o.jsx)(sn,{photoInformation:n.photoInformation,setCollectionsBoolArray:v,collectionsBoolArray:g,className:"dropdown",user:n.user,collectionsList:j,setCollectionsList:p}):null]}):null,Object(o.jsx)(Un,{children:null===(c=n.photoInformation)||void 0===c?void 0:c.author}),Object(o.jsx)(Un,{children:Fn()(null===(r=n.photoInformation)||void 0===r?void 0:r.timestamp).format("MMMM Do YYYY")})]})]}),null===(a=n.photoInformation)||void 0===a?void 0:a.content.map((function(t,e){return Object(o.jsxs)(Mn,{children:[Object(o.jsx)(Yn,{children:t}),Object(o.jsx)(Vn,{src:n.photoInformation.images[e]})]},e)})),Object(o.jsx)(Q,{setCollectionsList:p,getFeaturedPhotoInfo:n.getFeaturedPhotoInfo,getPost:L,getCountries:N,setHomePhotoInformation:n.setHomePhotoInformation,setPageRoute:n.setPageRoute,placeName:null===n||void 0===n?void 0:n.city,place:"city",title:null===(s=n.photoInformation)||void 0===s?void 0:s.city,photoInformation:n.photoInformation,photos:R,setPhotoInformation:n.setPhotoInformation}),Object(o.jsx)(Q,{setCollectionsList:p,getFeaturedPhotoInfo:n.getFeaturedPhotoInfo,getPost:L,setHomePhotoInformation:n.setHomePhotoInformation,setPageRoute:n.setPageRoute,placeName:null===(u=n.photoInformation)||void 0===u?void 0:u.country,place:"country",title:null===(d=n.photoInformation)||void 0===d?void 0:d.country,setPhotoInformation:n.setPhotoInformation,photos:k,photoInformation:n.photoInformation})]})},Qn=(e(25),function(n){var t,e=function(){var n=t.getPlace();(null===n||void 0===n?void 0:n.name)?console.log("autocomplete"):document.getElementById("autocomplete").placeholder="Enter a place"};return Object(o.jsx)("div",{children:Object(o.jsx)("input",{onChange:function(){(t=new google.maps.places.Autocomplete(document.getElementById("autocomplete"),{types:["(cities)"]})).addListener("place_changed",e),console.log("autocomplete")},id:"autocomplete"})})}),_n=function(n){var t=Object(i.useState)(null),e=Object(l.a)(t,2),c=e[0],r=e[1],a=Object(i.useState)(null),s=Object(l.a)(a,2),u=s[0],d=s[1],f=Object(i.useState)(!1),h=Object(l.a)(f,2),j=h[0],p=h[1],m=Object(i.useState)(!1),b=Object(l.a)(m,2),g=b[0],v=b[1],x=function(){document.getElementsByClassName("additional-item").length>0?v(!0):v(!1)};return Object(o.jsxs)("div",{children:[Object(o.jsx)(vn,{onClick:function(){return n.setPageRoute("GetPhotos")},children:"Back"}),Object(o.jsx)(wn,{children:Object(o.jsxs)(yn,{children:[Object(o.jsxs)("div",{id:"content-form",children:[Object(o.jsx)("label",{children:"Main photo"}),Object(o.jsx)("br",{}),Object(o.jsx)("input",{type:"file",className:"photo-input"}),Object(o.jsx)("br",{}),Object(o.jsx)("label",{children:"Title"}),Object(o.jsx)(In,{onChange:function(n){return r(n.target.value)}}),Object(o.jsx)("label",{children:"Your name"}),Object(o.jsx)(In,{onChange:function(n){return d(n.target.value)}}),Object(o.jsx)("label",{htmlFor:"category",children:"Category"}),Object(o.jsxs)(Cn,{name:"category",id:"category",children:[Object(o.jsx)("option",{value:"",defaultValue:!0,children:"Select category"}),Object(o.jsx)("option",{value:"restaurant",children:"Restaurant"}),Object(o.jsx)("option",{value:"entertainment",children:"Entertainment"}),Object(o.jsx)("option",{value:"adventure",children:"Adventure"}),Object(o.jsx)("option",{value:"sightseeing",children:"Sightseeing"}),Object(o.jsx)("option",{value:"shopping",children:"Shopping"}),Object(o.jsx)("option",{value:"museum",children:"Museum"})]}),Object(o.jsx)("label",{children:"Select City"}),Object(o.jsx)(Qn,{}),Object(o.jsx)("label",{children:"First paragraph"}),Object(o.jsx)(Pn,{className:"content-paragraph"})]}),g?Object(o.jsx)(On,{type:"button",onClick:function(){var n=document.getElementById("content-form");n.removeChild(n.lastChild),p(!j),x()},children:"Remove last element"}):null,j?Object(o.jsx)(xn,{type:"button",onClick:function(){var n=document.createElement("textarea");n.className="add-content-description-input content-paragraph additional-item",document.getElementById("content-form").appendChild(n),p(!j),x()},children:"Add paragraph"}):Object(o.jsx)(xn,{type:"button",onClick:function(){var n=document.createElement("input");n.type="file",n.className="photo-input additional-item",n.setAttribute("multiple",""),n.setAttribute("accept","image/jpeg, image/png, image/jpg, image/tif"),document.getElementById("content-form").appendChild(n),p(!j),x()},children:"Add image"}),Object(o.jsx)("br",{}),Object(o.jsx)(vn,{type:"button",onClick:function(){var t=[],e=[],o=document.getElementsByClassName("photo-input");if(o.length>0)for(var i=function(i){var r=o[i].files[0],a={contentType:r.type};N.a.storage().ref().child(r.name).put(r,a).then((function(r){r.ref.getDownloadURL().then((function(r){0===i?e.push(r):t.push(r),i===o.length-1&&function(t,e){for(var o=document.getElementById("autocomplete").value.split(","),i=o[o.length-1].trim(),r=o[0],a=document.getElementById("category").value,l=Date.now(),s=[],d=document.getElementsByClassName("content-paragraph"),f=0;f<d.length;f++)s.push(String(d[f].value));w.collection("continents-countries").doc("map").collection(i).where(i,"in",["North America","South America","Asia","Europe","Oceania","Africa"]).get().then((function(o){var d=o.docs[0].data()[i];w.collection("posts").add({content:s,images:t,title:c,timestamp:l,image:e,category:a,city:r,country:i,continent:d,author:u,views:0}).then((function(t){w.collection("users").doc(n.user).collection("posts").doc(t.id).set({reference:"posts/".concat(t.id),timestamp:l,id:t.id,title:c,image:e,views:0,city:r,country:i,continent:d},{merge:!0}).then((function(){w.collection("posts").doc(t.id).set({id:t.id},{merge:!0})})).then((function(){w.collection("preview-posts").add({reference:"/posts/".concat(t.id),timestamp:l,id:t.id,title:c,image:e,views:0,category:a,city:r,country:i,continent:d}).then((function(){return console.log("uploaded")}))}))}))}))}(t,e)})).catch((function(n){return console.log(n)}))}))},r=0;r<o.length;r++)i(r)},children:"Submit"})]})})]})};function Jn(){var n=Object(s.a)(["\n    height: 40px;\n    width: 150px;\n    color: white;\n    background-color: black;\n    border: none;\n    border-radius: 5%;\n    margin-bottom: 10px;\n    font-size: 15px;\n"]);return Jn=function(){return n},n}function Wn(){var n=Object(s.a)(["\n    margin: 0 15px;\n    margin-left: 35px;\n"]);return Wn=function(){return n},n}function Xn(){var n=Object(s.a)(["\n\n    cursor: pointer;\n\n    &:hover ","{\n        opacity: 1;\n    }\n\n    &:hover ","{\n        opacity: 1;\n    }\n\n    &:hover "," {\n        filter: brightness(.3)\n    }\n"]);return Xn=function(){return n},n}function qn(){var n=Object(s.a)(["\n    margin-bottom: 15px;\n    filter: brightness(1);\n    transition: 800ms ease;\n    transition-delay: 350ms;\n\n    width: ",";\n\n    @media(max-width: 520px) {\n        width: 40vw;\n    }\n\n    @media(max-width: 400px) {\n        width: 90vw;\n    }\n\n    animation: fadeIn ease 3s;\n    -webkit-animation: fadeIn ease 3s;\n    -moz-animation: fadeIn ease 3s;\n    -o-animation: fadeIn ease 3s;\n    -ms-animation: fadeIn ease 3s;\n    \n    @keyframes fadeIn {\n        0% {opacity:0;}\n        100% {opacity:1;}\n    }\n\n    @-moz-keyframes fadeIn {\n        0% {opacity:0;}\n        100% {opacity:1;}\n    }\n\n    @-webkit-keyframes fadeIn {\n        0% {opacity:0;}\n        100% {opacity:1;}\n    }\n\n    @-o-keyframes fadeIn {\n        0% {opacity:0;}\n        100% {opacity:1;}\n    }\n\n    @-ms-keyframes fadeIn {\n        0% {opacity:0;}\n        100% {opacity:1;}\n    }\n"]);return qn=function(){return n},n}function Zn(){var n=Object(s.a)(["\n    position: absolute;\n    top: 57%;\n    left: 50%;\n    margin-left: -5px;\n    transform: translate(-50%, -50%);\n    opacity: 0;\n    transition: opacity 500ms;\n    transition-delay: 350ms;\n    font-size: 20px;\n    white-space: nowrap;\n"]);return Zn=function(){return n},n}function $n(){var n=Object(s.a)(["\n    position: absolute;\n    top: 43%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    opacity: 0;\n    transition: opacity 500ms;\n    transition-delay: 350ms;\n    font-size: 30px;\n"]);return $n=function(){return n},n}function nt(){var n=Object(s.a)(["\n    position: relative;\n"]);return nt=function(){return n},n}var tt=u.a.div(nt()),et=u.a.div($n()),ot=u.a.div(Zn()),it=u.a.img(qn(),(function(n){return n.width})),ct=u.a.div(Xn(),et,ot,it),rt=u.a.div(Wn()),at=u.a.select(Jn()),lt=e(31),st=e.n(lt),ut=function(n){Object(i.useEffect)((function(){}),[n.homePhotoInformation]);return Object(o.jsx)(ct,{onClick:function(){n.setPhotoInformation(n.photoInfo),n.getFeaturedPhotoInfo(n.photoInfo.id),w.collection("preview-posts").where("image","==",n.photoInfo.image).get().then((function(n){L(n.docs[0].ref.id)}))},children:Object(o.jsxs)(tt,{children:[Object(o.jsx)(it,{width:"30vw",className:"grid-item masonry",alt:"",src:n.photoInfo.image}),Object(o.jsx)(et,{children:n.photoInfo.title}),Object(o.jsx)(ot,{children:"".concat(n.photoInfo.city,", ").concat(n.photoInfo.country)})]})})},dt=function(n){var t=n.setHomePhotoInformation,e=n.homePhotoInformation,c=Object(i.useState)(null),r=Object(l.a)(c,2),a=r[0],s=r[1],u=function(){w.collection("preview-posts").startAt(a).limit(2).get().then((function(n){s(n.docs[n.docs.length-1]);var o=[];n.docs.forEach((function(n){o.push(n.data())})),t([].concat(Object(J.a)(e),o)),console.log("lazy")}))};Object(i.useEffect)((function(){window.scrollTo({top:0}),e||w.collection("preview-posts").limit(4).get().then((function(n){s(n.docs[n.docs.length-1]);var e=[];n.docs.forEach((function(n){e.push(n.data())})),t(e),console.log("running")}))}),[t,e]);var d=new IntersectionObserver((function(n){n[0].intersectionRatio<=0||(console.log("Loaded new items"),u())})),f=function(){d.observe(document.getElementById("lazy"))};return Object(o.jsxs)(rt,{children:[Object(o.jsx)("button",{onClick:u,children:"Lazy"}),Object(o.jsxs)(at,{id:"sort-photos",onChange:function(){return function(){var n=document.getElementById("sort-photos"),e=n.options[n.selectedIndex].value;"Sort by:"!==e&&w.collection("preview-posts").orderBy(e,"desc").limit(10).get().then((function(n){var e=[];n.docs.forEach((function(n){e.push(n.data())})),t([].concat(e))}))}()},children:[Object(o.jsx)("option",{defaultValue:!0,value:"timestamp",children:"Newest"}),Object(o.jsx)("option",{value:"views",children:"Most popular"})]}),Object(o.jsx)("div",{id:"grid",className:"masonry-container",children:Object(o.jsx)(st.a,{breakpointCols:3,className:"my-masonry-grid",columnClassName:"my-masonry-grid_column",children:n.homePhotoInformation?n.homePhotoInformation.map((function(t,e){return Object(o.jsx)(ut,{startObserve:f,index:e,length:n.homePhotoInformation.length,getFeaturedPhotoInfo:n.getFeaturedPhotoInfo,setPageRoute:n.setPageRoute,setPhotoInformation:n.setPhotoInformation,photoInfo:t,homePhotoInformation:n.homePhotoInformation},e)})):null})})]})};function ft(){var n=Object(s.a)(["\n    color: white;\n    font-size: 20px;\n    justify-self: center;\n"]);return ft=function(){return n},n}function ht(){var n=Object(s.a)(["\n    margin: 20px;\n    cursor: pointer;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n"]);return ht=function(){return n},n}function jt(){var n=Object(s.a)(["\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: space-between;\n"]);return jt=function(){return n},n}function pt(){var n=Object(s.a)(["\n    object-fit: cover;\n    height: 180px;\n    width: 180px;\n    border-radius: 50%;\n"]);return pt=function(){return n},n}function mt(){var n=Object(s.a)(["\n    color: white;\n    font-size: 25px;\n"]);return mt=function(){return n},n}var bt=u.a.div(mt()),gt=u.a.img(pt()),vt=u.a.div(jt()),xt=u.a.div(ht()),Ot=u.a.div(ft()),wt=function(n){return Object(o.jsxs)(xt,{onClick:function(){n.getFeaturedPhotoInfo(n.post.id)},children:[Object(o.jsx)(gt,{src:n.post.image,alt:"display"}),Object(o.jsx)(Ot,{children:n.post.title})]})},yt=function(n){var t=Object(i.useState)([]),e=Object(l.a)(t,2),c=e[0],r=e[1];return Object(i.useEffect)((function(){var t;t=n.user,n.user&&w.collection("users").doc(t).collection("posts").get().then((function(n){var t=[];n.docs.forEach((function(n){t.push(n.data())})),r(t)})),console.log("running")}),[n.user]),Object(o.jsx)("div",{children:Object(o.jsx)("div",{children:Object(o.jsx)(vt,{children:null===c||void 0===c?void 0:c.map((function(t,e){return Object(o.jsx)(wt,{getFeaturedPhotoInfo:n.getFeaturedPhotoInfo,setPhotoInformation:n.setPhotoInformation,setPageRoute:n.setPageRoute,post:t},e)}))})})})};function It(){var n=Object(s.a)(["\n    width: 100px;\n    height: 40px;\n    position: absolute;\n    background-color: white;\n    font-size: 20px;\n    transform: translate(-94%, 0%);\n    color: black;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border-color: black;\n    border: 1px black solid;\n"]);return It=function(){return n},n}var Pt=u.a.div(It()),Ct=function(n){return Object(o.jsx)(Pt,{onClick:function(){w.collection("users").doc(n.user).collection("collection-names").where("name","==",n.collectionName).get().then((function(n){n.docs.forEach((function(n){n.ref.delete()})),console.log("collection deleted")}));var t=n.collectionInfo;t.splice(n.index,1),n.setCollectionInfo(Object(J.a)(t))},children:"Delete"})};function kt(){var n=Object(s.a)(["\n    margin: 0 20px 20px 20px;\n"]);return kt=function(){return n},n}function Ft(){var n=Object(s.a)(["\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: space-between;\n    margin: 0 5%;\n"]);return Ft=function(){return n},n}function Et(){var n=Object(s.a)(["\n    height: 270px;\n    width: 270px;\n    overflow: hidden;\n    cursor: pointer;\n    \n    /* display: flex; */\n    /* flex-wrap: wrap; */\n    /* border-radius: 50%; */\n"]);return Et=function(){return n},n}function St(){var n=Object(s.a)(["\n    height: 268px;\n    width: 270px;\n    object-fit: cover;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: 1px solid gray;\n"]);return St=function(){return n},n}function Rt(){var n=Object(s.a)(["\n    height: ",";\n    width: ",";\n    object-fit: cover;\n    float: left;\n"]);return Rt=function(){return n},n}function At(){var n=Object(s.a)(["\n    cursor: pointer;\n"]);return At=function(){return n},n}function Nt(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-end;\n"]);return Nt=function(){return n},n}var Lt=u.a.div(Nt()),zt=u.a.div(At()),Bt=u.a.img(Rt(),(function(n){return n.height}),(function(n){return n.width})),Ht=u.a.div(St()),Dt=u.a.div(Et()),Mt=u.a.div(Ft()),Gt=u.a.div(kt()),Tt=function(n){var t=Object(i.useState)(!1),e=Object(l.a)(t,2),c=e[0],r=e[1];window.onclick=function(n){n.target.matches(".delete-collection")||r(!1)};var a=n.collection[1].length;a=null!==n.collection[1][0]?n.collection[1].length:0;var s=n.collection;return Object(o.jsxs)(Gt,{children:[Object(o.jsxs)(Lt,{children:[Object(o.jsx)(bt,{children:n.collection[0]}),Object(o.jsxs)(zt,{onClick:function(){return r(!c)},children:[Object(o.jsx)("div",{className:"delete-collection",children:"\u22ee"}),c?Object(o.jsx)(Ct,{collectionInfo:n.collectionInfo,index:n.index,setCollectionInfo:n.setCollectionInfo,user:n.user,collectionName:n.collection[0]}):null]})]}),Object(o.jsx)(Dt,{onClick:function(){w.collection("users").doc(n.user).collection("collections").where("collection","==",n.collection[0]).get().then((function(t){var e=[];t.docs.forEach((function(n){e.push(n.data())})),n.setHomePhotoInformation(e),n.setPageRoute("GetPhotos")}))},children:a>0?Object(o.jsxs)("div",{children:[Object(o.jsx)(Bt,{height:Vt[a].height[1],width:Vt[a].width[1],src:s[1][0],alt:"placeholder"},"1"),Object(o.jsx)(Bt,{height:Vt[a].height[2],width:Vt[a].width[2],src:s[1][1],alt:"placeholder"},"2"),Object(o.jsx)(Bt,{height:Vt[a].height[3],width:Vt[a].width[3],src:s[1][2],alt:"placeholder"},"3"),Object(o.jsx)(Bt,{height:Vt[a].height[4],width:Vt[a].width[4],src:s[1][3],alt:"placeholder"},"4")]}):Object(o.jsx)(Ht,{children:"Collection is empty"})})]})},Ut=270,Yt=135,Vt={1:{height:{1:Ut},width:{1:Ut}},2:{height:{1:Yt,2:Yt},width:{1:Ut,2:Ut}},3:{height:{1:Yt,2:Yt,3:Yt},width:{1:Yt,2:Yt,3:Ut}},4:{height:{1:Yt,2:Yt,3:Yt,4:Yt},width:{1:Yt,2:Yt,3:Yt,4:Yt}}},Kt=function(n){var t=Object(i.useState)(null),e=Object(l.a)(t,2),c=e[0],r=e[1];return Object(i.useEffect)((function(){if(n.user){var t=[];w.collection("users").doc(n.user).collection("collection-names").orderBy("timestamp","desc").get().then((function(n){n.docs.forEach((function(n){var e,o=[],i=n.data();o.push(i.name),(null===i||void 0===i||null===(e=i.preview)||void 0===e?void 0:e.length)>0?o.push(i.preview):o.push([null]),t.push(o)})),r(t)}))}}),[n.user]),Object(o.jsx)(Mt,{children:null===c||void 0===c?void 0:c.map((function(t,e){return Object(o.jsx)(Tt,{collectionInfo:c,setCollectionInfo:r,index:e,user:n.user,setHomePhotoInformation:n.setHomePhotoInformation,setPageRoute:n.setPageRoute,collection:t},e)}))})},Qt=function(){N.a.auth().signOut().catch((function(n){return console.log(n)}))},_t=Qt;function Jt(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n    align-content: center;\n"]);return Jt=function(){return n},n}var Wt=u.a.div(Jt()),Xt=function(){return Object(o.jsx)(Wt,{children:Object(o.jsx)(b,{onClick:Qt,children:"Signout"})})};function qt(){var n=Object(s.a)(["\n    margin: 0 10%;\n"]);return qt=function(){return n},n}function Zt(){var n=Object(s.a)(["\n    list-style-type: none;\n    display: flex;\n    justify-content: space-evenly;\n    padding: 0;\n"]);return Zt=function(){return n},n}function $t(){var n=Object(s.a)(["\n    /* justify-content: center;\n    display: flex; */\n"]);return $t=function(){return n},n}var ne=u.a.div($t()),te=u.a.ul(Zt()),ee=u.a.div(qt()),oe=function(n){var t=Object(i.useState)("Collections"),e=Object(l.a)(t,2),c=e[0],r=e[1];return Object(o.jsxs)(ee,{children:[Object(o.jsx)(vn,{onClick:function(){return n.setPageRoute("GetPhotos")},children:"Back"}),Object(o.jsx)(ne,{children:Object(o.jsxs)(te,{children:[Object(o.jsx)(F,{style:{textDecoration:"Collections"===c?"underline":null},onClick:function(){return r("Collections")},children:"Collections"}),Object(o.jsx)(F,{style:{textDecoration:"Posts"===c?"underline":null},onClick:function(){return r("Posts")},children:"Posts"}),Object(o.jsx)(F,{style:{textDecoration:"Settings"===c?"underline":null},onClick:function(){return r("Settings")},children:"Settings"})]})}),function(){switch(c){case"Posts":return Object(o.jsx)(yt,{getFeaturedPhotoInfo:n.getFeaturedPhotoInfo,setPhotoInformation:n.setPhotoInformation,setPageRoute:n.setPageRoute,user:n.user});case"Collections":return Object(o.jsx)(Kt,{setHomePhotoInformation:n.setHomePhotoInformation,setPageRoute:n.setPageRoute,user:n.user});case"Settings":return Object(o.jsx)(Xt,{});default:return null}}()]})},ie=function(n){var t=Object(i.useState)(),e=Object(l.a)(t,2),c=e[0],r=e[1],a=Object(i.useState)(),s=Object(l.a)(a,2),u=s[0],d=s[1];return Object(o.jsx)(x,{children:Object(o.jsxs)(v,{children:[Object(o.jsxs)(g,{children:["Email ",n.user]}),Object(o.jsx)(m,{onChange:function(n){return r(n.target.value)}}),Object(o.jsx)(g,{children:"Password"}),Object(o.jsx)(m,{onChange:function(n){return d(n.target.value)},type:"password"}),Object(o.jsx)(b,{onClick:function(){(null===c||void 0===c?void 0:c.length)>0&&(null===u||void 0===u?void 0:u.length)>0&&N.a.auth().signInWithEmailAndPassword(c,u).then((function(t){n.setUser(t.user.uid)})).catch((function(n){return console.log(n)}))},children:"Login"}),Object(o.jsx)("br",{}),Object(o.jsx)(b,{onClick:_t,children:"Signout"})]})})},ce=function(){var n=Object(i.useState)(),t=Object(l.a)(n,2),e=t[0],c=t[1],r=Object(i.useState)(null),a=Object(l.a)(r,2),s=a[0],u=a[1],d=Object(i.useState)(null),f=Object(l.a)(d,2),h=f[0],j=f[1],p=Object(i.useState)("GetPhotos"),m=Object(l.a)(p,2),b=m[0],g=m[1],v=function(n){w.collection("posts").doc(n).get().then((function(n){j(n.data()),g("FeaturedPost"),window.scrollTo({top:0})}))};return Object(i.useEffect)((function(){N.a.auth().onAuthStateChanged((function(n){n&&c(n.uid)}))}),[]),Object(o.jsxs)("div",{children:["GetPhotos"===b?Object(o.jsx)(E,{setHomePhotoInformation:u,setPageRoute:g,user:e}):null,function(){switch(b){case"Upload":return Object(o.jsx)(_n,{user:e,setPageRoute:g});case"GetPhotos":return Object(o.jsx)(A,{scrollHeight:"93vh",children:Object(o.jsx)(dt,{getFeaturedPhotoInfo:v,homePhotoInformation:s,setHomePhotoInformation:u,setPageRoute:g,setPhotoInformation:j})});case"FeaturedPost":return Object(o.jsx)(Kn,{getFeaturedPhotoInfo:v,user:e,setHomePhotoInformation:u,setPageRoute:g,setPhotoInformation:j,photoInformation:h});case"Profile":return Object(o.jsx)(oe,{getFeaturedPhotoInfo:v,setHomePhotoInformation:u,setPhotoInformation:j,user:e,setPageRoute:g});case"Login":return Object(o.jsx)(ie,{setUser:c,user:e});default:return null}}()]})},re=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,45)).then((function(t){var e=t.getCLS,o=t.getFID,i=t.getFCP,c=t.getLCP,r=t.getTTFB;e(n),o(n),i(n),c(n),r(n)}))};a.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(ce,{})}),document.getElementById("root")),re()}},[[44,1,2]]]);
//# sourceMappingURL=main.b418d1a5.chunk.js.map