/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      error: 'var(--color-error)',
      violet: 'var(--color-violet)',
      white: 'var(--color-white)',
      black: 'var(--color-black)',
      green: 'var(--color-green)',
      success: 'var(--color-success)',
      'success-dark': 'var(--color-success-dark)',
      yellow: 'var(--color-yellow)',
      'yellow-warning': 'var(--color-yellow-warning)',
      secondary: 'var(--color-secondary)',
      'secondary-dark': 'var(--color-secondary-dark)',
      'warning-primary': 'var(--color-secondary)',
      'warning-primary-dimmed': 'var(--color-secondary-dark)',
      'warning-secondary': 'var(--color-yellow)',
      background: 'var(--color-background)',
      'background-300': 'rgba(255, 255, 255, 0.1)',
      t1: 'var(--color-text-t1)',
      t2: 'var(--color-text-t2)',
      t4: 'var(--color-text-t4)',
      t5: 'var(--color-text-t5)',
      t7: 'var(--color-text-t7)',
      'success-dark': 'var(--color-success-dark)'
    },
    fontFamily: {
      sans: ['Vazirmatn', 'sans-serif']
    },

    container: {
      center: true,
      padding: '16px'
    }
  },
  plugins: []
}
