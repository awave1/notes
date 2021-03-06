const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { leKebab, uniqueFlatten } = require('./src/utils/utils');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const PostTemplate = path.resolve('src/templates/PostTemplate.js');
  const TagTemplate = path.resolve('src/templates/TagTemplate.js');

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              published
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges.filter(
      e => e.node.frontmatter.published
    );

    posts.forEach((post, index) => {
      const { node } = post;
      const { slug } = node.fields;
      const prev = index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;
      const category = slug.split('/').splice(1, slug.split('/').length)[0];

      createPage({
        path: slug,
        component: PostTemplate,
        context: { prev, slug, next, category },
      });
    });

    const tags = posts
      .filter(edge => edge.node.frontmatter.published)
      .filter(
        edge => edge.node.frontmatter.tags && edge.node.frontmatter.tags.length
      )
      .map(edge => edge.node.frontmatter.tags);

    if (tags.length) {
      uniqueFlatten(tags).forEach(tag => {
        createPage({
          path: `/tags/${leKebab(tag)}`,
          component: TagTemplate,
          context: { tag },
        });
      });
    }
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'src/content' });
    const category = slug.split('/').splice(1, slug.split('/').length)[0];

    createNodeField({
      node,
      name: 'slug',
      value: slug.replace(/\/$/, ''),
    });

    createNodeField({
      node,
      name: 'category',
      value: category,
    });
  }
};
