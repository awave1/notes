(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{138:function(n,e,t){"use strict";t.r(e),t.d(e,"default",function(){return u}),t.d(e,"pageQuery",function(){return o});var r=t(0),a=t.n(r),i=t(149);function u(n){var e=n.data,t=(n.location,e.markdownRemark),r=t.frontmatter,u=t.html;return a.a.createElement(i.a,{usePrimaryNav:!1},a.a.createElement("div",{className:"blog-post"},a.a.createElement("h1",null,r.title),a.a.createElement("h2",null,r.date),a.a.createElement("div",{className:"blog-post-content",dangerouslySetInnerHTML:{__html:u}})))}var o="1579142440"},143:function(n,e,t){"use strict";t.r(e),t.d(e,"graphql",function(){return p}),t.d(e,"StaticQueryContext",function(){return f}),t.d(e,"StaticQuery",function(){return m});var r=t(0),a=t.n(r),i=t(4),u=t.n(i),o=t(142),c=t.n(o);t.d(e,"Link",function(){return c.a}),t.d(e,"withPrefix",function(){return o.withPrefix}),t.d(e,"navigate",function(){return o.navigate}),t.d(e,"push",function(){return o.push}),t.d(e,"replace",function(){return o.replace}),t.d(e,"navigateTo",function(){return o.navigateTo});var l=t(144),s=t.n(l);t.d(e,"PageRenderer",function(){return s.a});var d=t(33);t.d(e,"parsePath",function(){return d.a});var f=a.a.createContext({}),m=function(n){return a.a.createElement(f.Consumer,null,function(e){return n.data||e[n.query]&&e[n.query].data?(n.render||n.children)(n.data?n.data.data:e[n.query].data):a.a.createElement("div",null,"Loading (StaticQuery)")})};function p(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}m.propTypes={data:u.a.object,query:u.a.string.isRequired,render:u.a.func,children:u.a.func}},144:function(n,e,t){var r;n.exports=(r=t(148))&&r.default||r},147:function(n){n.exports={data:{site:{siteMetadata:{title:"yea"}}}}},148:function(n,e,t){"use strict";t.r(e);t(32);var r=t(0),a=t.n(r),i=t(4),u=t.n(i),o=t(51),c=t(2),l=function(n){var e=n.location,t=c.default.getResourcesForPathnameSync(e.pathname);return a.a.createElement(o.a,Object.assign({location:e,pageResources:t},t.json))};l.propTypes={location:u.a.shape({pathname:u.a.string.isRequired}).isRequired},e.default=l},149:function(n,e,t){"use strict";var r=t(7),a=t.n(r),i=t(145),u=t.n(i),o=t(147),c=t(0),l=t.n(c),s=t(143),d=t(146);function f(){var n=u()(["\n  color: ",";\n  text-decoration: none;\n  text-shadow: none;\n  background-image: none;\n"]);return f=function(){return n},n}function m(){var n=u()(["\n  margin: 0 auto;\n  max-width: 960px;\n  padding: 1.45rem 1.0875rem;\n"]);return m=function(){return n},n}function p(){var n=u()(["\n  background: ",";\n  margin-bottom: 1.45rem;\n"]);return p=function(){return n},n}var y=d.a.nav(p(),function(n){return n.primary?"#202124":"#fbfbfb"}),h=d.a.div(m()),v=Object(d.a)(s.Link)(f(),function(n){return n.primary?"#fff":"#202124"}),g=function(n){var e=n.siteTitle,t=n.usePrimaryNav;return l.a.createElement(y,{primary:t},l.a.createElement(h,null,l.a.createElement(v,{primary:t,to:"/"},e)))};function b(){var n=u()(["\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n  max-width: 960px;\n  padding: 0 1.0875rem 1.45rem;\n  padding-top: 0;\n"]);return b=function(){return n},n}var w=d.a.div(b()),E=function(n){function e(){return n.apply(this,arguments)||this}return a()(e,n),e.prototype.render=function(){var n=this,e=this.props.children;return l.a.createElement(s.StaticQuery,{query:"1044757290",render:function(t){return l.a.createElement(l.a.Fragment,null,l.a.createElement(g,{primary:n.props.usePrimaryNav,siteTitle:t.site.siteMetadata.title}),l.a.createElement(w,null,e))},data:o})},e}(l.a.Component);e.a=E}}]);
//# sourceMappingURL=component---src-templates-post-template-js-ca4f4cbebebf46617bdf.js.map