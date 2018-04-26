<template>
	<main class="page page--index container">

		<section class="articles" v-infinite-scroll="loadMorePosts" infinite-scroll-disabled="infinite_scroll_isDisabled" infinite-scroll-distance="10">
			<h1 class="articles_header">Artykuły dla tagu &#8222;{{ $route.params.tag }}&#8221;</h1>
			
			<article class="article" v-for="(article, index) in articles" :key="index">

				<div class="calendar-date">
					<div class="calendar-date_day">{{ article.date.day }}</div>
					<div class="calendar-date_month">{{ article.date.month }}</div>
				</div>

				<div class="article_informations">
					
					<h2 class="article_title">
						<nuxt-link :to="'/article/' + article.id" class="article_link" tag="a">
							{{ article.title }}
						</nuxt-link>
					</h2>

					<ul class="tags">
						<nuxt-link :to="'/tag/' + tag" class="tags_item" v-for="(tag, tag_index) in article.tags" :key="tag_index" tag="li">{{ tag }}</nuxt-link>
					</ul>

				</div>

			</article>

			<font-awesome-icon v-if="infinite_scroll_state === 'busy'" class="articles_infinite-scroll-progress" :icon="['fas', 'cog']" size="2x" spin />
			<font-awesome-icon v-if="infinite_scroll_state === 'end'" class="articles_infinite-scroll-progress" :icon="['fas', 'flag-checkered']" size="2x" />

		</section>

	</main>
</template>

<script>
	import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

	export default {

		data () {
			return {
				from: 0,
				count: 0,
				on_page: 10,
				raw_articles: [],

				infinite_scroll_state: 'busy'
			};
		},

		methods: {

			async loadMorePosts () {

				this.infinite_scroll_state = 'busy';
				this.from += this.on_page;
					
				let { data } = await this.$axios.get('/api/posts/?tags=' + this.$route.params.tag + '&from=' + this.from);

				this.raw_articles = this.raw_articles.concat(data.posts);
				this.count = data.count;
				
				if(this.from < this.count)
					this.infinite_scroll_state = 'ready';
				else this.infinite_scroll_state = 'end';
			}

		},
		
		computed: {

			articles () {
				let articles = this.raw_articles.slice();
				for(let i in articles){
					articles[i].link = articles[i].title.replace(/\s/gi, '+');
					
					articles[i].date = {
						day: this.$moment(articles[i].time * 1000).format('D'),
						month: this.$moment(articles[i].time * 1000).format('MMMM')
					}

				}
			
				return articles;
			},

			infinite_scroll_isDisabled () {
				return this.infinite_scroll_state != 'ready';
			}

		},

		components: {
			FontAwesomeIcon
		},

		async asyncData ({ params: {tag}, $axios  }) {

			let { data } = await $axios.get('/api/posts?tags=' + tag);

			return {
				raw_articles: data.posts,
				count: data.count,
				infinite_scroll_state: 'ready'
			};
		}

	}
</script>

<style lang="scss">

	.page--index {

		.articles {

			&_header {
				font-family: 'Comfortaa', sans-serif;
				font-weight: 400;
				font-size: 40px;
			}

			.article {

				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: top;
				width: 100%;
				min-height: 100px;
				margin: 16px 0;
				border: 1px solid #eee;

				.calendar-date {
					
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 100px;
					min-width: 100px;
					height: auto;
					min-height: 100px;
					text-transform: capitalize;
					font-size: 18px;
					background: #6a82fb;
					background: linear-gradient(135deg, #fc5c7d, #6a82fb); 
					color: #fff;

					&_day {
						font-size: 32px;
					}

				}

				&_informations {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 20px;
				}

				&_title {
					font-size: 25px;
					padding-bottom: 16px;
				}

				&_link {
					color: #222;
					text-decoration: none;
					cursor: pointer;
					transition: color .32s;

					&:hover {
						color: #00a8ff;
					}

				}

				&_content {
					font-size: 15px;
					padding-bottom: 10px;
				}

				.tags {
						
					display: flex;
					justify-content: flex-start;
					align-items: center;
					list-style: none;

					&_item {
						margin: 0 3px;
						white-space: nowrap;
						text-transform: capitalize;
						text-decoration: none;
						font-size: 13px;
						color: #555;
						transition: color .32s;
						cursor: pointer;

						&:not(:last-child):after {
							display: inline-block;
							content: '•';
							font-family: sans-serif;
							font-weight: 600;
							margin-left: 6px;
						}

						&:hover {
							color: #00a8ff;
						}

					}

				}

			}

			&_infinite-scroll-progress {
				display: block;
				margin: 0 auto;
				color: #00a8ff;
			}

		}

	}

	@media screen and (max-width: 600px) {
		
		.page--index {

			.articles {

				&_header {
					font-size: 25px;
				}

				.article {

					&_title {
						font-size: 18px;
					}

				}

			}
			
		}

	}

</style>