(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{21:function(e,t,a){e.exports=a(32)},27:function(e,t,a){},32:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(16),l=a.n(o),i=(a(27),a(4));var c={colors:{whiteText:"#EEE",darkText:"#181818",darkBackground:"#181818",lightBackground:"none",gradientBase:"#C84B31",gradient:"linear-gradient(#C84B31, #622518)"},fontSizes:{largeHeader:"27px",mediumHeader:"23px",smallHeader:"18px",largeParagraph:"15px",mediumParagraph:"12px",smallParagraph:"8px",ButtonCTA:"15px"},fontWeights:{largeHeader:"600",mediumHeader:"600",smallHeader:"500",paragraph:"400",ButtonCTA:"500"},fonts:{primaryFont:"'Roboto', sans-serif"},shadows:{mainShadows:"-5px 5px 9px rgba(0, 0, 0, 0.5)"},breakpoints:{mobileS:"320px",mobileM:"375px",mobileL:"425px",tablet:"768px",laptop:"1024px",laptopL:"1440px",desktop:"2560px"},paddings:{mobileS:"none",mobileM:"0 15px",mobileL:"none",tablet:"none",laptop:"none",laptopL:"none",desktop:"none"}};const s=i.b`
  body {
    /* Fonts !!!not working!!! */
    font-family: ${c.fonts.primaryFont}
    
  }
`;var d=a(19),p=a(3),g=a(33);const u=i.c.div`
    backgroun-color: ${c.colors.darkBackground};

    p {
        color: ${c.colors.whiteText};
    }

    a {
        color: ${c.colors.primary}; /* Колір тексту посилання */
        text-decoration: none; /* Прибирає підкреслення */
        cursor: pointer;

        &:hover {
            text-decoration: underline; /* Підкреслення при наведенні */
            color: ${c.colors.gradientBase}; /* Зміна кольору при наведенні */
        }
    }
`,m=i.c.div`
    text-align: center;
    max-width: 360px;
    margin: 0 auto;
    padding-top: 75px;
`,h=i.c.h1`
    // Fonts
    font-size: ${e=>{let{fontSize:t}=e;return t||c.fontSizes.largeHeader}};
    font-weight: ${e=>{let{fontWeight:t}=e;return t||c.fontWeights.largeHeader}};

    // Color
    color: ${e=>{let{color:t}=e;return t||c.colors.whiteText}};

    // Other
    text-align: center;
    margin: 0;
    padding: 0;
`;var E=function(e){let{children:t="Set header text",fontSize:a,fontWeight:n,color:o,style:l,onClick:i}=e;return r.a.createElement(h,{style:l,fontSize:a,fontWeight:n,color:o,onClick:i},t)};const x=i.c.input`
    // Form
    width: 100%;
    max-width: 336px;
    height: 45px;
    padding: 0 10px;

    // Fonts
    font-size: ${c.fontSizes.largeParagraph};
    color: ${c.colors.whiteText};
    border: 2px solid transparent; /* Прозорі бордери */
    border-radius: 7px; /* Заокруглені кути */

    // Colors
    background-image: 
        linear-gradient(
            ${c.colors.darkBackground}, 
            ${c.colors.darkBackground}
            ), 
        ${c.colors.gradient};
    background-origin: border-box;
    background-clip: padding-box, border-box;
    box-shadow: ${c.shadows.mainShadows};

    // Other
    &::placeholder {
        color: rgba(250, 250, 250, 0.7);
    }
    &:focus {
        outline: none;
        // background-image: linear-gradient(${c.colors.darkBackground}, ${c.colors.darkBackground}), 
        // ${c.colors.gradient};
    }
`;var f=function(e){let{placeholder:t="Set placeholder",style:a,type:n,value:o,onChange:l}=e;return r.a.createElement(x,{placeholder:t,style:a,type:n,value:o,onChange:l})};const C=i.c.button`
    /* Form */
    width: ${e=>{let{width:t}=e;return t||"100%"}};
    height: 45px;
    border-radius: 10px;
    border: none;

    /* Color */
    background-color: ${e=>{let{bgColor:t}=e;return t||c.colors.gradientBase}};
    background-image: ${e=>{let{bgColor:t}=e;return t?"none":c.colors.gradient}};

    /* Fonts */
    color: ${c.colors.whiteText};
    font-size: ${c.fontSizes.ButtonCTA};
    font-weight: ${c.fontWeights.ButtonCTA};

    /* Other */
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    ${c.shadows.mainShadows};

    &:hover{
        /* here should be hover */
    }
`;var v=function(e){let{children:t="Set button text",width:a,bgColor:n,onClick:o,style:l}=e;return r.a.createElement("div",{style:l},r.a.createElement(C,{width:a,bgColor:n,onClick:o},t))};var y=function(){return r.a.createElement("div",null,r.a.createElement("svg",{width:"32",height:"32",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("g",{"clip-path":"url(#clip0_92_1681)"},r.a.createElement("path",{d:"M11.1475 1.05274C7.95019 2.16191 5.19285 4.26716 3.28046 7.05924C1.36808 9.85133 0.401465 13.1831 0.522592 16.5652C0.643719 19.9472 1.84621 23.2013 3.95343 25.8494C6.06065 28.4975 8.96153 30.4001 12.23 31.2777C14.8798 31.9615 17.656 31.9915 20.32 31.3652C22.7333 30.8232 24.9644 29.6637 26.795 28.0002C28.7002 26.2161 30.0831 23.9464 30.795 21.4352C31.5688 18.7044 31.7065 15.8326 31.1975 13.0402H16.3175V19.2127H24.935C24.7628 20.1972 24.3937 21.1368 23.8499 21.9753C23.306 22.8138 22.5986 23.534 21.77 24.0927C20.7177 24.7888 19.5315 25.2572 18.2875 25.4677C17.0398 25.6997 15.7601 25.6997 14.5125 25.4677C13.248 25.2063 12.0517 24.6844 11 23.9352C9.31036 22.7392 8.04168 21.0401 7.37499 19.0802C6.69702 17.0837 6.69702 14.9193 7.37499 12.9227C7.84955 11.5233 8.63407 10.2491 9.66999 9.19524C10.8555 7.96711 12.3563 7.08923 14.0079 6.65793C15.6594 6.22663 17.3979 6.25857 19.0325 6.75024C20.3094 7.14222 21.4771 7.82708 22.4425 8.75024C23.4142 7.78357 24.3842 6.81441 25.3525 5.84274C25.8525 5.32024 26.3975 4.82274 26.89 4.28774C25.4164 2.91643 23.6867 1.84938 21.8 1.14774C18.3642 -0.099786 14.6049 -0.133312 11.1475 1.05274Z",fill:"#EEEEEE"}),r.a.createElement("path",{d:"M11.1474 1.05249C14.6046 -0.134368 18.3639 -0.101725 21.7999 1.14499C23.687 1.8514 25.4159 2.92358 26.8874 4.29999C26.3874 4.83499 25.8599 5.33499 25.3499 5.85499C24.3799 6.82332 23.4108 7.78832 22.4424 8.74999C21.4771 7.82683 20.3094 7.14197 19.0324 6.74999C17.3984 6.25659 15.66 6.22281 14.008 6.65235C12.356 7.08188 10.8542 7.95814 9.66744 9.18499C8.63153 10.2388 7.84701 11.513 7.37244 12.9125L2.18994 8.89999C4.04496 5.22139 7.25681 2.40755 11.1474 1.05249Z",fill:"#E33629"}),r.a.createElement("path",{d:"M0.814998 12.8749C1.09355 11.4944 1.55601 10.1575 2.19 8.8999L7.3725 12.9224C6.69453 14.9189 6.69453 17.0834 7.3725 19.0799C5.64583 20.4132 3.91833 21.7532 2.19 23.0999C0.602874 19.9407 0.118829 16.3412 0.814998 12.8749Z",fill:"#F8BD00"}),r.a.createElement("path",{d:"M16.3175 13.0376H31.1975C31.7065 15.8299 31.5688 18.7018 30.795 21.4326C30.0831 23.9438 28.7002 26.2135 26.795 27.9976C25.1225 26.6926 23.4425 25.3976 21.77 24.0926C22.5992 23.5333 23.3069 22.8123 23.8508 21.9729C24.3946 21.1335 24.7634 20.193 24.935 19.2076H16.3175C16.315 17.1526 16.3175 15.0951 16.3175 13.0376Z",fill:"#587DBD"}),r.a.createElement("path",{d:"M2.1875 23.1001C3.91583 21.7667 5.64333 20.4267 7.37 19.0801C8.03802 21.0406 9.30851 22.7398 11 23.9351C12.055 24.6807 13.2538 25.1984 14.52 25.4551C15.7676 25.6871 17.0474 25.6871 18.295 25.4551C19.539 25.2445 20.7252 24.7762 21.7775 24.0801C23.45 25.3851 25.13 26.6801 26.8025 27.9851C24.9722 29.6494 22.741 30.8098 20.3275 31.3526C17.6635 31.9788 14.8873 31.9488 12.2375 31.2651C10.1418 30.7055 8.18419 29.7191 6.4875 28.3676C4.69165 26.9418 3.22489 25.145 2.1875 23.1001Z",fill:"#319F43"})),r.a.createElement("defs",null,r.a.createElement("clipPath",{id:"clip0_92_1681"},r.a.createElement("rect",{width:"32",height:"32",fill:"white"})))))};var w=function(){localStorage.getItem("authToken")&&(window.location.href="/dashboard");const[e,t]=Object(n.useState)("test2"),[a,o]=Object(n.useState)("test2"),[l,i]=Object(n.useState)(""),[c,s]=Object(n.useState)(""),[d,p]=Object(n.useState)(!1);Object(n.useEffect)(()=>{window.location.href.includes("/registration")?p(!0):p(!1)},[]);const h=async()=>{try{if(""!==e&&""!==a){const t=await g.a.post("https://sportappserver-production.up.railway.app/api/login",{email:e,password:a});(null===t||void 0===t?void 0:t.data.token)?(localStorage.setItem("authToken",t.data.token),window.location.href="/dashboard"):s(t.data.message)}else s("Email and password are required")}catch(r){var t,n;console.log("Error during login: ",r),s(null===(t=r.response)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.message)}},x=async()=>{try{if(""!==e&&""!==a)if(""!==a&&""!==l&&a===l){const t=await g.a.post("https://sportappserver-production.up.railway.app/api/register",{email:e,password:a});if(201===t.status)try{const t=await g.a.post("https://sportappserver-production.up.railway.app/api/login",{email:e,password:a});(null===t||void 0===t?void 0:t.data.token)?(localStorage.setItem("authToken",t.data.token),window.location.href="/dashboard"):(window.location.href="/login",s(t.data.message))}catch(r){window.location.href="/login",s("Try to login again")}else s(t.data.message)}else s("Passwords in both fields should be the same");else s("Email and password are required")}catch(r){var t,n;console.log("Error during registration: ",r),s(null===(t=r.response)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.message)}};function C(){const[e,t]=Object(n.useState)(null);return Object(n.useEffect)(()=>{const e=window.location.href;e.includes("/login")?t({text:"Log In",loginMethod:h}):e.includes("/registration")?t({text:"Sing Up",loginMethod:x}):t({text:"Log In",loginMethod:h})},[]),e?r.a.createElement(v,{onClick:e.loginMethod},e.text):null}function w(){const[e,t]=Object(n.useState)(null);return Object(n.useEffect)(()=>{const e=window.location.href;e.includes("/login")?t({href:"/registration",text:"Don't have an account yet? Click here"}):e.includes("/registration")?t({href:"/login",text:"Do you already have an account? Click here"}):t({href:"/login",text:"Click here if you want to log in"})},[]),e?r.a.createElement("a",{href:e.href,style:{borderBottom:"white"}},r.a.createElement("p",null,e.text)):null}return r.a.createElement(m,null,r.a.createElement(u,null,r.a.createElement(E,null,"Sport App"),r.a.createElement("p",null,"Dream big, work hard, stay focused."),r.a.createElement(f,{placeholder:"Email",value:e,type:"email",onChange:e=>t(e.target.value),style:{margin:"100px 0 10px 0"}}),r.a.createElement(f,{className:"password1",placeholder:"Password",value:a,type:"password",onChange:e=>o(e.target.value),style:{marginBottom:"10px"}}),d&&r.a.createElement(f,{className:"password2",placeholder:"Repeat password",value:l,type:"password",onChange:e=>i(e.target.value),style:{marginBottom:"10px"}}),r.a.createElement("div",{style:{marginBottom:"20px"}},r.a.createElement(C,null)),r.a.createElement(v,{style:{display:"none"},onClick:async()=>{}},r.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",position:"relative",width:"100%"}},r.a.createElement("div",{style:{position:"absolute",left:"29px",display:"flex",alignItems:"center"}},r.a.createElement(y,null)),r.a.createElement("p",{style:{margin:0}},"Log in by Google"))),r.a.createElement(w,null),c&&r.a.createElement("p",{style:{color:"red"}},c)))};i.c.div`
    color: #EEE;
    font-family: 'Roboto', sans-serif;
    text-align: center;
`;const b=i.c.div`
    // Form
    width: 100%;
    border-radius: 40px 40px 0 0;
    padding-bottom: 60px;

    // Color
    background-color: ${c.colors.darkBackground}
`,S=i.c.div`
    text-align: center;
    max-width: 360px;
    margin: 0 auto;
`;var k=i.c.div`
    height: 82px;
    width: 100%;
    // border: 1px solid red;
    padding: 9px 0 15px 0;

`;var T=function(){return r.a.createElement(k,null,r.a.createElement(E,{fontSize:c.fontSizes.mediumHeader},"May"),r.a.createElement("div",{className:"CalendarTiles",style:{color:"#EEE"}},"Calendar tiles"))};const j=i.c.div`
    // Form
    width: 100%;
    height: 4px;
    border-radius: 2px;
    margin: 15px auto;

    // Color
    background-color: ${c.colors.gradientBase};
    background-image: ${c.colors.gradient};
    
    // Other
    box-shadow: ${c.shadows.mainShadows};
`;var z=function(e){let{marginTop:t,marginBottom:a,width:n}=e;return r.a.createElement(j,{style:{marginTop:t,marginBottom:a,width:n}})};var B=function(e){let{style:t,children:a}=e;return r.a.createElement(b,{style:t},r.a.createElement(S,null,r.a.createElement(T,null),r.a.createElement(z,{marginTop:"0",marginBottom:"10px"}),a))};const H=i.c.div`
    // Color
    background-image: ${c.colors.gradient};

    // Form
    padding: 8px 0;
    border-radius: 40px 40px 0 0;
    width: 100%;

    // Position
    text-align: center;
`,O=i.c.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 360px;
    margin: 0 auto;
`,D=i.c.div`
    // Color
    background-color: ${c.colors.darkBackground};

    // Position
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;

    // Form
    width: 100%;
`;var $=function(e){let{activeIcon:t,onClick:a}=e;return r.a.createElement("div",null,r.a.createElement("svg",{width:"50",height:"50",viewBox:"0 0 50 50",fill:"none",xmlns:"http://www.w3.org/2000/svg",onClick:a},r.a.createElement("path",{d:"M10.7778 26.7778H21.4444C22.4222 26.7778 23.2222 25.9778 23.2222 25V10.7778C23.2222 9.8 22.4222 9 21.4444 9H10.7778C9.8 9 9 9.8 9 10.7778V25C9 25.9778 9.8 26.7778 10.7778 26.7778ZM10.7778 41H21.4444C22.4222 41 23.2222 40.2 23.2222 39.2222V32.1111C23.2222 31.1333 22.4222 30.3333 21.4444 30.3333H10.7778C9.8 30.3333 9 31.1333 9 32.1111V39.2222C9 40.2 9.8 41 10.7778 41ZM28.5556 41H39.2222C40.2 41 41 40.2 41 39.2222V25C41 24.0222 40.2 23.2222 39.2222 23.2222H28.5556C27.5778 23.2222 26.7778 24.0222 26.7778 25V39.2222C26.7778 40.2 27.5778 41 28.5556 41ZM26.7778 10.7778V17.8889C26.7778 18.8667 27.5778 19.6667 28.5556 19.6667H39.2222C40.2 19.6667 41 18.8667 41 17.8889V10.7778C41 9.8 40.2 9 39.2222 9H28.5556C27.5778 9 26.7778 9.8 26.7778 10.7778Z",fill:t?"#181818":"#EEE"})))};var I=function(e){let{activeIcon:t,onClick:a}=e;return r.a.createElement("div",null,r.a.createElement("svg",{width:"50",height:"50",viewBox:"0 0 50 50",fill:"none",xmlns:"http://www.w3.org/2000/svg",onClick:a},r.a.createElement("path",{d:"M9.75 11.2857C9.75 10.0214 10.7555 9 12 9H14.25C15.4945 9 16.5 10.0214 16.5 11.2857V38.7143C16.5 39.9786 15.4945 41 14.25 41H12C10.7555 41 9.75 39.9786 9.75 38.7143V34.1429H7.5C6.25547 34.1429 5.25 33.1214 5.25 31.8571V27.2857C4.00547 27.2857 3 26.2643 3 25C3 23.7357 4.00547 22.7143 5.25 22.7143V18.1429C5.25 16.8786 6.25547 15.8571 7.5 15.8571H9.75V11.2857ZM41.25 11.2857V15.8571H43.5C44.7445 15.8571 45.75 16.8786 45.75 18.1429V22.7143C46.9945 22.7143 48 23.7357 48 25C48 26.2643 46.9945 27.2857 45.75 27.2857V31.8571C45.75 33.1214 44.7445 34.1429 43.5 34.1429H41.25V38.7143C41.25 39.9786 40.2445 41 39 41H36.75C35.5055 41 34.5 39.9786 34.5 38.7143V11.2857C34.5 10.0214 35.5055 9 36.75 9H39C40.2445 9 41.25 10.0214 41.25 11.2857ZM32.25 22.7143V27.2857H18.75V22.7143H32.25Z",fill:t?"#181818":"#EEE"})))};var L=function(e){let{activeIcon:t,onClick:a}=e;return r.a.createElement("div",null,r.a.createElement("svg",{width:"50",height:"50",viewBox:"0 0 50 50",fill:"none",xmlns:"http://www.w3.org/2000/svg",onClick:a},r.a.createElement("path",{d:"M17.3574 27.1643C17.388 27.1895 22.2622 22.377 22.2622 22.3233C22.2622 22.2695 13.6819 13.7973 11.5364 11.7255C10.751 10.9693 10.0709 10.3476 10.0318 10.3476C9.89121 10.4232 9.76746 10.5261 9.66801 10.6501C9.09122 11.2813 8.65559 12.0256 8.38955 12.8345C8.28925 13.1185 8.21955 13.352 8.21955 13.352C8.21114 13.4359 8.19637 13.519 8.17534 13.6007C7.96296 14.5304 7.94329 15.493 8.11754 16.4304C8.47966 18.1376 9.01348 18.8836 12.0498 21.9149C13.0529 22.9198 17.1789 26.9912 17.3574 27.1643ZM29.0794 24.427C29.2086 24.4707 29.3252 24.5445 29.4195 24.6421C29.7664 24.9643 30.1751 25.2144 30.6215 25.3777C31.0679 25.541 31.5429 25.6142 32.0184 25.5929C32.4939 25.5716 32.9603 25.4562 33.3899 25.2537C33.8195 25.0511 34.2037 24.7654 34.5197 24.4136C35.1844 23.8456 35.521 23.5213 38.7699 20.322L42 17.1361L41.1891 16.3262C40.747 15.8775 40.373 15.5196 40.3628 15.5297C40.3526 15.5398 39.0742 16.7933 37.5237 18.3207L34.7033 21.1033L33.8974 20.317C33.6173 20.0533 33.3474 19.7792 33.0882 19.4953C33.0882 19.4802 34.3514 18.2065 35.9018 16.674L38.7121 13.8864L37.9198 13.0849C37.6537 12.8091 37.3781 12.5423 37.0936 12.285C37.0783 12.285 35.7947 13.5385 34.2443 15.066L31.4153 17.8536L30.5908 17.0471L29.7646 16.2405L32.5833 13.4545C33.5331 12.5247 34.4733 11.5854 35.4037 10.6366C35.4037 10.6215 34.4262 9.62844 33.9332 9.15963L33.7631 9L32.1226 10.6518C28.7887 14.0208 27.308 15.5398 26.4681 16.4657C26.3066 16.6438 26.1553 16.8017 26.14 16.8135C26.0322 16.9275 25.9284 17.0452 25.8289 17.1664C25.5077 17.588 25.3031 18.0851 25.2351 18.6086C25.1671 19.1321 25.2382 19.6641 25.4413 20.1523C25.6233 20.5881 25.8513 21.0037 26.1213 21.3924C26.1417 21.4075 26.2471 21.5167 26.3593 21.631L26.5599 21.8393L18.1123 30.1955L9.66291 38.5467L10.8921 39.7717L12.1161 41L18.1582 35.0281L24.1951 29.0613L30.1981 34.9929C32.2064 36.9847 34.2239 38.9675 36.2504 40.9412C36.2759 40.9513 38.6305 38.656 38.6662 38.5619C38.6764 38.5367 35.9783 35.8397 32.67 32.5698L26.6568 26.6232L27.5885 25.7125C28.8482 24.4774 28.9094 24.427 29.0794 24.427Z",fill:t?"#181818":"#EEE"})))};var W=function(e){let{activeIcon:t,onClick:a}=e;return r.a.createElement("div",null,r.a.createElement("svg",{width:"50",height:"50",viewBox:"0 0 50 50",fill:"none",xmlns:"http://www.w3.org/2000/svg",onClick:a},r.a.createElement("path",{d:"M9 15.4C9 13.7026 9.67428 12.0747 10.8745 10.8745C12.0747 9.67428 13.7026 9 15.4 9H34.6C36.2974 9 37.9252 9.67428 39.1255 10.8745C40.3257 12.0747 41 13.7026 41 15.4V23.4H9V15.4Z",stroke:t?"#181818":"#EEE",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round"}),r.a.createElement("path",{d:"M35.4 32.2002H30.6",stroke:t?"#181818":"#EEE",strokeWidth:"3",strokeLinecap:"round"}),r.a.createElement("path",{d:"M25 23.3999H41V34.5999C41 36.2973 40.3257 37.9252 39.1255 39.1254C37.9252 40.3256 36.2974 40.9999 34.6 40.9999H25M25 23.3999V40.9999M25 23.3999H9V34.5999C9 36.2973 9.67428 37.9252 10.8745 39.1254C12.0747 40.3256 13.7026 40.9999 15.4 40.9999H25",stroke:t?"#181818":"#EEE",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round"}),r.a.createElement("path",{d:"M14.6 34.5998L17 32.1998M17 32.1998L19.4 29.7998M17 32.1998L19.4 34.5998M17 32.1998L14.6 29.7998",stroke:t?"#181818":"#EEE",strokeWidth:"3",strokeLinecap:"round"})))};var P=function(e){let{currentScreen:t,onScreenChange:a}=e;return r.a.createElement(D,null,r.a.createElement(z,{marginBottom:"27px",marginTop:0,width:"360px"}),r.a.createElement(H,null,r.a.createElement(O,null,r.a.createElement($,{activeIcon:"Dashboard"===t,onClick:()=>a("Dashboard")}),r.a.createElement(I,{activeIcon:"Trainings"===t||"NewTrainingPlan"===t||"SetUpTrainingDays"===t||"SetUpExercises"===t||"SetUpExercise"===t,onClick:()=>a("Trainings")}),r.a.createElement(L,{activeIcon:"Diet"===t,onClick:()=>a("Diet")}),r.a.createElement(W,{activeIcon:"Calculator"===t,onClick:()=>a("Calculator")}))))};const _=i.c.div`
    // Form
    padding: 16px 0;
    width: 78px;
    border-radius: 50%;
    text-align: center;
    justify-content: middle;

    // Color
    background-color: ${c.colors.darkBackground};
`;var M=function(e){let{userImage:t}=e;return r.a.createElement("div",null,t?r.a.createElement("image",{src:"userImage",width:"100%",height:"100%"}):r.a.createElement("svg",{width:"42",height:"42",viewBox:"0 0 42 42",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M21 21C18.1125 21 15.6406 19.9719 13.5844 17.9156C11.5281 15.8594 10.5 13.3875 10.5 10.5C10.5 7.6125 11.5281 5.14063 13.5844 3.08438C15.6406 1.02813 18.1125 0 21 0C23.8875 0 26.3594 1.02813 28.4156 3.08438C30.4719 5.14063 31.5 7.6125 31.5 10.5C31.5 13.3875 30.4719 15.8594 28.4156 17.9156C26.3594 19.9719 23.8875 21 21 21ZM0 42V34.65C0 33.1625 0.383251 31.7957 1.14975 30.5497C1.91625 29.3037 2.933 28.3518 4.2 27.6938C6.9125 26.3375 9.66875 25.3207 12.4687 24.6435C15.2687 23.9662 18.1125 23.6268 21 23.625C23.8875 23.6232 26.7312 23.9627 29.5312 24.6435C32.3312 25.3242 35.0875 26.341 37.8 27.6938C39.0687 28.35 40.0864 29.302 40.8529 30.5497C41.6194 31.7975 42.0017 33.1643 42 34.65V42H0Z",fill:"#EEEEEE"})))};var A=function(e){let{onClick:t}=e;return r.a.createElement(_,{onClick:t},r.a.createElement(M,null))};const V=i.c.div`
    width: 360px;
    margin: 0 auto;
`,U=i.c.div`
    // Form
    width: 100%;
    border-radius: 10px;

    // Colors
    background-color: ${c.colors.gradientBase};
    background-image: ${c.colors.gradient};

    // Other
    box-shadow: ${c.shadows.mainShadows};
`,F=i.c.button`
    background-color: transparent;
    width: 345px;
    display: flex;
    justify-content: space-between;
    border: none;
    border-bottom: ${c.colors.whiteText} 2px solid;
    padding: 11px 0;
    margin: 0 0 0 auto;
    cursor: pointer
`;var Z=function(e){let{token:t}=e;return r.a.createElement(V,null,r.a.createElement(U,null,r.a.createElement(F,null,r.a.createElement("div",null,r.a.createElement("p",{style:{fontSize:c.fontSizes.largeParagraph,fontWeight:c.fontWeights.largeHeader,color:c.colors.whiteText,margin:0,padding:0}},"Age")),r.a.createElement("div",null,r.a.createElement("p",{style:{fontSize:c.fontSizes.largeParagraph,fontWeight:c.fontWeights.largeHeader,color:c.colors.whiteText,margin:0,padding:0,paddingRight:"15px"}},"19 20 21 Years"))),r.a.createElement(F,null,r.a.createElement("div",null,r.a.createElement("p",{style:{fontSize:c.fontSizes.largeParagraph,fontWeight:c.fontWeights.largeHeader,color:c.colors.whiteText,margin:0,padding:0}},"Height")),r.a.createElement("div",null,r.a.createElement("p",{style:{fontSize:c.fontSizes.largeParagraph,fontWeight:c.fontWeights.largeHeader,color:c.colors.whiteText,margin:0,padding:0,paddingRight:"15px"}},"174 175 176 Cm"))),r.a.createElement(F,{style:{border:"none"}},r.a.createElement("div",null,r.a.createElement("p",{style:{fontSize:c.fontSizes.largeParagraph,fontWeight:c.fontWeights.largeHeader,color:c.colors.whiteText,margin:0,padding:0}},"Weight")),r.a.createElement("div",null,r.a.createElement("p",{style:{fontSize:c.fontSizes.largeParagraph,fontWeight:c.fontWeights.largeHeader,color:c.colors.whiteText,margin:0,padding:0,paddingRight:"15px"}},"74 75 76 Kg")))),r.a.createElement(z,null),r.a.createElement(U,null,r.a.createElement(F,{style:{justifyContent:"center"}},r.a.createElement("div",null,r.a.createElement("p",{style:{fontSize:c.fontSizes.largeParagraph,fontWeight:c.fontWeights.largeHeader,color:c.colors.whiteText,margin:0,padding:0}},"Support"))),r.a.createElement(F,{style:{justifyContent:"center"}},r.a.createElement("div",null,r.a.createElement("p",{style:{fontSize:c.fontSizes.largeParagraph,fontWeight:c.fontWeights.largeHeader,color:c.colors.whiteText,margin:0,padding:0}},"Web-site"))),r.a.createElement(F,{style:{justifyContent:"center",border:"none"}},r.a.createElement("div",null,r.a.createElement("p",{style:{fontSize:c.fontSizes.largeParagraph,fontWeight:c.fontWeights.largeHeader,color:c.colors.whiteText,margin:0,padding:0}},"Share")))),r.a.createElement(z,null),r.a.createElement(U,null,r.a.createElement(F,{style:{justifyContent:"center"},onClick:async function(){localStorage.getItem("authToken")&&(localStorage.removeItem("authToken"),window.location.href="/login")}},r.a.createElement("div",null,r.a.createElement("p",{style:{fontSize:c.fontSizes.largeParagraph,fontWeight:c.fontWeights.largeHeader,color:c.colors.whiteText,margin:0,padding:0}},"Log out"))),r.a.createElement(F,{style:{justifyContent:"center",border:"none"},onClick:async function(){if((await g.a.delete("https://sportappserver-production.up.railway.app/api/delete",{headers:{Authorization:"Bearer "+t}})).status)return localStorage.removeItem("authToken"),void(window.location.href="/login")}},r.a.createElement("div",null,r.a.createElement("p",{style:{fontSize:c.fontSizes.largeParagraph,fontWeight:c.fontWeights.largeHeader,color:c.colors.whiteText,margin:0,padding:0}},"Delete account")))))};var N=i.c.div`

`;const R=i.c.div`
    /* Form */
    width: 100%;
    padding-top: ${e=>e.$paddingTop||"40px"};
    padding-bottom: ${e=>e.$paddingBottom||"40px"};
    border-radius: 16px;

    /* Position */
    text-align: center;
    margin: 0 auto;

    /* Color */
    background-color: ${c.colors.gradientBase};
    background-image: ${c.colors.gradient};
    font-size: ${c.fontSizes.smallHeader};

    /* Other */
    box-shadow: ${c.shadows.mainShadows};
`;var G=function(e){let{style:t,children:a,onClick:n,paddingTop:o,paddingBottom:l}=e;return r.a.createElement(R,{style:t,onClick:n,$paddingTop:o,$paddingBottom:l},r.a.createElement("div",null,a))};var Y=function(e){let{children:t,token:a,onScreenChange:o}=e;const[l,i]=Object(n.useState)("Set up your first training plan"),[s,d]=Object(n.useState)([]),p=4,u=4,m=134;return Object(n.useEffect)(()=>{(async()=>{try{var e;const t=await g.a.get("https://sportappserver-production.up.railway.app/api/trainingPlans",{headers:{Authorization:"Bearer "+a}});200===t.status&&(null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.data.length)>0&&(d(t.data.data),i("Today"))}catch(t){console.error("Error fetching data:",t)}})()},[a]),r.a.createElement(N,null,r.a.createElement(E,{fontSize:c.fontSizes.mediumHeader},l),function(){if(s.length>0){const e=s.filter(e=>!0===e.is_current_plan);if(e.length<=0)return r.a.createElement(G,{$paddingBottom:"10px",style:{marginTop:"10px"}},r.a.createElement(E,{fontSize:"18px",style:{padding:"7px 0 25px 0"}},s[0].name),r.a.createElement(v,{onClick:()=>{console.log("Button to start training")},width:"280px"},"Start training"));console.log(e)}return r.a.createElement(G,{$paddingBottom:"40px",$paddingTop:"40px",style:{marginTop:"10px"}},r.a.createElement(v,{onClick:()=>{o("NewTrainingPlan")},width:"280px"},"Create training plan"))}(),r.a.createElement(z,null),r.a.createElement(E,{fontSize:c.fontSizes.mediumHeader},"Progress"),r.a.createElement("div",{style:{display:"flex",width:"360px",margin:"0 auto",marginTop:"10px"}},r.a.createElement(G,{style:{width:"172px",paddingBottom:"18px",paddingTop:"18px"}},r.a.createElement(E,{fontSize:"33px"},m||"0 min"),r.a.createElement("p",{style:{color:"#EEE",margin:"8px 0 0 0",fontSize:"15px"}},"Spent exercising")),r.a.createElement(G,{style:{width:"172px",paddingBottom:"18px",paddingTop:"18px"}},r.a.createElement(E,{fontSize:"33px"},u||"0"),r.a.createElement("p",{style:{color:"#EEE",margin:"8px 0 0 0",fontSize:"15px"}},"Training per week"))),r.a.createElement(G,{style:{marginTop:"16px"},paddingBottom:"18px",paddingTop:"18px"},r.a.createElement(E,{fontSize:"33px"},p||"0"),r.a.createElement("p",{style:{color:"#EEE",margin:"8px 0 0 0",fontSize:"15px"}},"Workouts completed")),t)};var q=i.c.div`

`;var J=function(e){let{activeIcon:t,onClick:a,style:n}=e;return r.a.createElement("div",{style:n},r.a.createElement("svg",{width:"45",height:"45",viewBox:"0 0 45 45",fill:"none",xmlns:"http://www.w3.org/2000/svg",onClick:a},r.a.createElement("path",{d:"M12.7058 14.9409H10.9706C10.0501 14.9409 9.16736 15.3066 8.51651 15.9574C7.86565 16.6083 7.5 17.491 7.5 18.4115V34.029C7.5 34.9495 7.86565 35.8322 8.51651 36.4831C9.16736 37.134 10.0501 37.4996 10.9706 37.4996H26.5881C27.5086 37.4996 28.3913 37.134 29.0422 36.4831C29.693 35.8322 30.0587 34.9495 30.0587 34.029V32.2937",stroke:t?"#181818":"#EEE","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}),r.a.createElement("path",{d:"M28.3234 11.4708L33.5293 16.6766M35.9326 14.2212C36.6161 13.5377 37 12.6108 37 11.6443C37 10.6778 36.6161 9.75082 35.9326 9.06738C35.2492 8.38395 34.3222 8 33.3557 8C32.3892 8 31.4623 8.38395 30.7788 9.06738L16.1764 23.6177V28.8236H21.3823L35.9326 14.2212Z",stroke:t?"#181818":"#EEE","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})))};var K=function(e){let{token:t,onScreenChange:a,setTrainingPlanId:o}=e;const[l,i]=Object(n.useState)(null),[s,d]=Object(n.useState)(null);return Object(n.useEffect)(()=>{!async function(){var e;const a=await g.a.get("https://sportappserver-production.up.railway.app/api/trainingPlans",{headers:{Authorization:"Bearer "+t}});a&&(null===a||void 0===a||null===(e=a.data)||void 0===e?void 0:e.data)?i(a.data.data):i(null)}()},[t]),Object(n.useEffect)(()=>{s&&(async()=>{try{console.log("Deleting training plan with ID:",s);const e=await g.a.delete("https://sportappserver-production.up.railway.app/api/deleteTrainingPlan",{headers:{Authorization:"Bearer "+t},data:{trainingPlanId:s}});console.log("Delete response:",e),200===e.status&&i(e=>e.filter(e=>e.plan_id!==s)),d(null)}catch(e){console.error("Error deleting training plan:",e)}})()},[s,t]),r.a.createElement(q,null,l&&0!==l.length?l.map(e=>r.a.createElement(G,{key:e.plan_id,"data-elem":e.plan_id,style:{marginBottom:"14px",position:"relative"}},r.a.createElement("div",{style:{color:"white"}},r.a.createElement(E,{fontSize:"18px"},e.name)),r.a.createElement(J,{style:{position:"absolute",right:0,top:0},onClick:()=>{return t=e.plan_id,o(t),void a("SetUpTrainingDays");var t}}),r.a.createElement("div",{style:{position:"absolute",left:7,top:7,padding:"10px",border:"solid 1px red"}},r.a.createElement(E,{onClick:()=>(e=>{d(e)})(e.plan_id),fontSize:"16px"},"DEL")))):r.a.createElement("div",null,r.a.createElement("div",{style:{padding:"30px 0 10px 0"}},r.a.createElement(E,{fontSize:c.fontSizes.mediumHeader},"No training plans yet"))),r.a.createElement(v,{onClick:()=>a("NewTrainingPlan")},"Add new training plan"))};var X=function(e){let{style:t}=e;return r.a.createElement("div",{style:t},r.a.createElement("svg",{width:"26",height:"26",viewBox:"0 0 26 26",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M2.626 26C1.87742 26 1.25287 25.7497 0.752375 25.2492C0.251875 24.7487 0.00108333 24.1237 0 23.374V2.626C0 1.87742 0.250791 1.25287 0.752375 0.752375C1.25396 0.251875 1.8785 0.00108333 2.626 0H23.3756C24.1231 0 24.7477 0.250791 25.2492 0.752375C25.7508 1.25396 26.0011 1.8785 26 2.626V23.3756C26 24.1231 25.7497 24.7477 25.2492 25.2492C24.7487 25.7508 24.1237 26.0011 23.374 26H2.626ZM2.626 24.375H23.3756C23.6248 24.375 23.8539 24.271 24.063 24.063C24.2721 23.855 24.3761 23.6253 24.375 23.374V2.626C24.375 2.37575 24.271 2.14608 24.063 1.937C23.855 1.72792 23.6253 1.62392 23.374 1.625H2.626C2.37575 1.625 2.14608 1.729 1.937 1.937C1.72792 2.145 1.62392 2.37467 1.625 2.626V23.3756C1.625 23.6248 1.729 23.8539 1.937 24.063C2.145 24.2721 2.37412 24.3761 2.62437 24.375M5.6875 20.3125H20.5627L15.9689 14.1862L11.7195 19.5617L8.87575 16.1249L5.6875 20.3125Z",fill:"#EEEEEE"})))};const Q=i.c.div`
  display: inline-block;
  position: relative;
  height: 20px;
`,ee=i.c.input.attrs({type:"checkbox"})`
  opacity: 0;
  position: absolute;
  left: 0;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin: 0;

  &:checked + span {
    background-color: #EEE;
  }

  &:checked + span::after {
    display: block;
  }
`,te=i.c.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: 1px solid #EEE;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    display: none;
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid #000;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`,ae=i.c.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid ${c.colors.gradientBase};
  background: ${e=>{let{isActive:t}=e;return t?c.colors.gradient:"transparent"}};
  cursor: pointer;
  position: relative;
  color: ${c.colors.whiteText};
  font-size: 14px;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: ${e=>{let{isActive:t}=e;return t?c.colors.gradientBase:"transparent"}};
    z-index: -1;
    border-radius: 5px;
  }
`;var ne=function(e,t){let a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r.a.createElement(Q,{style:t},r.a.createElement(ee,{ischecked:a,onChange:e}),r.a.createElement(te,null))};var re=function(e){let{isActive:t=!1,children:a,onClick:n}=e;return r.a.createElement(ae,{isActive:t,onClick:n},a)};var oe=function(e){let{token:t,setTraininPlanId:a,onScreenChange:o}=e;const[l,i]=Object(n.useState)(""),[c,s]=Object(n.useState)(""),[d,p]=Object(n.useState)([]),[u,m]=Object(n.useState)(!1),[h,x]=Object(n.useState)(!1),[C,y]=Object(n.useState)(null);return Object(n.useEffect)(()=>{h&&((async()=>{try{const e={name:l,description:c,days_per_week:d,thumbnail_image:null,is_current_plan:u},n=await g.a.post("https://sportappserver-production.up.railway.app/api/addTrainingPlan",e,{headers:{Authorization:"Bearer "+t}});a(n.data.planId)}catch(e){console.error("Error while creating training plan: ",e)}})(),o("SetUpTrainingDays"))},[h,l,c,d,null,u,t,a,o]),r.a.createElement("div",null,r.a.createElement(E,{fontSize:"23px",fontWeight:600},"Training plan details"),r.a.createElement(f,{placeholder:"Title",onChange:e=>i(e.target.value)}),r.a.createElement(f,{placeholder:"Description",onChange:e=>s(e.target.value)}),r.a.createElement(E,{fontSize:"23px",fontWeight:600},"Training days"),r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(e=>r.a.createElement(re,{key:e,isActive:d.includes(e),onClick:()=>function(e){p(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])}(e)},r.a.createElement("div",null,e)))),r.a.createElement(E,{fontSize:"23px",fontWeight:600},"Add image"),r.a.createElement(v,{style:{marginTop:"10px"}},r.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement("div",{style:{padding:"0 16px 0 42px"}},"Choose"),r.a.createElement(X,null))),r.a.createElement(E,{fontSize:"23px",fontWeight:600,style:{marginTop:"10px"}},"Current training plan"),r.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"23px"}},r.a.createElement("div",null,r.a.createElement("p",{style:{color:"#EEE",margin:"8px 0 0 0",fontSize:"15px",width:"188px"}},"You will see your training plan on dashboard")),r.a.createElement("div",{style:{height:"20px"}},r.a.createElement(ne,{ischecked:u,onChange:()=>m(!u)}))),C&&r.a.createElement("p",{style:{color:"red"}},C),r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"10px"}},r.a.createElement(v,{onClick:()=>o("Trainings"),width:"172px"},"Back"),r.a.createElement(v,{onClick:function(){""!==l&&""!==c&&d.length>0?x(!0):y("All fields shoud be filled")},width:"172px"},"Next")))};var le=function(e){let{token:t,onScreenChange:a,trainingPlanId:o,setTraininDayId:l}=e;const[i,s]=Object(n.useState)(null),[d,p]=Object(n.useState)(null);return Object(n.useEffect)(()=>{(async e=>{var a,n;const r=await g.a.get("https://sportappserver-production.up.railway.app/api/getTrainingDays",{headers:{Authorization:"Bearer "+t},params:{trainingPlanId:e}});(null===r||void 0===r||null===(a=r.data)||void 0===a||null===(n=a.trainingDaysData)||void 0===n?void 0:n.data.length)>0&&s(r.data.trainingDaysData.data)})(o)},[t,o]),Object(n.useEffect)(()=>{d&&(async()=>{200===(await g.a.delete("https://sportappserver-production.up.railway.app/api/deleteTrainingDays",{headers:{Authorization:"Bearer "+t},data:{day_id:d}})).status&&s(e=>e.filter(e=>e.day_id!==d)),p(null)})()},[d,t]),r.a.createElement("div",null,!i||i.length<=0?r.a.createElement("div",null,r.a.createElement("div",{style:{padding:"30px 0 10px 0"}},r.a.createElement(E,{fontSize:c.fontSizes.mediumHeader},"No training days yet"))):i.map(e=>r.a.createElement(G,{key:e.day_id,"data-elem":e.day_id,style:{marginBottom:"14px",position:"relative"},onClick:()=>{return t=e.day_id,l(t),void a("SetUpExercises");var t}},r.a.createElement("div",{style:{color:"white"}},r.a.createElement(E,{fontSize:"18px"},e.name),r.a.createElement("p",{style:{marginBottom:"0"}},e.description)),r.a.createElement(J,{style:{position:"absolute",right:0,top:0},onClick:()=>{}}),r.a.createElement("div",{style:{position:"absolute",left:7,top:7,padding:"10px",border:"solid 1px red"}},r.a.createElement(E,{onClick:()=>(e=>{console.log("delete day"),p(e)})(e.day_id),fontSize:"16px"},"DEL")))),r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"10px"}},r.a.createElement(v,{onClick:()=>a("Trainings"),width:"172px"},"Back"),r.a.createElement(v,{onClick:()=>a("AddTrainingDay"),width:"172px"},"Add day")))};var ie=function(e){let{token:t,onScreenChange:a,trainingPlanId:o}=e;const[l,i]=Object(n.useState)(""),[c,s]=Object(n.useState)(""),[d,p]=Object(n.useState)(!1),[u,m]=Object(n.useState)(null);return Object(n.useEffect)(()=>{d&&(async()=>{await g.a.post("https://sportappserver-production.up.railway.app/api/addTrainingDay",{trainingPlanId:o,dayName:l,dayDescription:c},{headers:{Authorization:"Bearer "+t}}),a("SetUpTrainingDays")})()},[d,l,c,a,t,o]),r.a.createElement("div",null,r.a.createElement(E,{fontSize:"23px",fontWeight:600},"Training plan details"),r.a.createElement(f,{placeholder:"Title",onChange:e=>i(e.target.value)}),r.a.createElement(f,{placeholder:"Description",onChange:e=>s(e.target.value)}),r.a.createElement(E,{fontSize:"23px",fontWeight:600},"Add image"),r.a.createElement(v,{style:{marginTop:"10px"}},r.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement("div",{style:{padding:"0 16px 0 42px"}},"Choose"),r.a.createElement(X,null))),u&&r.a.createElement("p",{style:{color:"red"}},u),r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"10px"}},r.a.createElement(v,{onClick:()=>a("SetUpTrainingDays"),width:"172px"},"Back"),r.a.createElement(v,{onClick:function(){console.log("statu"),""===l||""===c?m("All fields shoud be filled"):p(!0)},width:"172px"},"Save")))};var ce=function(e){let{token:t,onScreenChange:a,traininDayId:o}=e;const[l,i]=Object(n.useState)(null),[s,d]=Object(n.useState)(null);return Object(n.useEffect)(()=>{(async()=>{try{var e,a;const n=await g.a.get("https://sportappserver-production.up.railway.app/api/getDayExercise",{headers:{Authorization:"Bearer "+t},params:{day_id:o}});i(null===n||void 0===n||null===(e=n.data)||void 0===e||null===(a=e.exerciseData)||void 0===a?void 0:a.data)}catch(n){console.error("Error fetching exercises:",n)}})()},[t,o]),Object(n.useEffect)(()=>{s&&(async()=>{try{200===(await g.a.delete("https://sportappserver-production.up.railway.app/api/deleteDayExercise",{headers:{Authorization:"Bearer "+t},data:{day_exercise_id:s}})).status&&i(e=>e.filter(e=>e.day_exercise_id!==s)),d(null)}catch(e){console.error("Error deleting exercise:",e)}})()},[s,t]),r.a.createElement("div",null,!l||l.length<=0?r.a.createElement("div",null,r.a.createElement("div",{style:{padding:"10px 0 10px 0"}},r.a.createElement(E,{fontSize:c.fontSizes.mediumHeader},"No exercises yet"))):l.map(e=>r.a.createElement(G,{key:e.day_exercise_id,style:{marginBottom:"14px",position:"relative"}},r.a.createElement("div",{style:{color:"white"}},r.a.createElement(E,{fontSize:"18px"},e.exercise_name),r.a.createElement("div",{style:{marginBottom:"0"}},"Reps: ",e.reps),r.a.createElement("div",{style:{marginBottom:"0"}},"Weight: ",e.weight),r.a.createElement("div",{style:{marginBottom:"0"}},"Sets: ",e.sets),r.a.createElement("div",{style:{marginBottom:"0"}},"Rest: ",e.rest_time)),r.a.createElement(J,{style:{position:"absolute",right:0,top:0},onClick:()=>{}}),r.a.createElement("div",{style:{position:"absolute",left:7,top:7,padding:"10px",border:"solid 1px red"}},r.a.createElement(E,{onClick:()=>{return t=e.day_exercise_id,void d(t);var t},fontSize:"16px"},"DEL")))),r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"10px"}},r.a.createElement(v,{onClick:()=>a("SetUpTrainingDays"),width:"172px"},"Back"),r.a.createElement(v,{onClick:()=>a("SetUpExercise"),width:"172px"},"Add exercise")))};var se=function(e){let{token:t,onScreenChange:a,traininDayId:o}=e;const[l,i]=Object(n.useState)([]),[c,s]=Object(n.useState)({name:"",exerciseId:""}),d=["Chest","Back","Legs","Shoulders","Arms","Core"],[p,u]=Object(n.useState)("Chest"),[m,h]=Object(n.useState)(null),[x,C]=Object(n.useState)(null),[y,w]=Object(n.useState)(null),[b,S]=Object(n.useState)(null),[k,T]=Object(n.useState)(null),[j,z]=Object(n.useState)(null),[B,H]=Object(n.useState)(!1),[O,D]=Object(n.useState)(null);return Object(n.useEffect)(()=>{(async()=>{try{const n=await g.a.get("https://sportappserver-production.up.railway.app/api/getAllExercises",{headers:{Authorization:"Bearer "+t},params:{muscle_group:p}});var e,a;if(200===n.status)i(n.data.data),s({name:(null===(e=n.data.data[0])||void 0===e?void 0:e.name)||"",exerciseId:(null===(a=n.data.data[0])||void 0===a?void 0:a.exercise_id)||""})}catch(n){console.error("Error fetching exercises:",n)}})()},[p,t]),Object(n.useEffect)(()=>{B&&(async()=>{await g.a.post("https://sportappserver-production.up.railway.app/api/addDayExercise",{day_id:o,exercise_id:c.exerciseId,muscle_group:p,sets:m,weight:x,reps:y,description:b,rest_time:`${k}:${j}`},{headers:{Authorization:"Bearer "+t}}),a("SetUpExercises")})()},[B,o,c.exerciseId,p,m,x,y,b,k,j,t,a]),r.a.createElement("div",null,r.a.createElement(E,null,"Muscle group"),r.a.createElement("select",{id:"muscleGroupDropdown",value:p,onChange:e=>u(e.target.value)},0===d.length?r.a.createElement("option",{value:""},"No muscle group to display"):d.map(e=>r.a.createElement("option",{key:e,value:e},e))),r.a.createElement(E,null,"Exercise"),r.a.createElement("select",{id:"exerciseDropdown",value:c.name,onChange:e=>{const t=e.target.options[e.target.selectedIndex];s({name:e.target.value,exerciseId:t.getAttribute("data-exercise-id")})}},0===l.length?r.a.createElement("option",{value:""},"No exercise to display"):l.map(e=>r.a.createElement("option",{key:e.exercise_id,"data-exercise-id":e.exercise_id,value:e.name},e.name))),r.a.createElement(E,null,"Exercise details"),r.a.createElement(f,{placeholder:"Series",value:m,onChange:e=>h(e.target.value)}),r.a.createElement(f,{placeholder:"Weight",value:x,onChange:e=>C(e.target.value)}),r.a.createElement(f,{placeholder:"Times",value:y,onChange:e=>w(e.target.value)}),r.a.createElement(f,{placeholder:"Description",value:b,onChange:e=>S(e.target.value)}),r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},r.a.createElement(f,{placeholder:0,style:{width:"145px",height:"70px"},type:"number",value:k,onChange:e=>T(e.target.value)}),r.a.createElement(E,null,":"),r.a.createElement(f,{placeholder:0,style:{width:"145px",height:"70px"},type:"number",value:j,onChange:e=>z(e.target.value)})),O&&r.a.createElement("p",{style:{color:"red"}},O),r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"10px"}},r.a.createElement(v,{onClick:()=>a("SetUpExercises"),width:"172px"},"Back"),r.a.createElement(v,{onClick:function(){""===c.name||""===p?D("Select muscle group and exercise"):H(!0)},width:"172px"},"Save")))};var de=i.c.div`

`;var pe=function(e){let{children:t,onScreenChange:a}=e;return r.a.createElement(de,null,r.a.createElement("div",{style:{padding:"30px 0 10px 0"}},r.a.createElement(E,{fontSize:"23px"},"Functionality is not available")),r.a.createElement(v,{onClick:()=>{a("Dashboard")}},"Go to Dashboard"),t)};var ge=i.c.div`

`;var ue=function(e){let{children:t,onScreenChange:a}=e;return r.a.createElement(ge,null,r.a.createElement("div",{style:{padding:"30px 0 10px 0"}},r.a.createElement(E,{fontSize:"23px"},"Functionality is not available")),r.a.createElement(v,{onClick:()=>{a("Dashboard")}},"Go to Dashboard"),t)};var me=i.c.div`

`;var he=function(e){let{children:t,onScreenChange:a,token:n}=e;return r.a.createElement(me,null,r.a.createElement("div",{style:{padding:"30px 0 10px 0"}},r.a.createElement(E,{fontSize:"23px"},"Not found 404")),r.a.createElement(v,{onClick:()=>{a("Dashboard")}},"Go to Dashboard"),t)};const Ee=()=>"Roman";var xe=function(){const e=localStorage.getItem("authToken");e||(window.location.href="/login");const t=Ee(),[a,o]=Object(n.useState)("Hi, "+t),[l,i]=Object(n.useState)("Dashboard"),[s,d]=Object(n.useState)(0),[p,g]=Object(n.useState)(0),[u,m]=Object(n.useState)(0);Object(n.useEffect)(()=>{o({Dashboard:"Hi, "+t,Trainings:"Trainings",NewTrainingPlan:"New training plan",SetUpTrainingDays:"Set up training days",AddTrainingDay:"Set up training days",SetUpExercises:"Set up exercises",SetUpExercise:"Set up exercise",Diet:"Diet",Calculator:"Calculator"}[l])},[l,t]);const h=Object(n.useRef)(null),[x,f]=Object(n.useState)(0);Object(n.useEffect)(()=>{h.current&&f(h.current.offsetHeight)},[]);const C=window.innerHeight,v=C-x-85,y=v-160,[w,b]=Object(n.useState)(!1);return r.a.createElement("div",{style:{display:"flex",flexDirection:"column",height:"100vh",textAlign:"center"}},r.a.createElement("div",{ref:h,style:{display:"flex",width:"360px",margin:"10px auto",justifyContent:"space-between",alignItems:"flex-end"}},r.a.createElement("div",null,r.a.createElement(E,{color:c.colors.darkBackground,fontSize:"27px"},a)),r.a.createElement(A,{onClick:()=>b(e=>!e)})),r.a.createElement("div",{style:{flex:1}},r.a.createElement(Z,{token:e})),r.a.createElement(B,{style:{height:v+"px",position:"absolute",top:w?C-207:x+15,transition:"top 0.3s ease"}},r.a.createElement("div",{className:"no-scrollbar",style:{height:y+"px",overflowY:"scroll",overflowX:"hidden"}},(()=>{switch(l){case"Dashboard":return r.a.createElement(Y,{token:e,onScreenChange:i});case"Trainings":return r.a.createElement(K,{token:e,onScreenChange:i,setTrainingPlanId:d});case"NewTrainingPlan":return r.a.createElement(oe,{token:e,onScreenChange:i,setTrainingPlanId:d});case"SetUpTrainingDays":return r.a.createElement(le,{token:e,onScreenChange:i,trainingPlanId:s,setTraininDayId:g});case"AddTrainingDay":return r.a.createElement(ie,{token:e,onScreenChange:i,trainingPlanId:s});case"SetUpExercises":return r.a.createElement(ce,{token:e,onScreenChange:i,traininDayId:p,setTrainingExerciseId:m});case"SetUpExercise":return r.a.createElement(se,{token:e,onScreenChange:i,traininDayId:p,trainingExerciseId:u});case"Diet":return r.a.createElement(pe,{token:e,onScreenChange:i});case"Calculator":return r.a.createElement(ue,{token:e,onScreenChange:i});default:return r.a.createElement(he,{token:e,onScreenChange:i})}})())),r.a.createElement(P,{style:{width:"100%"},currentScreen:l,onScreenChange:i}))};const fe=i.c.div`
  min-height: 100vh;
  background-color: ${e=>e.$bgColor};
`;const Ce=e=>{let{$bgColor:t,children:a}=e;return r.a.createElement(fe,{$bgColor:t},a)};var ve=function(){return r.a.createElement(i.a,{theme:c},r.a.createElement(s,null),r.a.createElement(d.a,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0}},r.a.createElement(p.d,null,r.a.createElement(p.b,{path:"/",element:r.a.createElement(p.a,{to:"/dashboard",replace:!0})}),r.a.createElement(p.b,{path:"/dashboard",element:r.a.createElement(Ce,{$bgColor:"#EEE"},r.a.createElement(xe,null))}),r.a.createElement(p.b,{path:"/login",element:r.a.createElement(Ce,{$bgColor:"#181818"},r.a.createElement(w,null))}),r.a.createElement(p.b,{path:"/registration",element:r.a.createElement(Ce,{$bgColor:"#181818"},r.a.createElement(w,null))}))))};const ye=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.[0-9]+){0,2}\.[0-9]+$/));function we(e,t){navigator.serviceWorker.register(e).then(e=>{e.onupdatefound=()=>{const a=e.installing;null!=a&&(a.onstatechange=()=>{"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("\u041d\u043e\u0432\u0438\u0439 \u043a\u043e\u043d\u0442\u0435\u043d\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0438\u0439, \u043e\u043d\u043e\u0432\u0456\u0442\u044c \u0441\u0442\u043e\u0440\u0456\u043d\u043a\u0443."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("\u041a\u043e\u043d\u0442\u0435\u043d\u0442 \u043a\u0435\u0448\u0443\u0454\u0442\u044c\u0441\u044f \u0434\u043b\u044f \u043e\u0444\u043b\u0430\u0439\u043d \u0432\u0438\u043a\u043e\u0440\u0438\u0441\u0442\u0430\u043d\u043d\u044f."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(e=>{console.error("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0440\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u0457 Service Worker:",e)})}l.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ve,null))),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",()=>{const t="/service-worker.js";ye?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then(a=>{const n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(e=>{e.unregister().then(()=>{window.location.reload()})}):we(e,t)}).catch(()=>{console.log("\u041d\u0435\u043c\u0430\u0454 \u043f\u0456\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u043d\u044f \u0434\u043e \u0456\u043d\u0442\u0435\u0440\u043d\u0435\u0442\u0443. \u041f\u0440\u043e\u0433\u0440\u0430\u043c\u0430 \u043f\u0440\u0430\u0446\u044e\u0454 \u0432 \u043e\u0444\u043b\u0430\u0439\u043d \u0440\u0435\u0436\u0438\u043c\u0456.")})}(t,e),navigator.serviceWorker.ready.then(()=>{console.log("\u0426\u0435 \u0434\u043e\u0434\u0430\u0442\u043e\u043a \u043f\u0440\u0430\u0446\u044e\u0454 \u0432 \u0440\u0435\u0436\u0438\u043c\u0456 \u043a\u0435\u0448\u0443. \u0414\u043e\u0434\u0430\u0442\u043a\u043e\u0432\u0456 \u0444\u0443\u043d\u043a\u0446\u0456\u0457 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0456.")})):we(t,e)})}}()}},[[21,1,2]]]);
//# sourceMappingURL=main.663d4af1.chunk.js.map