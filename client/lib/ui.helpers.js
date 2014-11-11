
// Whoa.. this looks shitty... 
Template.registerHelper("genderProNoun", function(){
	var id = Session.get('selectedPlayer');
	if (id !==undefined){
		var selectedName = Meteor.users.findOne({_id:id});

		if (selectedName !== undefined){
			if (selectedName.profile.gender === 'Male' ){
				return "his";
			}
			else if (selectedName.profile.gender === 'Female'){
				return "her";
			}
			else{
				return "their";
			}
		}

		else{ return "their";}
	}

	return "their";
});