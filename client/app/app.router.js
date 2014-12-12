Router.configure({

	layoutTemplate:'appLayout',
	notFoundTemplate:"notFoundPage",
	yieldTemplates:{
		'appHeader': {to:'header'},
		'appFooter': {to: 'footer'}
	}
});

Router.onBeforeAction(function(){
	if (!Meteor.loggingIn() && !Meteor.user()) {
		this.redirect('/');
	} else {
		this.next();
	}
 }, {
 	//whitelist which routes don't need to be signed in for 
 	except:[
 	'pageNotFoundRoute',
 	'landingPageRoute']
 });

// Router.onBeforeAction(function() {
// 	if (Meteor.logginIn() ) {
// 	}
// 	else {
// 		this.redirect('/cheneyClan');
// 	}
// });

Router.route('landingPageRoute', {
	path:'/',
	template: 'landingPage',
});

//Where does this get called?  - landingPage.js
// this has to be changed so it isn't hard corded to a specific name
// Router.route('cheneyClanRoute', {
// 	path:'/groups/cheneyClan',
// 	template: 'cheneyClanPage', 
// });

Router.route('groups/:name', {
	//this.layout('appLayout');

	// waitOn: function(){
	// 	console.log("this is tested");
	// 	return Meteor.subscribe("groups", this.params.name);
	// },

	subscriptions: function() {
		this.subscribe("groups");
	},

	// I think the waitOn functionality now work, I have to manage
	// the publication system now 
	action: function(){
		this.render('cheneyClanPage');
		this.render('appHeader', {to:'header'});
		this.render('appFooter', {to:'footer'});
	},


	data: function(){
		var group = Groups.findOne({name: this.params.name});
		debugger
		if ($.inArray(Meteor.userId(), group.members) >= 0){
			 	console.log("User is in group");
			 	return group;
			 }

		 else{
		 	console.log("User is not in group");
		 	Router.route('userPage');
		}
		
	},

});

	// this.render('cheneyClanPage', {
	// 	waitOn: function() {
	// 		console.log("subscribe");
	// 		return Meteor.subscribe("groups");

	// 	},

	// 	data: function() {
	// 		var group = Groups.findOne({name: this.params.name});
	// 		// console.log(group);
			 
	// 		 // "Meteor.userId() in group.members"
			 
	// 		 if ($.inArray(Meteor.userId(), group.members) >= 0){
	// 		 	console.log("User is in group");
	// 		 	return group;
	// 		 }

	// 		 else{
	// 		 	console.log("User is not in group");
	// 		 	Router.route('userPage');
	// 		 }
			
	// 	}
	// });
	// this.render('appHeader', {to:'header'});
	// this.render('appFooter', {to:'footer'});
	// path:'/groups',
	// template: 'cheneyClanPage', 
	// name:"groupsRoute";



Router.route('userPage', {
	path:'/user',
	template:'userProfilePage'
});

