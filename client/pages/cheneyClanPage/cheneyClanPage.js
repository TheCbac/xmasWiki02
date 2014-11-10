Template.cheneyClanPage.helpers({
	personInClan: function () {
		if (Meteor.user() !==undefined) {
			var clanIds = Groups.findOne({name:"CheneyClan"});
			var members = clanIds.members;

			var people =  Meteor.users.find({ _id : {$in:members}},
											{sort: {email:1}
																			} );
			
			return people;
		}
	}
});

Template.personTile.helpers({
	getName: function() {
		return this.profile.firstName;
	},

	selected: function(){
		return Session.equals("selectedPlayer", this._id) ? "selected" : "";
	}

});

Template.personTile.events({
	'click' : function() {
		Session.set("selectedPlayer", this._id);
	}
});

Template.wishList.helpers({
	wishItems: function () {
		return [1,2];
	}
});