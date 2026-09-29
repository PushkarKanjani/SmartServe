/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ss: {
          ivory:       '#FAF7F0',
          surface:     '#F2EDE1',
          ink:         '#1F2A1E',
          forest:      '#2F5233',
          forestHover: '#3D6B42',
          sage:        '#7A9E6E',
          gold:        '#C9A15A',
          emerald:     '#10B981',
          border:      'rgba(31,42,30,0.08)',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        organic: '1.75rem',
        pill:    '9999px',
      },
      boxShadow: {
        card:  '0 20px 48px -12px rgba(31,42,30,0.12), 0 6px 18px -6px rgba(47,82,51,0.06)',
        float: '0 24px 56px -16px rgba(31,42,30,0.16), 0 8px 24px -8px rgba(47,82,51,0.08)',
        btn:   '0 2px 12px rgba(47,82,51,0.25)',
      },
    },
  },
  plugins: [],
};
