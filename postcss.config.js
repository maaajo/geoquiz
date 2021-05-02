module.exports = {
  plugins: [
    require('tailwindcss')('./src/tailwind.config.js'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' &&
      require('@fullhuman/postcss-purgecss')({
        content: ['./src/**/*.js'],
        css: ['./src/**/*.css'],
      }),
  ],
};
