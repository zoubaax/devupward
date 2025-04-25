tailwind.config = {
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
      fontFamily: {
        Outfit: ["Outfit", "sans-serif"],
        Ovo: ["Ovo", "serif"]
      },
      animation: {
        spin_slow: 'spin 6s linear infinite',
        fadeIn: 'fadeIn 1s ease-in-out',
        slideUp: 'slideUp 0.8s ease-out',
        bounce: 'bounce 1s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        slideInLeft: 'slideInLeft 0.8s ease-out',
        slideInRight: 'slideInRight 0.8s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        }
      },
      colors: {
        lightHover: '#eff9ff',
        darkHover: '#eff9ff',
        darkTheme: '#050A30'
      },
      boxShadow: {
        'black': '4px 4px 0 #000',
        'white': '4px 4px 0 #fff',
      }

    }

  },
    darkMode: 'selector'
}




