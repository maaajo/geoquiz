module.exports = {
  purge: ['./**/*.html', './**/*.js'],
  theme: {
    colors: {
      white: '#FFFFFF',
      green: '#3C6E71',
      lightGreen: '#6CAEB2',
      red: '#E95D69',
      blue: '#284B63',
      brown: '#525252',
      darkBrown: '#333333',
      grey: '#D9D9D9'
    },
    extend: {
      fontFamily: {
        logo: ['Hind Siliguri', 'Verdana', 'sans-serif'],
        body: ['Work Sans', 'Verdana', 'sans-serif']
      },
      letterSpacing: {
        custom: `-1.1px`
      }
    }
  },
  variants: {},
  plugins: []
};
