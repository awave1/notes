const leKebab = str => str.replace(/[^A-Za-z0-9\s]+/g, '').replace(/\s/g, '-');

module.exports = {
  leKebab,
};
