Router.configure({

	layoutTemplate:'appLayout',
	notFoundTemplate:"notFoundPage",
	yieldTemplates:{
		'appHeader': {to:'header'},
		'appFooter': {to: 'footer'}
	}
});

Router.route('landingPageRoute', {
	path:'/',
	template: 'landingPage'
});