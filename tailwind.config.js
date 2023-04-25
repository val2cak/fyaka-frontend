module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      50: '50px',
      16: '4rem',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        logo: ['Montserrat Alternates', 'sans-serif'],
      },

      colors: {
        primaryColor: '#F58800',
        secondaryColor: '#1A4645',
        lightColor: '#FAFAFA',
        lightGrayColor: '#F2F2F2',
        darkColor: '#051821',
        grayColor: '#696969',
        redColor: '#EA4335',
        blueColor: '#2D9CDB',
      },
      backgroundImage: () => ({
        homeCover: "url('../assets/vectors/home.png')",
        login: "url('../assets/vectors/login.png')",
        notFound: "url('../assets/vectors/not-found.jpg')",
        deleteAccount: "url('../assets/vectors/delete-account.png')",
      }),
      lineHeight: {
        3: '1.2rem',
        4: '1.6rem',
        5: '2.0rem',
        6: '2.4rem',
        7: '2.8rem',
        8: '3.2rem',
        9: '3.6rem',
        10: '4.0rem',
      },
      fontSize: {
        xs: ['12px', { lineHeight: '1.6rem' }],
        sm: ['16px', { lineHeight: '2.0rem' }],
        base: ['20px', { lineHeight: '2.0rem' }],
        md: ['24px', { lineHeight: '2.4rem' }],
        lg: ['32px', { lineHeight: '2.8rem' }],
        xl: ['36px', { lineHeight: '2.8rem' }],
        '2xl': ['2.4rem', { lineHeight: '3.2rem' }],
        '3xl': ['3.0rem', { lineHeight: '3.6rem' }],
        '4xl': ['3.6rem', { lineHeight: '4.0rem' }],
        '5xl': ['4.8rem', { lineHeight: '1' }],
        '6xl': ['6.0rem', { lineHeight: '1' }],
        '7xl': ['7.2rem', { lineHeight: '1' }],
        '8xl': ['9.6rem', { lineHeight: '1' }],
        '9xl': ['12.8rem', { lineHeight: '1' }],
      },
      borderWidth: {
        default: '1px',
        0: '0',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
        50: '50px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
