module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			rotate: ["group-hover"],
			rotate12: ["group-hover"],
			transform: ["group-hover"],
		},
	},
	plugins: [],
};
