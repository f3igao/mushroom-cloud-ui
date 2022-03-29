(this["webpackJsonpmushroom-cloud-ui"]=this["webpackJsonpmushroom-cloud-ui"]||[]).push([[0],{185:function(e,t,n){"use strict";(function(e){var r=n(29),s=n(2),a=n(10),c=n(11),o=n(27),i=n(26),u=n(0),d=n.n(u),l=n(13),f=n(1),h=n.n(f),p=n(7),m=n(200),b=n(186),j=n(68),g=n(187),x=n(188),v=n(9),A=n(4),O={fetching:!1,contractResult:"",owner:"",assetInfo:null,imageSrc:"",description:""},w=function(t){Object(o.a)(u,t);var n=Object(i.a)(u);function u(t){var c;return Object(a.a)(this,u),(c=n.call(this,t)).contractService=new g.a,c.transactionService=new x.a,c.chainService=new j.a,c.setAsset=function(){var e=Object(s.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c.setState({fetching:!0}),c.chainService.indexer.lookupAssetByID(t).do().then((function(e){var t=e.asset.params;c.setState({assetInfo:t,fetching:!1}),c.getAssetMetadata(t.url)})).catch((function(e){console.error(e)})),c.chainService.indexer.lookupAssetBalances(t).do().then((function(e){var t=e.balances.find((function(e){return e.amount>0}));c.setState({owner:t.address})}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),c.onSellAsset=Object(s.a)(d.a.mark((function e(){var t,n,r,s,a,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=c.props.address,n=c.props.assetIndex,r=v.l,!t||!r){e.next=21;break}return c.setState({fetching:!0}),e.prev=5,e.next=8,c.contractService.generateAssetSaleContract(t,n,r);case 8:return s=e.sent,a=s.result,o=s.hash,e.next=12,c.transactionService.sellAsset({seller:t,assetIndex:n,contractResult:a});case 12:e.sent,c.setState({contractResult:a}),console.log(a,o),e.next=20;break;case 17:throw e.prev=17,e.t0=e.catch(5),e.t0;case 20:c.setState({fetching:!1});case 21:case"end":return e.stop()}}),e,null,[[5,17]])}))),c.onBuyAsset=Object(s.a)(d.a.mark((function t(){var n,r,s,a,o,i;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(c.props.address){t.next=3;break}return c.props.connector.createSession(),t.abrupt("return");case 3:if(n=new Uint8Array(e.from(v.e,"base64")),r=new l.LogicSigAccount(n),s=c.props.address,a=c.state.owner,o=c.props.assetIndex,i=v.l,!(s&&a&&r&&o&&i)){t.next=22;break}return c.setState({fetching:!0}),t.prev=11,t.next=14,c.transactionService.buyAsset({buyer:s,seller:a,assetIndex:o,price:i,contractSig:r});case 14:t.sent,c.setState({contractResult:""}),t.next=21;break;case 18:throw t.prev=18,t.t0=t.catch(11),t.t0;case 21:c.setState({fetching:!1});case 22:case"end":return t.stop()}}),t,null,[[11,18]])}))),c.getAssetMetadata=function(){var e=Object(s.a)(d.a.mark((function e(t){var n,r,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.replace(v.i,v.j),e.next=3,c.contractService.getAssetMetadataFromIpfs(n);case 3:r=e.sent,s=r.properties.source_image.replace(v.i,v.j),c.setState({description:r.description,imageSrc:s});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),c.state=Object(r.a)({},O),c}return Object(c.a)(u,[{key:"componentDidMount",value:function(){console.log("asset component did mount"),this.setAsset(this.props.assetIndex)}},{key:"render",value:function(){var e,t=this.state.owner===this.props.address,n=(null===(e=this.state.assetInfo)||void 0===e?void 0:e.creator)===this.props.address,r=this.state.assetInfo;return console.log(this.state),r&&Object(A.jsxs)("div",{className:"pv5 ph6",children:[Object(A.jsx)("p",{className:"f3 b",children:r.name}),Object(A.jsxs)("div",{className:"flex justify-between",children:[Object(A.jsxs)("div",{className:"w-40",children:[Object(A.jsx)(v.o,{src:this.state.imageSrc,alt:"nft"}),Object(A.jsxs)("div",{className:"mt3",children:[t&&Object(A.jsx)(b.a,{onSellAsset:this.onSellAsset}),n&&!t&&Object(A.jsx)(v.n,{className:"w-100",disabled:!0,children:"Asset on Sale"}),!n&&!t&&Object(A.jsx)(m.a,{price:v.l,onBuyAsset:this.onBuyAsset})]})]}),Object(A.jsxs)("div",{className:"w-50",children:[Object(A.jsxs)(v.m,{children:[Object(A.jsx)("span",{className:"b mb1",children:"owner"}),Object(A.jsx)("span",{children:r.manager})]}),this.state.description&&Object(A.jsxs)(v.m,{children:[Object(A.jsx)("span",{className:"b mb1",children:"description"}),Object(A.jsx)("span",{children:this.state.description})]}),Object(A.jsxs)(v.m,{children:[Object(A.jsx)("span",{className:"b mb1",children:"url"}),Object(A.jsx)("span",{children:r.url})]}),Object(A.jsxs)(v.m,{children:[Object(A.jsx)("span",{className:"b mb1",children:"creator"}),Object(A.jsx)("span",{children:r.creator})]})]})]})]})}}]),u}(h.a.Component);t.a=function(e){var t=Object(p.h)();return Object(A.jsx)(w,Object(r.a)(Object(r.a)({},e),{},{assetIndex:Number(t.index)}))}}).call(this,n(14).Buffer)},186:function(e,t,n){"use strict";var r=n(9),s=n(4);t.a=function(e){var t=e.onSellAsset;return Object(s.jsx)(r.n,{className:"w-100 pointer",onClick:t,children:"Put on Sale"})}},187:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n(2),s=n(11),a=n(10),c=n(0),o=n.n(c),i=n(9),u=Object(s.a)((function e(){Object(a.a)(this,e),this.generateAssetSaleContract=function(){var e=Object(r.a)(o.a.mark((function e(t,n,r){var s,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s="https://us-central1-".concat(i.f,".cloudfunctions.net/asset_sale_contract?seller=").concat(t,"&asset=").concat(n,"&price=").concat(r),e.next=4,fetch(s);case 4:return a=e.sent,e.next=7,a.json();case 7:return e.abrupt("return",e.sent);case 10:throw e.prev=10,e.t0=e.catch(0),e.t0;case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,n,r){return e.apply(this,arguments)}}(),this.getAssetMetadataFromIpfs=function(){var e=Object(r.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.abrupt("return",fetch(t).then((function(e){return null===e||void 0===e?void 0:e.json()})));case 4:throw e.prev=4,e.t0=e.catch(0),e.t0;case 7:case"end":return e.stop()}}),e,null,[[0,4]])})));return function(t){return e.apply(this,arguments)}}()}))},188:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return h}));var r=n(2),s=n(11),a=n(10),c=n(0),o=n.n(c),i=n(13),u=n.n(i),d=n(9),l=n(68),f=n(69),h=Object(s.a)((function t(){var n=this;Object(a.a)(this,t),this.algod=(new l.a).algod,this.walletService=new f.a,this.sendAndConfirm=function(){var e=Object(r.a)(o.a.mark((function e(t){var r,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.algod.sendRawTransaction(t).do();case 3:return r=e.sent,console.log("sentTxns",r),e.next=7,u.a.waitForConfirmation(n.algod,r.txId,4);case 7:return s=e.sent,console.log("success",s),e.abrupt("return",s);case 12:throw e.prev=12,e.t0=e.catch(0),e.t0;case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}(),this.sellAsset=function(){var t=Object(r.a)(o.a.mark((function t(r){var s,a,c,d,l,f,h,p,m,b,j,g;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=r.seller,a=r.assetIndex,c=r.contractResult,t.prev=1,d=new Uint8Array(e.from(c,"base64")),l=new i.LogicSigAccount(d),t.next=6,n.algod.getTransactionParams().do();case 6:return f=t.sent,h=u.a.makePaymentTxnWithSuggestedParamsFromObject({from:s,to:l.address(),amount:5e5,suggestedParams:f}),p=u.a.makeAssetTransferTxnWithSuggestedParamsFromObject({from:l.address(),to:l.address(),amount:0,assetIndex:a,suggestedParams:f}),m=u.a.makeAssetTransferTxnWithSuggestedParamsFromObject({from:s,to:l.address(),assetIndex:a,amount:1,suggestedParams:f}),b=u.a.assignGroupID([h,p,m]),t.next=13,n.walletService.sign(b);case 13:return(j=t.sent)[1]=u.a.signLogicSigTransactionObject(b[1],l).blob,t.next=17,n.sendAndConfirm(j);case 17:return g=t.sent,t.abrupt("return",g);case 21:throw t.prev=21,t.t0=t.catch(1),t.t0;case 24:case"end":return t.stop()}}),t,null,[[1,21]])})));return function(e){return t.apply(this,arguments)}}(),this.buyAsset=function(){var e=Object(r.a)(o.a.mark((function e(t){var r,s,a,c,i,l,f,h,p,m,b,j,g;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.buyer,s=t.seller,a=t.assetIndex,c=t.price,i=t.contractSig,e.prev=1,e.next=4,n.algod.getTransactionParams().do();case 4:return l=e.sent,f=u.a.makePaymentTxnWithSuggestedParamsFromObject({from:r,to:s,amount:1e6*c*.9,suggestedParams:l}),h=u.a.makeAssetTransferTxnWithSuggestedParamsFromObject({from:r,to:r,amount:0,assetIndex:a,suggestedParams:l}),p=u.a.makeAssetTransferTxnWithSuggestedParamsFromObject({from:i.address(),to:r,amount:1,assetIndex:a,closeRemainderTo:r,suggestedParams:l}),m=u.a.makePaymentTxnWithSuggestedParamsFromObject({from:i.address(),to:s,amount:0,closeRemainderTo:s,suggestedParams:l}),b=u.a.makePaymentTxnWithSuggestedParamsFromObject({from:r,to:d.c,amount:1e6*c*.1,suggestedParams:l}),j=u.a.assignGroupID([f,h,p,m,b]),e.next=13,n.walletService.sign(j);case 13:return(g=e.sent)[2]=u.a.signLogicSigTransactionObject(j[2],i).blob,g[3]=u.a.signLogicSigTransactionObject(j[3],i).blob,e.next=18,n.sendAndConfirm(g);case 18:return e.abrupt("return",e.sent);case 21:throw e.prev=21,e.t0=e.catch(1),console.log(e.t0),e.t0;case 25:case"end":return e.stop()}}),e,null,[[1,21]])})));return function(t){return e.apply(this,arguments)}}()}))}).call(this,n(14).Buffer)},200:function(e,t,n){"use strict";var r=n.p+"static/media/algo_dark.325d1e4a.svg",s=n(9),a=n(4),c={height:"1rem",marginLeft:"0.2rem"};t.a=function(e){var t=e.price,n=e.onBuyAsset;return Object(a.jsx)(s.n,{className:"pointer-fade w-100",onClick:n,children:Object(a.jsxs)("div",{className:"flex justify-center",children:[t,Object(a.jsx)("img",{style:c,src:r,alt:"algos"})]})})}},205:function(e,t,n){},207:function(e,t,n){},229:function(e,t){},231:function(e,t){},243:function(e,t){},245:function(e,t){},272:function(e,t){},273:function(e,t){},279:function(e,t){},281:function(e,t){},299:function(e,t){},359:function(e,t,n){"use strict";n.r(t);var r,s=n(1),a=n.n(s),c=n(181),o=n.n(c),i=(n(205),n(29)),u=n(2),d=n(10),l=n(11),f=n(27),h=n(26),p=n(0),m=n.n(p),b=n(199),j=n(7),g=(n(207),n(45)),x=n(46),v=n.p+"static/media/logo.21e62254.svg",A=n(9),O=n(4),w=x.a.span(r||(r=Object(g.a)(["\n  color: aqua;\n"]))),S=function(e){var t=e.address,n=e.connector,r=e.killSession,s=function(){var e=Object(u.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",n.createSession());case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(O.jsxs)("div",{className:"flex items-start justify-between",children:[Object(O.jsxs)("div",{className:"flex items-center f4 b w-50",children:[Object(O.jsx)("img",{src:v,className:"app-logo mr2",alt:"logo"}),"Mushroom Cloud NFT"]}),t?Object(O.jsxs)("div",{className:"flex flex-column tr",children:[Object(O.jsx)(w,{className:"b",children:Object(A.p)(t)}),Object(O.jsx)("span",{className:"pointer-fade",onClick:r,children:"Disconnect"})]}):Object(O.jsx)(A.n,{className:"pointer-fade",onClick:s,children:"Connect Wallet"})]})},M=n(185),E=function(){return Object(O.jsxs)("div",{className:"vh-75 flex flex-column justify-center",children:[Object(O.jsx)("h1",{children:"Mushroom Cloud LA / Proximities"}),Object(O.jsx)("h2",{children:"by Nancy Baker Cahill"})]})},I={connector:(new(n(69).a)).connector,fetching:!1,connected:!1,accounts:[],address:""},k=function(e){Object(f.a)(n,e);var t=Object(h.a)(n);function n(e){var r;Object(d.a)(this,n),(r=t.call(this,e)).subscribeToWalletEvents=function(){var e=r.state.connector;if(e){if(e.on("connect",(function(e,t){if(console.log('connector.on("connect")'),e)throw e;r.onConnect(t)})),e.on("session_update",function(){var e=Object(u.a)(m.a.mark((function e(t,n){var s;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log('connector.on("session_update")'),!t){e.next=3;break}throw t;case 3:s=n.params[0].accounts,r.onSessionUpdate(s);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),e.on("disconnect",(function(e,t){if(console.log('connector.on("disconnect")'),e)throw e;r.onDisconnect()})),e.connected){var t=e.accounts;r.setState({connected:!0,accounts:t,address:t[0]}),r.onSessionUpdate(t)}r.setState({connector:e})}},r.onConnect=function(){var e=Object(u.a)(m.a.mark((function e(t){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.params[0].accounts,e.next=3,r.setState({connected:!0,accounts:n,address:n[0]});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r.onSessionUpdate=function(){var e=Object(u.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.setState({accounts:t,address:t[0]});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r.onDisconnect=Object(u.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.setState(Object(i.a)({},I));case 2:case"end":return e.stop()}}),e)}))),r.killSession=Object(u.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=r.state.connector)&&t.killSession(),e.next=4,r.setState(Object(i.a)({},I));case 4:case"end":return e.stop()}}),e)})));var s=I.connector,a=s.connected,c=s.accounts;return r.state=Object(i.a)(Object(i.a)({},I),{},{connected:a,accounts:c,address:c[0]}),r}return Object(l.a)(n,[{key:"componentDidMount",value:function(){console.log("app component did mount"),this.subscribeToWalletEvents(),console.log(Object({NODE_ENV:"production",PUBLIC_URL:"/mushroom-cloud-ui",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_KEY:"your_api_key",REACT_APP_TEST_TEST:"your_api_key"}))}},{key:"render",value:function(){return Object(O.jsxs)("div",{children:[Object(O.jsx)(S,{address:this.state.address,connector:this.state.connector,killSession:this.killSession}),Object(O.jsx)(b.a,{children:Object(O.jsxs)(j.d,{children:[Object(O.jsx)(j.b,{path:"/",element:Object(O.jsx)(E,{})}),Object(O.jsx)(j.b,{path:"/asset/:index",element:Object(O.jsx)(M.a,{address:this.state.address,connector:this.state.connector})}),Object(O.jsx)(j.b,{path:"*",element:Object(O.jsx)(j.a,{to:"/",replace:!0})})]})},this.state.address)]})}}]),n}(a.a.Component),C=k,y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,361)).then((function(t){var n=t.getCLS,r=t.getFID,s=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),r(e),s(e),a(e),c(e)}))};o.a.render(Object(O.jsx)(a.a.StrictMode,{children:Object(O.jsx)(C,{})}),document.getElementById("root")),y()},68:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(11),s=n(10),a=n(13),c=n.n(a),o=n(9),i=Object(r.a)((function e(){Object(s.a)(this,e),this.isMainNet=o.k,this.algodHost=this.isMainNet?o.a:o.b,this.algod=new c.a.Algodv2("",this.algodHost,""),this.indexerHost=this.isMainNet?o.g:o.h,this.indexer=new c.a.Indexer("",this.indexerHost,"")}))},69:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return m}));var r=n(2),s=n(11),a=n(10),c=n(0),o=n.n(c),i=n(189),u=n(198),d=n(197),l=n.n(d),f=n(13),h=n.n(f),p=n(9),m=Object(s.a)((function t(){var n=this;Object(a.a)(this,t),this.connector=new u.a({bridge:p.d,qrcodeModal:l.a}),this.sign=function(){var t=Object(r.a)(o.a.mark((function t(r){var s,a,c,u;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=r.map((function(t){var r={txn:e.from(h.a.encodeUnsignedTransaction(t)).toString("base64")};return n.connector.accounts.includes(t.from)&&(r.signers=[]),r})),a=Object(i.formatJsonRpcRequest)("algo_signTxn",[s]),t.next=4,n.connector.sendCustomRequest(a);case 4:return c=t.sent,u=c.map((function(t){return t?new Uint8Array(e.from(t,"base64")):null})),t.abrupt("return",u);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}))}).call(this,n(14).Buffer)},9:function(e,t,n){"use strict";n.d(t,"d",(function(){return s})),n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return c})),n.d(t,"g",(function(){return o})),n.d(t,"h",(function(){return i})),n.d(t,"f",(function(){return u})),n.d(t,"i",(function(){return d})),n.d(t,"j",(function(){return l})),n.d(t,"l",(function(){return f})),n.d(t,"c",(function(){return h})),n.d(t,"e",(function(){return p})),n.d(t,"k",(function(){return m})),n.d(t,"p",(function(){return b})),n.d(t,"n",(function(){return O})),n.d(t,"o",(function(){return w})),n.d(t,"m",(function(){return S}));var r,s="https://bridge.walletconnect.org",a="https://node.algoexplorerapi.io",c="https://node.testnet.algoexplorerapi.io",o="https://algoindexer.algoexplorerapi.io/",i="https://algoindexer.testnet.algoexplorerapi.io/",u="mushroom-cloud-api",d="ipfs://",l="https://ipfs.io/ipfs/",f=2,h="E6U45JTJJQKGIQXECBTUAEARHU7PKCSRVLR5Q4PWT2EDG5XSOVOMK77LUA",p="BiAGAQTnhsgmAAMFJgEgeiFVPbwgDsl/g1dFISMiT4TPukimcQ7jzMFfr18nC+IxATIADjEGMgMSEDEgMgMSEDIEIQQSQADXMgQhBRJAAAEAMgQhBRIzABAiEhAzAAiBgJX1KhIQMwAHKBIQMwAJMgMSEDMBECMSEDMBEiUSEDMBADMAABIQMwEAMwEUEhAzARUyAxIQMwERJBIQMwIQIxIQMwISIhIQMwIUMwEAEhAzAhUzAQASEDMCESQSEDMDECISEDMDCCUSEDMDBygSEDMDCSgSEDMDADMCABIQMwQQIhIQMwQIgYCt4gQSEDMEB4AgJ6nOpmlMFGRC5BBnQBARPT71ClGq49hx9p6IM3bydVwSEDMECTIDEhBCANwyBCEEEjMAECISEDMACIGgwh4SEDMAACgSEDMACTIDEhAzARAjEhAzARIlEhAzAQAzAAcSEDMBADMBFBIQMwEVMgMSEDMBESQSEDMCECMSEDMCEiISEDMCACgSEDMCFDMBABIQMwIVMgMSEDMCESQSEDIEIQQSMwAQIxIQMwASJRIQMwAAMwAUEhAzABUyAxIQMwARJBIQMwAUKBIQMwEQIxIQMwESIhIQMwERJBIQMwEUKBIQMwEVKBIQMwIQIhIQMwIIJRIQMwIAMwEAEhAzAgcoEhAzAgkoEhAREEM=",m=!1;function b(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6;return"".concat(e.slice(0,t),"...").concat(e.slice(-t))}!function(e){e.MainNet="mainnet",e.TestNet="testnet"}(r||(r={}));var j,g,x,v=n(45),A=n(46),O=A.a.button(j||(j=Object(v.a)(["\n  border-radius: 0.5rem;\n  padding: 0.5rem 1rem;\n  border: none;\n"]))),w=A.a.img(g||(g=Object(v.a)(["\n  max-width: 100%;\n  border-radius: 0.5rem;\n  border-style: solid;\n  border-width: 0.05rem;\n"]))),S=A.a.div(x||(x=Object(v.a)(["\n  display: flex;\n  flex-direction: column;\n  padding: 0 1rem 2rem 1rem;\n  overflow-wrap: break-word;\n  // margin-bottom: 1rem;\n  // border-radius: 0.5rem;\n  // border-style: solid;\n  // border-width: 0.05rem;\n"])))}},[[359,1,2]]]);
//# sourceMappingURL=main.80a823d4.chunk.js.map