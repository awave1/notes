(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{181:function(e,t,a){"use strict";a.r(t);var i=a(0),r=a.n(i),n=a(16),s=(a(95),a(21)),o=n.a.h3.withConfig({displayName:"Post__PostTitle",componentId:"sc-250nla-0"})(["margin-top:1rem;margin-bottom:0.25rem;"]),l=n.a.div.withConfig({displayName:"Post__PostContainer",componentId:"sc-250nla-1"})(["box-shadow:1px 0px 50px #0000001a;border-radius:6px;padding:16px;margin-bottom:48px;"]),d=function(e){var t=e.post,a=t.excerpt,i=t.frontmatter,n=i.title,d=i.date,A=i.path;return r.a.createElement(l,null,r.a.createElement(o,null,r.a.createElement(s.Link,{to:A},n)),r.a.createElement("small",null,d),r.a.createElement("p",{dangerouslySetInnerHTML:{__html:a}}))},A=a(182);a.d(t,"pageQuery",function(){return f});var c=n.a.div.withConfig({displayName:"pages__PostContainer",componentId:"sc-12501ze-0"})(["margin-top:45px;"]),f=(t.default=function(e){var t=e.data.allMarkdownRemark.edges.filter(function(e){return!!e.node.frontmatter.date}).map(function(e){return r.a.createElement(d,{key:e.node.id,post:e.node})});return r.a.createElement(r.a.Fragment,null,r.a.createElement(A.a,null),r.a.createElement(c,null,t))},"1123293424")},182:function(e,t,a){"use strict";a(183);var i=a(185),r=a(0),n=a.n(r),s=a(21),o=a(186),l=a.n(o),d=a(16),A=a(57),c=d.a.div.withConfig({displayName:"Bio__BioWrapper",componentId:"sc-3ote3c-0"})(["display:flex;"]),f=Object(d.a)(l.a).withConfig({displayName:"Bio__Avatar",componentId:"sc-3ote3c-1"})(["margin-right:",";margin-bottom:0;min-width:60;border-radius:100%;box-shadow:0px 0px 25px #0000004d;@media screen and (max-width:310px){display:none !important;}"],Object(A.a)(.5)),u=d.a.div.withConfig({displayName:"Bio__BioText",componentId:"sc-3ote3c-2"})(["display:flex;flex-direction:column;"]);var p="2222508901";t.a=function(e){return n.a.createElement(s.StaticQuery,{query:p,render:function(e){var t=e.site.siteMetadata,a=t.author,i=t.social;return n.a.createElement(c,null,n.a.createElement(f,{fixed:e.avatar.childImageSharp.fixed,alt:a}),n.a.createElement(u,null,n.a.createElement("p",{style:{marginBottom:0}},"Written by ",n.a.createElement("strong",null,a),"."," "),n.a.createElement("p",null,n.a.createElement("a",{href:"https://twitter.com/"+i.twitter},"@awaveawave"))))},data:i})}},183:function(e,t,a){"use strict";a(184)("fixed",function(e){return function(){return e(this,"tt","","")}})},184:function(e,t,a){var i=a(11),r=a(30),n=a(20),s=/"/g,o=function(e,t,a,i){var r=String(n(e)),o="<"+t;return""!==a&&(o+=" "+a+'="'+String(i).replace(s,"&quot;")+'"'),o+">"+r+"</"+t+">"};e.exports=function(e,t){var a={};a[e]=t(o),i(i.P+i.F*r(function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}),"String",a)}},185:function(e){e.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFAQP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGe1P07jgf/xAAYEAEBAQEBAAAAAAAAAAAAAAABAhIDIf/aAAgBAQABBQIj05CVCNUqU7oNf//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABoQAAICAwAAAAAAAAAAAAAAAAABETEhobH/2gAIAQEABj8CUJkcK2XQnI8H/8QAGxABAAIDAQEAAAAAAAAAAAAAAQAhETFRQWH/2gAIAQEAAT8hSp5q+wlgqby1FJ4i6rj5AkssEANz/9oADAMBAAIAAwAAABCQz//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8QP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8QP//EAB0QAQACAgIDAAAAAAAAAAAAAAEAESExQVFhgaH/2gAIAQEAAT8QRpmdcuoy9m028/IR9iZGYJsaG69IoyoL2NXcPgBcT//Z",width:60,height:60,src:"/static/fb56d78f01b37fee7da1ea3c99c4439f/0a2ed/profile_pic.jpg",srcSet:"/static/fb56d78f01b37fee7da1ea3c99c4439f/0a2ed/profile_pic.jpg 1x,\n/static/fb56d78f01b37fee7da1ea3c99c4439f/9e3e1/profile_pic.jpg 1.5x,\n/static/fb56d78f01b37fee7da1ea3c99c4439f/bf8bc/profile_pic.jpg 2x,\n/static/fb56d78f01b37fee7da1ea3c99c4439f/e72f0/profile_pic.jpg 3x"}}},site:{siteMetadata:{author:"Artem Golovin",social:{twitter:"awaveawave"}}}}}},186:function(e,t,a){"use strict";var i=a(8);t.__esModule=!0,t.default=void 0;var r,n=i(a(5)),s=i(a(41)),o=i(a(93)),l=i(a(94)),d=i(a(0)),A=i(a(1)),c=function(e){var t=(0,l.default)({},e);return t.resolutions&&(t.fixed=t.resolutions,delete t.resolutions),t.sizes&&(t.fluid=t.sizes,delete t.sizes),t},f={},u=function(e){var t=c(e),a=t.fluid?t.fluid.src:t.fixed.src;return f[a]||!1},p=[];var h=function(e,t){(void 0===r&&"undefined"!=typeof window&&window.IntersectionObserver&&(r=new window.IntersectionObserver(function(e){e.forEach(function(e){p.forEach(function(t){t[0]===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(r.unobserve(t[0]),t[1]())})})},{rootMargin:"200px"})),r).observe(e),p.push([e,t])},g=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",i=e.srcSetWebp?"<source type='image/webp' srcSet=\""+e.srcSetWebp+'" '+a+"/>":"",r=e.srcSet?'<source srcSet="'+e.srcSet+'" '+a+"/>":"",n=e.title?'title="'+e.title+'" ':"",s=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",d=e.opacity?e.opacity:"1";return"<picture>"+i+r+"<img "+o+l+t+s+n+'style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:'+(e.transitionDelay?e.transitionDelay:"0.5s")+";opacity:"+d+';width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},m=d.default.forwardRef(function(e,t){var a=e.style,i=e.onLoad,r=e.onError,n=(0,o.default)(e,["style","onLoad","onError"]);return d.default.createElement("img",(0,l.default)({},n,{onLoad:i,onError:r,ref:t,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},a)}))});m.propTypes={style:A.default.object,onError:A.default.func,onLoad:A.default.func};var b=function(e){function t(t){var a;a=e.call(this,t)||this;var i=!0,r=!1,n=t.fadeIn,o=u(t);!o&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=!1,r=!0),"undefined"==typeof window&&(i=!1),t.critical&&(i=!0,r=!1);var l=!(a.props.critical&&!a.props.fadeIn);return a.state={isVisible:i,imgLoaded:!1,IOSupported:r,fadeIn:n,hasNoScript:l,seenBefore:o},a.imageRef=d.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,s.default)((0,s.default)(a))),a.handleRef=a.handleRef.bind((0,s.default)((0,s.default)(a))),a}(0,n.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:u(this.props)}),this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.handleRef=function(e){var t=this;this.state.IOSupported&&e&&h(e,function(){t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:u(t.props)}),t.setState({isVisible:!0,imgLoaded:!1})})},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=c(e),a=t.fluid?t.fluid.src:t.fixed.src,f[a]=!0,this.setState({imgLoaded:!0}),this.state.seenBefore&&this.setState({fadeIn:!1}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=c(this.props),t=e.title,a=e.alt,i=e.className,r=e.style,n=void 0===r?{}:r,s=e.imgStyle,o=void 0===s?{}:s,A=e.placeholderStyle,f=void 0===A?{}:A,u=e.placeholderClassName,p=e.fluid,h=e.fixed,b=e.backgroundColor,y=e.Tag,E="boolean"==typeof b?"lightgray":b,w=(0,l.default)({opacity:this.state.imgLoaded?0:1,transition:"opacity 0.5s",transitionDelay:this.state.imgLoaded?"0.5s":"0.25s"},o,f),S=(0,l.default)({opacity:this.state.imgLoaded||!1===this.state.fadeIn?1:0,transition:!0===this.state.fadeIn?"opacity 0.5s":"none"},o),v={title:t,alt:this.state.isVisible?"":a,style:w,className:u};if(p){var I=p;return d.default.createElement(y,{className:(i||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},n),ref:this.handleRef,key:"fluid-"+JSON.stringify(I.srcSet)},d.default.createElement(y,{style:{width:"100%",paddingBottom:100/I.aspectRatio+"%"}}),I.base64&&d.default.createElement(m,(0,l.default)({src:I.base64},v)),I.tracedSVG&&d.default.createElement(m,(0,l.default)({src:I.tracedSVG},v)),E&&d.default.createElement(y,{title:t,style:{backgroundColor:E,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.35s",right:0,left:0}}),this.state.isVisible&&d.default.createElement("picture",null,I.srcSetWebp&&d.default.createElement("source",{type:"image/webp",srcSet:I.srcSetWebp,sizes:I.sizes}),d.default.createElement("source",{srcSet:I.srcSet,sizes:I.sizes}),d.default.createElement(m,{alt:a,title:t,src:I.src,style:S,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError})),this.state.hasNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,l.default)({alt:a,title:t},I))}}))}if(h){var B=h,x=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:B.width,height:B.height},n);return"inherit"===n.display&&delete x.display,d.default.createElement(y,{className:(i||"")+" gatsby-image-wrapper",style:x,ref:this.handleRef,key:"fixed-"+JSON.stringify(B.srcSet)},B.base64&&d.default.createElement(m,(0,l.default)({src:B.base64},v)),B.tracedSVG&&d.default.createElement(m,(0,l.default)({src:B.tracedSVG},v)),E&&d.default.createElement(y,{title:t,style:{backgroundColor:E,width:B.width,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.25s",height:B.height}}),this.state.isVisible&&d.default.createElement("picture",null,B.srcSetWebp&&d.default.createElement("source",{type:"image/webp",srcSet:B.srcSetWebp,sizes:B.sizes}),d.default.createElement("source",{srcSet:B.srcSet,sizes:B.sizes}),d.default.createElement(m,{alt:a,title:t,width:B.width,height:B.height,src:B.src,style:S,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError})),this.state.hasNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,l.default)({alt:a,title:t,width:B.width,height:B.height},B))}}))}return null},t}(d.default.Component);b.defaultProps={critical:!1,fadeIn:!0,alt:"",Tag:"div"};var y=A.default.shape({width:A.default.number.isRequired,height:A.default.number.isRequired,src:A.default.string.isRequired,srcSet:A.default.string.isRequired,base64:A.default.string,tracedSVG:A.default.string,srcWebp:A.default.string,srcSetWebp:A.default.string}),E=A.default.shape({aspectRatio:A.default.number.isRequired,src:A.default.string.isRequired,srcSet:A.default.string.isRequired,sizes:A.default.string.isRequired,base64:A.default.string,tracedSVG:A.default.string,srcWebp:A.default.string,srcSetWebp:A.default.string});b.propTypes={resolutions:y,sizes:E,fixed:y,fluid:E,fadeIn:A.default.bool,title:A.default.string,alt:A.default.string,className:A.default.oneOfType([A.default.string,A.default.object]),critical:A.default.bool,style:A.default.object,imgStyle:A.default.object,placeholderStyle:A.default.object,placeholderClassName:A.default.string,backgroundColor:A.default.oneOfType([A.default.string,A.default.bool]),onLoad:A.default.func,onError:A.default.func,onStartLoad:A.default.func,Tag:A.default.string};var w=b;t.default=w}}]);
//# sourceMappingURL=component---src-pages-index-js-7f80c02d3d876114d015.js.map