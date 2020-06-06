// babel-plugin-macros.config.js
module.exports = {
  twin: {
    preset: 'styled-components',
    config: 'src/tailwind.config.js',
    autoCssProp: true // This adds the css prop when it's needed
  }
};
