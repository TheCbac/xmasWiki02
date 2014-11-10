Meteor.startup(function() {

	var craigId, adrienneId, brianId, kathleenId, bruceId, crisId;
	if (Meteor.users.find().count() === 0){
		craigId = Accounts.createUser({
			email:'ccheney@mit.edu',
			password:'password',
			profile: {
				firstName: 'Craig',
				lastName:'Cheney',
				groups:[cheneyClanId]
			}
		});

		adrienneId = Accounts.createUser({
			email:'adcheney88@gmail.com',
			password:'password',
			profile: {
				firstName: 'Adrienne',
				lastName:'Cheney',
				groups:[cheneyClanId]
			}
		});

		brianId = Accounts.createUser({
			email:'briancheney2010@yahoo.com',
			password:'password',
			profile: {
				firstName: 'Brian',
				lastName:'Cheney',
				groups:[cheneyClanId]
			}
		});

		kathleenId = Accounts.createUser({
			email:'kbuckcheney@comcast.net',
			password:'password',
			profile: {
				firstName: 'Kathleen',
				lastName:'Buck',
				groups:[cheneyClanId]
			}
		});		

		bruceId = Accounts.createUser({
			email:'bwcheney@comcast.net',
			password:'password',
			profile: {
				firstName: 'Bruce',
				lastName:'Cheney',
				groups:[cheneyClanId]
			}
		});

		crisId = Accounts.createUser({
			email:'cmc04747@pomona.edu',
			password:'password',
			profile: {
				firstName: 'Cris',
				lastName:'Cheney',
				groups:[cheneyClanId]
			}
		});
	}

	var bowId,  kittyId;
	if (items.find().count()===0){

		bowId = items.insert({
			owner: craigId,
			gifter: brianId,
			details: {
				link: "www.google.com",
				cost: "$25.99"
			}
		});

		kittyId = items.insert({
			owner: craigId,
			gifter: adrienneId,
			details: {
				link: "www.reuters.com",
				cost: "$7.99"
			}
		});

	}

		var cheneyClanId;
	if (Groups.find().count()===0){
		cheneyClanId = Groups.insert({
			name:"CheneyClan",
			members:[craigId, bruceId, brianId, adrienneId, kathleenId, crisId],
			admins:[craigId]
		});
	}
});