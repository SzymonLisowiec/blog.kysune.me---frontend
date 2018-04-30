<template>
	<main class="page page--article container">

		<article class="article">

			<h1 class="article_title">{{ article.title }}</h1>

			<div class="meta">
					<ul class="meta_list">
					<li class="meta_item meta_item--time">
						
						<svg class="meta_icon" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18">
							<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
							<path d="M0 0h24v24H0z" fill="none"/>
							<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
						</svg>
						{{ article_time }}</li>
					<nuxt-link :to="'/tag/' + tag" class="meta_item meta_item--tag" v-for="(tag, index) in article.tags" :key="index" tag="li">{{ tag }}</nuxt-link>
				</ul>
			</div>

			<div class="article_content" v-html="article_html"></div>

		</article>

	</main>
</template>

<script>
	import Showdown from 'showdown';
	import Prism from 'prismjs';
	import PrismLanguages from 'prism-languages';
	import UnescapeHTML from 'unescape';

	Showdown.extension('palign', _ => {
		return [{
			type: 'listener',
			listeners: {
				'blockGamut.before': function (event, text, converter, options, globals) {
					text = text.replace(/^--:([\s\S]+?)--:$/gm, function (wm, txt) {
						return '<div class="align-left">' + converter.makeHtml(txt) + '</div>';
					});
					text = text.replace(/^-:-([\s\S]+?)-:-$/gm, function (wm, txt) {
						return '<div class="align-center">' + converter.makeHtml(txt) + '</div>';
					});
					text = text.replace(/^:--([\s\S]+?):--$/gm, function (wm, txt) {
						return '<div class="align-right">' + converter.makeHtml(txt) + '</div>';
					});
					return text;
				}
			}
		}];
	});
	
	Showdown.extension('prismjs', function () {
		return [{
			type:   'output',
			filter: function (source) {
				return source.replace(/<pre([^>]*)><code([^>]*)>([^>]*)<\/code><\/pre>/gi, (match, pre, code_class, code) => {
					
					code = UnescapeHTML(code);

					if(code_class){
						let language = code_class.match(/language\-([A-Za-z0-9_+]*)/g)[0].replace('language-', '');
						if(typeof PrismLanguages[language] != 'undefined')
							return '<div class="code-block"><div class="language">' + language + '</div><pre' + code_class + '><code' + code_class + '>' + Prism.highlight(code, PrismLanguages[language], language) + '</code></pre></div>';
					}
					
					return '<div class="code-block"><div class="language"></div><pre class="language-markup"><code  class="language-markup">' + code + '</code></pre></div>';
				});
			}
		}];
	});

	const Converter = new Showdown.Converter({

		extensions: ['palign', 'prismjs'],

		strikethrough: true,
		tables: true,
		tasklists: true,
		ghMentions: true,
		openLinksInNewWindow: true,
		emoji: true

	});
	
	export default {

		head () {

			let meta = [

				{
					hid: 'og:title',
					property: 'og:title',
					content: this.article.title
				},

				{
					hid: 'og:type',
					property: 'og:type',
					content: 'article'
				}

			];

			if(this.article.description){

				meta.push({
					hid: 'description',
					name: 'description',
					content: this.article.description
				});

				meta.push({
					hid: 'og:description',
					property: 'og:description',
					content: this.article.description
				});

			}

			if(this.article.keywords)
				meta.push({
					hid: 'keywords',
					name: 'keywords',
					content: this.article.keywords
				});

			return {

				title: this.article.title,

				meta

			};
		},

		data () {
			return {
				article: {}
			};
		},

		computed: {

			article_html () {
				return Converter.makeHtml(this.article.content);
			},

			article_time () {
				return this.$moment(this.article.time * 1000).format('YYYY-MM-DD HH:mm');
			}

		},

		async asyncData ({ params: {article}, $axios  }) {
			
			article = article.replace(/\+/g, ' ');

			let { data } = await $axios.get('/api/post/' + article);
			
			return {
				article: data
			};
		},

		transition: 'slide-left'

	}

</script>

<style lang="scss">

	.page--article {

		.article {

			&_header {

				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				overflow: hidden;

			}

			&_title {
				margin: 46px 0 12px 0;
				font-family: 'Comfortaa', sans-serif;
				font-weight: 700;
				font-size: 42px;
				color: #111;
				z-index: 1;
			}

			&_content {
				font-family: 'Open Sans', sans-serif;
				padding: 0 20px 32px 20px;
				font-size: 17px;
				font-weight: 400;
				word-break: break-word;

				h1, h2, h3, h4, h5, h6 {
					margin: 20px 0 10px 0;
				}

				h2 {
					margin: 30px 0 15px 0;
				}

				p {
					margin-bottom: 15px;

					&:first-child {
						font-weight: 600;
					}

				}

				ul {
					padding: 0 32px;
				}

				code {
					padding: 2px 4px;
					font-size: 15px;
					background: #eee;
				}

				.align-left { text-align: left; }
				.align-center { text-align: center; }
				.align-right { text-align: right; }

				.code-block > .language {
					width: 100%;
					padding: 2px 8px;
					font-size: 13px;
					font-weight: 600;
					color: #fff;
					background: #00a8ff;
					text-transform: uppercase;
				}

				code[class*="language-"],
				pre[class*="language-"] {
					color: black;
					background: none;
					font-family: monospace;
					font-size: 14px;
					text-align: left;
					white-space: pre;
					word-spacing: normal;
					word-break: normal;
					word-wrap: normal;
					line-height: 1.5;

					-moz-tab-size: 4;
					-o-tab-size: 4;
					tab-size: 4;

					-webkit-hyphens: none;
					-moz-hyphens: none;
					-ms-hyphens: none;
					hyphens: none;
				}

				/* Code blocks */
				pre[class*="language-"] {
					position: relative;
					overflow: visible;
					padding: 0;
				}
				pre[class*="language-"]>code {
					position: relative;
					background-color: #eee;
					background-image: linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%);
					background-size: 3em 3em;
					background-origin: content-box;
					background-attachment: local;
				}

				code[class*="language"] {
					max-height: inherit;
					height: inherit;
					padding: 0 8px;
					display: block;
					overflow: auto;
				}

				/* Margin bottom to accomodate shadow */
				:not(pre) > code[class*="language-"],
				pre[class*="language-"] {
					background-color: #eee;
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
					margin-bottom: 1em;
				}

				/* Inline code */
				:not(pre) > code[class*="language-"] {
					position: relative;
					padding: .2em;
					border-radius: 0.3em;
					color: #c92c2c;
					border: 1px solid rgba(0, 0, 0, 0.1);
					display: inline;
					white-space: normal;
				}

				pre[class*="language-"]:before,
				pre[class*="language-"]:after {
					content: '';
					z-index: -2;
					display: block;
					position: absolute;
					bottom: 0.75em;
					left: 0.18em;
					width: 40%;
					height: 20%;
					max-height: 13em;
					-webkit-transform: rotate(-2deg);
					-moz-transform: rotate(-2deg);
					-ms-transform: rotate(-2deg);
					-o-transform: rotate(-2deg);
					transform: rotate(-2deg);
				}

				:not(pre) > code[class*="language-"]:after,
				pre[class*="language-"]:after {
					right: 0.75em;
					left: auto;
					-webkit-transform: rotate(2deg);
					-moz-transform: rotate(2deg);
					-ms-transform: rotate(2deg);
					-o-transform: rotate(2deg);
					transform: rotate(2deg);
				}

				.token.comment,
				.token.block-comment,
				.token.prolog,
				.token.doctype,
				.token.cdata {
					color: #7D8B99;
				}

				.token.punctuation {
					color: #5F6364;
				}

				.token.property,
				.token.tag,
				.token.boolean,
				.token.number,
				.token.function-name,
				.token.constant,
				.token.symbol,
				.token.deleted {
					color: #c92c2c;
				}

				.token.selector,
				.token.attr-name,
				.token.string,
				.token.char,
				.token.function,
				.token.builtin,
				.token.inserted {
					color: #2f9c0a;
				}

				.token.operator,
				.token.entity,
				.token.url,
				.token.variable {
					color: #a67f59;
				}

				.token.atrule,
				.token.attr-value,
				.token.keyword,
				.token.class-name {
					color: #1990b8;
				}

				.token.regex,
				.token.important {
					color: #e90;
				}

				.language-css .token.string,
				.style .token.string {
					color: #a67f59;
				}

				.token.important {
					font-weight: normal;
				}

				.token.bold {
					font-weight: bold;
				}
				.token.italic {
					font-style: italic;
				}

				.token.entity {
					cursor: help;
				}

				.namespace {
					opacity: .7;
				}

				@media screen and (max-width: 767px) {
					pre[class*="language-"]:before,
					pre[class*="language-"]:after {
						bottom: 14px;
						box-shadow: none;
					}

				}

				/* Plugin styles */
				.token.tab:not(:empty):before,
				.token.cr:before,
				.token.lf:before {
					color: #e0d7d1;
				}

				/* Plugin styles: Line Numbers */
				pre[class*="language-"].line-numbers {
					padding-left: 0;
				}

				pre[class*="language-"].line-numbers code {
					padding-left: 3.8em;
				}

				pre[class*="language-"].line-numbers .line-numbers-rows {
					left: 0;
				}

				/* Plugin styles: Line Highlight */
				pre[class*="language-"][data-line] {
					padding-top: 0;
					padding-bottom: 0;
					padding-left: 0;
				}
				pre[data-line] code {
					position: relative;
					padding-left: 4em;
				}
				pre .line-highlight {
					margin-top: 0;
				}
			}

			.meta {
				width: 200px;
				height: 30px;
				margin-bottom: 12px;
				
				&_list {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					list-style: none;
				}

				&_item {
					margin: 0 6px;
					white-space: nowrap;
					font-size: 15px;
					color: #323232;
					transition: color .32s;

					&--time:after {
						display: inline-block;
						content: '•';
						font-family: sans-serif;
						font-weight: 600;
						margin-left: 12px;
					}

					&--tag {
						text-transform: capitalize;
						text-decoration: none;
						cursor: pointer;

						&:hover {
							color: #00a8ff;
						}

					}

				}

				&_icon {
					margin: -3px 4px 0 0;
					vertical-align: middle;
					fill: #555;
				}

			}

		}

	}

	@media screen and (max-width: 600px) {

		.page--article {

			padding: 32px 16px;

			.article {

				&_title {
					position: static;
					font-size: 32px;
					color: #222;
				}

				&_header {
					height: 128px;

					img {
						filter: blur(2px);
					}

				}

			}

		}

	}

</style>