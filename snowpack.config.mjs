/** @type {import("snowpack").SnowpackUserConfig } */
export default {
    mount: {
		src: '/',
		public: {
			url: '/',
			static: true
		}
	},
	plugins: [
		'@snowpack/plugin-sass',
		// '@snowpack/plugin-webpack'
	],
	buildOptions: { clean: true },
};
