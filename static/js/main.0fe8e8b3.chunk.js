(this["webpackJsonpphoto-app"]=this["webpackJsonpphoto-app"]||[]).push([[0],{30:function(n,e,t){},31:function(n,e,t){},37:function(n,e,t){"use strict";t.r(e);var c=t(4),i=t(3),o=t.n(i),r=t(21),s=t.n(r),a=(t(30),t(9)),u=(t(31),function(){return Object(c.jsx)("div",{className:"test",children:Object(c.jsxs)("ul",{children:[Object(c.jsx)("li",{children:"NORTH AMERICA"}),Object(c.jsx)("li",{children:"SOUTH AMERICA"}),Object(c.jsx)("li",{children:"EUROPE"}),Object(c.jsx)("li",{children:"OCEANIA"}),Object(c.jsx)("li",{children:"ASIA"}),Object(c.jsx)("li",{children:"AFRICA"})]})})}),l=t(8),d=function(){l.a.auth().signOut().catch((function(n){return console.log(n)}))},j=t(11),b=t(12);function h(){var n=Object(j.a)(["\n    display: flex;\n    justify-content: center;\n"]);return h=function(){return n},n}function O(){var n=Object(j.a)(["\n    display: flex;\n    flex-direction: column;\n"]);return O=function(){return n},n}function f(){var n=Object(j.a)(["\n    color: white;\n"]);return f=function(){return n},n}function g(){var n=Object(j.a)(["\n    display:inline-block;\n    padding: 0.35em 1.2em;\n    border: 0.1em solid #FFFFFF;\n    margin: 0 0.3em 0.3em 0;\n    border-radius:0.12em;\n    box-sizing: border-box;\n    text-decoration:none;\n    font-weight:300;\n    color:#FFFFFF;\n    text-align:center;\n    transition: all 0.2s;\n    background-color: transparent;\n    width: 120px;\n    font-size: 20px;\n    transition: color 300ms;\n    transition: background-color 350ms;\n\n    &:hover{\n        background-color: white;\n        color: black;\n        cursor: pointer;\n    }\n"]);return g=function(){return n},n}function p(){var n=Object(j.a)(["\n    width: 400px;\n    height: 30px;\n    font-size: 20px;\n    transition: height 500ms;\n\n    &:focus {\n        height: 40px;\n    }\n"]);return p=function(){return n},n}var x=b.a.input(p()),v=b.a.button(g()),m=b.a.div(f()),F=b.a.div(O()),w=b.a.div(h()),A=function(n){var e=Object(i.useState)(),t=Object(a.a)(e,2),o=t[0],r=t[1],s=Object(i.useState)(),u=Object(a.a)(s,2),j=u[0],b=u[1];return Object(c.jsx)(w,{children:Object(c.jsxs)(F,{children:[Object(c.jsxs)(m,{children:["Email ",n.user]}),Object(c.jsx)(x,{onChange:function(n){return r(n.target.value)}}),Object(c.jsx)(m,{children:"Password"}),Object(c.jsx)(x,{onChange:function(n){return b(n.target.value)},type:"password"}),Object(c.jsx)(v,{onClick:function(){(null===o||void 0===o?void 0:o.length)>0&&(null===j||void 0===j?void 0:j.length)>0&&l.a.auth().signInWithEmailAndPassword(o,j).then((function(e){n.setUser(e.user.uid)})).catch((function(n){return console.log(n)}))},children:"Login"}),Object(c.jsx)("br",{}),Object(c.jsx)(v,{onClick:d,children:"Signout"})]})})},C=t(18),S=(t(36),C.a.initializeApp({apiKey:"AIzaSyDdoQaGgfQzmsXKHgytAROdzRjVaw_wE3M",authDomain:"photos-634e7.firebaseapp.com",databaseURL:"https://photos-634e7.firebaseio.com",projectId:"photos-634e7",storageBucket:"photos-634e7.appspot.com",messagingSenderId:"23335646481",appId:"1:23335646481:web:f6d39ff77620ebd80388b0",measurementId:"G-K4NLQYSDWM"}).firestore()),I=(C.a,function(){var n=Object(i.useState)(),e=Object(a.a)(n,2),t=e[0],o=e[1],r=Object(i.useState)(),s=Object(a.a)(r,2),u=s[0],d=s[1];return Object(c.jsx)(w,{children:Object(c.jsxs)(F,{children:[Object(c.jsx)(m,{children:"Email"}),Object(c.jsx)(x,{onChange:function(n){return o(n.target.value)}}),Object(c.jsx)(m,{children:"Password"}),Object(c.jsx)(x,{onChange:function(n){return d(n.target.value)},type:"password"}),Object(c.jsx)(v,{onClick:function(){(null===t||void 0===t?void 0:t.length)>0&&(null===u||void 0===u?void 0:u.length)>0&&l.a.auth().createUserWithEmailAndPassword(t,u).then((function(n){console.log(n.user.uid),S.collection("users").set({username:n.user.uid})})).catch((function(n){return console.log(n)}))},children:"Signup"})]})})}),E=function(){var n=Object(i.useState)(),e=Object(a.a)(n,2),t=e[0],o=e[1];return Object(i.useEffect)((function(){l.a.auth().onAuthStateChanged((function(n){n&&(o(n.id),console.log("signed in"))}))})),Object(c.jsxs)("div",{children:[Object(c.jsx)(u,{}),Object(c.jsx)(A,{setUser:o,user:t}),Object(c.jsx)(I,{})]})},k=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,38)).then((function(e){var t=e.getCLS,c=e.getFID,i=e.getFCP,o=e.getLCP,r=e.getTTFB;t(n),c(n),i(n),o(n),r(n)}))};s.a.render(Object(c.jsx)(o.a.StrictMode,{children:Object(c.jsx)(E,{})}),document.getElementById("root")),k()}},[[37,1,2]]]);
//# sourceMappingURL=main.0fe8e8b3.chunk.js.map