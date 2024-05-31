/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sourcehansan: ['SourceHanSans-VF', 'sans']
			},
			colors: {
				NM: {
					DEFAULT: '#529578'
				},
				HD: {
					DEFAULT: '#cb9474'
				},
				HR: {
					DEFAULT: '#c85762'
				},
				DT: {
					DEFAULT: '#88697b'
				},
				FM: {
					DEFAULT: '#7494a4'
				},
				TB: {
					DEFAULT: '#5a5a5b'
				},
				TEAMBLUE: {
					DEFAULT: '#3B82F6'
				},
				TEAMRED: {
					DEFAULT: '#F87171'
				}
			}
		},
		plugins: []
	},
	safelist: ['bg-NM', 'bg-HD', 'bg-HR', 'bg-DT', 'bg-FM', 'bg-TB']
};
