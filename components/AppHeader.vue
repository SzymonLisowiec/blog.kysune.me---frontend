<template>
	<header class="app-header">

		<div class="container">

			<nuxt-link to="/" class="app-header_home no-select" tag="a" aria-label="Strona główna">
				<span>K</span>ysune
			</nuxt-link>

			<nav class="navigation no-select">

				<ul class="navigation_list">
					<li class="navigation_item" v-for="(item, index) in social" :key="index">
						<a class="navigation_link" :class="'navigation_link--' + item.name" :href="item.href" target="_blank">
							<font-awesome-icon :icon="item.icon" size="2x" />
						</a>
					</li>
				</ul>

			</nav>

		</div>

	</header>
</template>

<script>
	import fontawesome from '@fortawesome/fontawesome';
	import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
	import { faTwitterSquare, faLinkedin, faFacebook, faGithubSquare } from '@fortawesome/fontawesome-free-brands';
	
	fontawesome.library.add(faTwitterSquare, faLinkedin, faFacebook, faGithubSquare);

	export default {

		data () {
			return {
				social: [
					
					{
						name: 'facebook',
						icon: ['fab', 'facebook'],
						href: 'https://www.facebook.com/szymonlisowiec'
					},

					{
						name: 'github',
						icon: ['fab', 'github-square'],
						href: 'https://github.com/SzymonLisowiec'
					},

					{
						name: 'linkedin',
						icon: ['fab', 'linkedin'],
						href: 'https://www.linkedin.com/in/szymon-lisowiec/'
					},

					{
						name: 'twitter',
						icon: ['fab', 'twitter-square'],
						href: 'https://twitter.com/SzymonLisowiec'
					}

				]
			};
		},

		components: {
			FontAwesomeIcon
		}

	}
</script>


<style lang="scss">

	.app-header {

		width: 100%;
		height: 64px;
		padding: 0 12px;
		position: fixed;
		top: 0;
		left: 0;
		border-bottom: 1px solid #e8e8e8;
		background: #fafafa;
		z-index: 10;

		&_home {
			display: inline-block;
			font-size: 21px;
			font-weight: 700;
			font-family: 'Comfortaa', sans-serif;
			text-decoration: none;
			color: #444;
			cursor: pointer;

			span {
				transition: color .32s;
			}

			&:hover > span {
				color: #00a8ff;
			}

		}

		.container {

			display: flex;
			align-items: center;
			justify-content: space-between;
			max-width: 1300px;
			height: 100%;

			.navigation {

				display: inline-flex;
				align-items: flex-end;

				&_list {
					display: inline-flex;
					align-items: center;
					justify-content: flex-end;
					list-style: none;
				}

				&_item:not(:first-child) {
					margin-left: 8px;
				}

				&_link {
					color: #454545;
					text-decoration: none;
					cursor: pointer;
					transition: color .32s;

					&:hover { color: #00a8ff; }
					&--facebook:hover { color: #3b5998; }
					&--github:hover { color: #24292e; }
					&--linkedin:hover { color: #0077b5; }
					&--twitter:hover { color: #00aced; }

				}

			}

		}

	}

	
	@media screen and (max-width: 600px) {

		
		.app-header {

			height: 64px;

			.container {
				
				padding: 0 8px;
				
			}

		}

	}

</style>