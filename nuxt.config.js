module.exports = {

	/*
	** Headers of the page
	*/
	head: {
		
		htmlAttrs: {
			lang: 'pl'
		},

		title: 'Kysune - Blog',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Mój osobisty blog, na którym mam zamiar skupiać się na różnorodnych tematach, wyszczególniając tworzenie aplikacji webowych.' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Comfortaa:300,400,500,600,700|Open+Sans:300,300i,400,400i,600,600i|Montserrat:400,500,600&amp;subset=latin-ext" rel="stylesheet' }
		]
	},

	/*
	** Customize the progress bar color
	*/
	loading: { color: '#00a8ff' },
	
	css: [
		'normalize.css',
		'assets/transitions.css'
	],

	modules: [
		'@nuxtjs/axios'
	],

	plugins: [
		{ src: '~/plugins/vue-infinite-scroll', ssr: false }
	],

	axios: {
		proxy: true
	},

	proxy: {
		'/api/': { target: 'http://localhost:8080', pathRewrite: {'^/api/': ''} }
	},

	/*
	** Build configuration
	*/
	build: {
		/*
		** Run ESLint on save
		*/
		extend (config, { isDev, isClient }) {
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
		}
	}

}
