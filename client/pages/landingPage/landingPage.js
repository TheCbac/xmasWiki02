Template.landingPage.helpers({
	goToGroup: function(){
		
		var groupIds = Meteor.user().profile.groups;
		if (groupIds.length ===1 ){
			var group = Groups.findOne({_id:groupIds[0]});
			Session.set("currentGroup", group._id);
			// Router.go("/groups/" + group.name);
			Router.go("groupsRoute");
		}

		else{
			Router.go('/user');
		}
		// Router.go("/groups/cheneyClan");
	}
});