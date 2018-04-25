<template>
	<div>
		<AppHeader />
		<nuxt/>
		<AppFooter />
	</div>
</template>

<script>
	import AppHeader from '~/components/AppHeader';
	import AppFooter from '~/components/AppFooter';

	export default {
		
			components: {
				AppHeader,
				AppFooter
			}

	}
</script>


<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		border: none;
		font-family: inherit;
		box-sizing: border-box;
	}

	body {
		font-family: 'Comfortaa', sans-serif;
		font-size: 15px;
		background: #fff;
		overflow-y: scroll;
	}

	*:focus {
		outline: none;
	}

	.no-select {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.container {
		margin: 0 auto;
		width: 100%;
		max-width: 1200px;
		position: relative;
	}

	.page {
		min-height: calc(100vh - 48px);
		padding: 64px 16px;
	}
</style>
