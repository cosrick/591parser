var login = require("facebook-chat-api");
var Q     = require('q');


var main = function(houselist){

	var deffered = Q.defer();
	var to = "100001406078788";


	login({email: "rick830620@gmail.com", password: "rick83062"}, function callback(err, api) {
		if(err){
			deffered.reject(err)
		}else{
			var message = "";
			houselist.forEach(function(house){
				message = message + [house.address,house.pattern,house.mrtStation].join(' ');
				message = message + ' $' + house.price + '\n';
				message = message + "https://rent.591.com.tw/rent-detail-" + house.id + '.html\n'; 
			})

			api.sendMessage(message, to,function(messageInfo){
				api.logout(function(){
					deffered.resolve()
				})
				
			});
		}
	});

	return deffered.promise;

}

// run main if this file is directly executed.
if (require.main === module) {
	main(['testMessage']);
}

module.exports = main;


