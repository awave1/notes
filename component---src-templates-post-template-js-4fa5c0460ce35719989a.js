(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{187:function(e,t,A){"use strict";A.r(t);var a=A(0),n=A.n(a),i=A(21),r=A(188),o=A(199),l=A(5),c=A(189),m=A(196),s=A(194),d=l.b.ul.withConfig({displayName:"TagList__List",componentId:"h4mj5a-0"})(["display:flex;flex-wrap:wrap;list-style:none;margin:0 10px;"]),p=l.b.li.withConfig({displayName:"TagList__Tag",componentId:"h4mj5a-1"})(["margin:0 5px;padding:3px 10px;font-size:0.9em;background:",";font-family:monospace;border-radius:5px;transition:all 150ms cubic-bezier(0.55,0,0.1,1);cursor:pointer;&:hover{background:",";}@media screen and (max-width:600px){margin:5px 2px;}"],function(e){return e.theme.tag.background},function(e){return e.theme.tag.hover.background}),g=function(e){var t,A=e.tags;return A&&A.length>0&&(t=A.length>1?n.a.createElement(r.a,{icon:m.b}):n.a.createElement(r.a,{icon:m.a})),n.a.createElement("div",{style:{display:"flex",alignItems:"center"}},t,n.a.createElement(d,null,A.map(function(e,t){return n.a.createElement(p,{key:t},n.a.createElement(i.Link,{to:"/tags/"+Object(s.leKebab)(e)},e))})))};A(200);A.d(t,"pageQuery",function(){return w});var f="awave1",u="notes",E="content",h=l.b.div.withConfig({displayName:"PostTemplate__BlogPost",componentId:"xqj0y0-0"})([""]),x=l.b.a.withConfig({displayName:"PostTemplate__EditContainer",componentId:"xqj0y0-1"})(["display:flex;align-items:center;font-family:monospace;margin:1.5rem 0;font-weight:bold;&:hover{text-decoration:underline;}"]),b=l.b.ul.withConfig({displayName:"PostTemplate__PagingContainer",componentId:"xqj0y0-2"})(["display:flex;list-style:none;margin:1.5rem 0;"]),B=Object(l.b)(i.Link).withConfig({displayName:"PostTemplate__PageLink",componentId:"xqj0y0-3"})(["font-family:monospace;&:hover{text-decoration:underline;}@media screen and (max-width:426px){font-size:13px;}"]),j=function(e){var t={margin:"0 "+(e.left?"auto":"0")+" 0 "+(e.right?"auto":"0")};return n.a.createElement("li",{style:t},n.a.createElement(B,{to:e.to},e.children))},Q=function(e){var t=l.b.div.withConfig({displayName:"PostTemplate__Container",componentId:"xqj0y0-4"})(["margin:1rem 0;h1{margin:0;}"]);return n.a.createElement(t,null,n.a.createElement("h1",null,e.title),n.a.createElement("small",null,e.date),n.a.createElement(g,{tags:e.tags}))};var w="871867916";t.default=function(e){var t=e.data.markdownRemark,A=t.frontmatter,a=A.title,i=A.date,l=A.tags,m=t.html,s=e.pageContext,d=s.slug,p=s.prev,g=s.next,B="https://github.com/"+f+"/"+u+"/edit/master/src/"+E+d+".md";return n.a.createElement(n.a.Fragment,null,n.a.createElement(h,null,n.a.createElement(Q,{title:a,date:i,tags:l}),n.a.createElement("div",{className:"blog-post-content",dangerouslySetInnerHTML:{__html:m}}),n.a.createElement(b,null,p&&n.a.createElement(j,{to:p.fields.slug,left:!0}," ","￩ ",p.fields.slug),g&&n.a.createElement(j,{to:g.fields.slug,right:!0},g.fields.slug," ￫"," ")),n.a.createElement(x,{href:B},n.a.createElement(r.a,{icon:o.a})," ",n.a.createElement("span",{style:{marginLeft:"10px"}},"editOnGithub();")),n.a.createElement(c.a,{simple:!0})))}},189:function(e,t,A){"use strict";A(190);var a=A(192),n=A(0),i=A.n(n),r=A(21),o=A(193),l=A.n(o),c=A(5),m=A(57),s=c.b.div.withConfig({displayName:"Bio__BioWrapper",componentId:"sc-3ote3c-0"})(["display:flex;"]),d=Object(c.b)(l.a).withConfig({displayName:"Bio__Avatar",componentId:"sc-3ote3c-1"})(["margin-right:",";margin-bottom:0;min-width:60;border-radius:100%;box-shadow:0px 0px 25px #0000004d;@media screen and (max-width:310px){display:none !important;}"],Object(m.a)(.5)),p=c.b.div.withConfig({displayName:"Bio__BioText",componentId:"sc-3ote3c-2"})(["display:flex;flex-direction:column;"]);var g="2222508901";t.a=function(e){return i.a.createElement(r.StaticQuery,{query:g,render:function(e){var t=e.site.siteMetadata,A=t.author,a=t.social;return i.a.createElement(s,null,i.a.createElement(d,{fixed:e.avatar.childImageSharp.fixed,alt:A}),i.a.createElement(p,null,i.a.createElement("p",{style:{marginBottom:0}},"Written by ",i.a.createElement("strong",null,A),"."," "),i.a.createElement("p",null,i.a.createElement("a",{href:"https://twitter.com/"+a.twitter},"@awaveawave"))))},data:a})}},192:function(e){e.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFAQP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGe1P07jgf/xAAYEAEBAQEBAAAAAAAAAAAAAAABAhIDIf/aAAgBAQABBQIj05CVCNUqU7oNf//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABoQAAICAwAAAAAAAAAAAAAAAAABETEhobH/2gAIAQEABj8CUJkcK2XQnI8H/8QAGxABAAIDAQEAAAAAAAAAAAAAAQAhETFRQWH/2gAIAQEAAT8hSp5q+wlgqby1FJ4i6rj5AkssEANz/9oADAMBAAIAAwAAABCQz//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8QP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8QP//EAB0QAQACAgIDAAAAAAAAAAAAAAEAESExQVFhgaH/2gAIAQEAAT8QRpmdcuoy9m028/IR9iZGYJsaG69IoyoL2NXcPgBcT//Z",width:60,height:60,src:"/notes/static/fb56d78f01b37fee7da1ea3c99c4439f/0a2ed/profile_pic.jpg",srcSet:"/notes/static/fb56d78f01b37fee7da1ea3c99c4439f/0a2ed/profile_pic.jpg 1x,\n/notes/static/fb56d78f01b37fee7da1ea3c99c4439f/9e3e1/profile_pic.jpg 1.5x,\n/notes/static/fb56d78f01b37fee7da1ea3c99c4439f/bf8bc/profile_pic.jpg 2x,\n/notes/static/fb56d78f01b37fee7da1ea3c99c4439f/e72f0/profile_pic.jpg 3x"}}},site:{siteMetadata:{author:"Artem Golovin",social:{twitter:"awaveawave"}}}}}},194:function(e,t,A){A(42);e.exports={leKebab:function(e){return e.replace(/[^A-Za-z0-9\s]+/g,"").replace(/\s/g,"-")}}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-4fa5c0460ce35719989a.js.map