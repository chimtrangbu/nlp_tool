(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(t,e,n){t.exports=n(17)},15:function(t,e,n){},16:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),c=n(3),o=n.n(c),l=(n(15),n(4)),s=n(5),i=n(8),u=n(6),h=n(9),m=(n(16),n(7)),d=["Noun","Verb"],p=function(t){function e(t){var n;Object(l.a)(this,e),(n=Object(i.a)(this,Object(u.a)(e).call(this,t))).state={currentFile:1,current:0,words:[],result:[]};var r=window.location.pathname.split("/").pop(0);return fetch("/nlp_tool/files/".concat(r,".txt")).then(function(t){return t.text()}).then(function(t){t.includes("html")?n.setState({currentFile:-1}):n.setState({currentFile:parseInt(r),words:t.split(" ")})}),n}return Object(h.a)(e,t),Object(s.a)(e,[{key:"setPOS",value:function(t){var e=this;this.setState(function(n,r){if(n.result.push(n.words[n.current]+"\t"+t+"\n"),e.state.current!==e.state.words.length-1)return{current:n.current+1,result:n.result};var a=new Blob(e.state.result,{type:"text/plain;charset=utf-8"});Object(m.saveAs)(a,"".concat(e.state.currentFile,".txt"));var c=n.currentFile+1;try{return window.location.pathname="/nlp_tool/".concat(c),fetch("/nlp_tool/files/".concat(c,".txt")).then(function(t){return t.text()}).then(function(t){t.includes("html")?e.setState({currentFile:-1}):e.setState({words:t.split(" ")})}),{currentFile:c,current:0,words:[],result:[]}}catch(o){return{currentFile:-1,words:[]}}})}},{key:"render",value:function(){var t=this,e=this.state.words.map(function(e,n){return n===t.state.current?a.a.createElement("span",{key:n,className:"text-danger ml-3"},e):a.a.createElement("span",{key:n,className:"ml-3"},e)}),n=d.map(function(e){return a.a.createElement("button",{className:"btn btn-primary mr-3",key:e,onClick:function(){return t.setPOS.bind(t)(e)}},e)});return a.a.createElement("div",{className:"container"},a.a.createElement("br",null),a.a.createElement("div",null,"File: ",-1===this.state.currentFile?"No more file":this.state.currentFile+".txt"),"Cau: ",a.a.createElement("div",{style:{overflowWrap:"break-word"}},e),a.a.createElement("p",null," Chon tu loai: "),n)}}]),e}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.5a7752d8.chunk.js.map