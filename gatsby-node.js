const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { leKebab, flatten, unique } = require('./src/utils/utils');

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

    const posts = result.data.allMarkdownRemark.edges;
    posts.forEach((post, index) => {
      const { node } = post;
      const prev = index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: node.fields.slug,
        component: PostTemplate,
        context: {
          prev,
          slug: node.fields.slug,
          next,
        },
      });
    });

    const tags = posts
      .filter(edge => !!edge.node.frontmatter.tags)
      .map(edge => edge.node.frontmatter.tags);

    unique(flatten(tags)).forEach(tag => {
      createPage({
        path: `/tags/${leKebab(tag)}`,
        component: TagTemplate,
        context: { tag },
      });
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'src/content' });
    createNodeField({
      node,
      name: 'slug',
      value: slug.replace(/\/$/, ''),
    });
  }
};
