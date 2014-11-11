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

Template.cheneyClanPage.rendered = function () {
	Session.set("selectedPlayer", Meteor.userId());
};



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
		var currentPerson = Session.get("selectedPlayer");
		return items.find({owner:currentPerson});
	},

	itemName: function() {
		return this.details.name;
	},

	gifter: function(){
		if (Session.get('selectedPlayer') == Meteor.userId() ){
			return "";
		}

		else{
			var person = Meteor.users.findOne({_id:this.gifter});
			var selectedName = Meteor.users.findOne({_id:Session.get('selectedPlayer')});
			return person.profile.firstName + " is getting this for " +selectedName.profile.firstName ;
		}
	},

	//should chache the peron _id 
	link: function() {
		return this.details.link;
	}

});