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

Template.wishList.events({
	"click .giftButton" : function(event, template){
		console.log("pressed gift");
	}
});

Template.wishList.helpers({
	wishItems: function () {
		var currentPerson = Session.get("selectedPlayer");
		var itemsList = items.find({owner:currentPerson});
		
		if (itemsList.count()===0) {
			return false;
		}
		else{
			return itemsList;
		}
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
	},

	recipient:function() {
		if (Meteor.user() !==undefined) {

			var selectedName = Meteor.users.findOne({_id:Session.get('selectedPlayer')});
			return selectedName.profile.firstName;
		}
	},
});

Session.setDefault("addItemBtnPressed", false);
Session.setDefault("newItemError", null);

Template.addItemTemplate.events({
	'click .addNewItmBtn' : function(event, template){
		console.log("pressed");

		var currentState = Session.get("addItemBtnPressed");
		var newState = !currentState;
		Session.set("addItemBtnPressed", newState);
		console.log(newState);
	},

	'submit #newItemForm' :function(event, template){
		event.preventDefault();

		var giftName = template.find("#giftName").value;
		var linkName = template.find("#linkName").value;
		var giftCost = template.find("#giftCost").value;
		if(!giftName.length){
			Session.set("newItemError", "Name is Blank");
					
		}	
		else if(!linkName.length){
			Session.set("newItemError", "URL is blank");
		}
		else{

			newId = items.insert({
				owner:Meteor.userId(),
				gifter:null,
				details:{
					name:giftName,
					link:linkName,
					cost:giftCost
				}
			});
			Session.set("newItemError", null);
		}

		
	}
});



Template.addItemTemplate.helpers({
	addItem: function() {
		return Session.get("addItemBtnPressed");
	},

});

Template.newItemError.helpers({
	error: function () {
		return Session.get("newItemError");
	}
});



