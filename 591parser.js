var request 	= require('request-promise');
var url 		= require('url');
var Q           = require('q');
var cheerio 	= require('cheerio');
var config 		= require('./config.js');
var sendChat 	= require('./sendChat.js');
var sendMail 	= require('./sendmail.js');
var fs 			= require('fs-promise');


var baseURL = config.baseURL;
var MRTS 	= config.search;
var query 	= config.query;

var getMrtData = function(constraints){

	var reqUrl = url.parse(baseURL);

	for (key in constraints){
		query[key] = constraints[key];
	}
	reqUrl.query = query;

	var parseUrl = reqUrl.format();

	var option = {
		uri	: parseUrl,
		json: true,
	}

	var parseData = function(body){

		var $ = cheerio.load(body);

		var newhouselist = []
		$('.nearbySort').each(function(i, el) {
		  	// this === el
		  	var element 	= $(this).children('.shInfo')
		  	var popularity 	= parseInt(element.children('.pattern').text().replace('人',''));
		  	if (popularity < 50){
		  		var infos 		= element.children('.info').children('.right').text().split('\r\n');
		  		var id 			= element.children('.info').children('.right').children('.title').children().attr('href').replace('.html','').replace("?f_stat=","").split('-')[2];
		  		var address 	= infos[2].trim();
		  		var pattern 	= infos[3].split('，')[1];
		  		var mrtStation 	= infos[5].trim().split(' ')[1];
		  		var price 		= parseInt(element.children('.price.fc-org').text().trim().replace(/元|,/g,''));

		  		newhouselist.push({
		  			id 			: id,
		  			address		: address,
		  			pattern		: pattern,
		  			mrtStation	: mrtStation,
		  			price 		: price
		  		});
		  	}
		});

		return newhouselist
	}

	var CheckAndSend = function(newhouselist){

		return fs.readFile('seen.txt', {encoding:'utf8'})
			.then(function(contents){
				var history = contents.split('\n');
				var newlist = newhouselist.filter(function(house){
					return history.indexOf(house.id) == -1
				})
				if (newlist.length > 0){
					return sendMail(newlist).then(function(){
							return fs.appendFile('seen.txt', newlist.map(function(info){return info.id}).join('\n') + '\n') 
						})
				}
			})
			.catch(function(error){
				console.log("Error: ",error)
			})

	}

	return request.get(option)
		.then(function (body) {
			var count = body.count;

			if (count <= 20){
				var newhouselist = parseData(body.main);
				return CheckAndSend(newhouselist);
			}else{
				var firstRow = 20;

				for ( ;count < 20; count-=20){

					reqUrl.query.firstRow = firstRow;
					var newParseUrl = reqUrl.format();

					var option = {
						uri	: newParseUrl,
						json: true,
					}
					
					return request.get(option)
						.then(function(body){
							var newhouselist = parseData(body.main);
							return CheckAndSend(newhouselist);
						});
				}

			}

		})
}

var main = function(){

	var delayedGet = rateLimit(getMrtData, 1, 5000);

	MRTS.map(function (constraints) {
		return delayedGet(constraints)
	}).reduce(Q.when, Q())
	.then(function(){
		return 0;
	})
	.catch(function(error){
		console.log(error);
		return 1;
	})

};



// run main if this file is directly executed.
if (require.main === module) {
	main();
}

module.exports = main;

function rateLimit (fn, limit, ms) {
	var callsInLastSecond = 0;
	var delay             = ms || 1000;
	var queue             = [];
	return function limited() {
		if (callsInLastSecond >= limit) {
			queue.push([this, arguments]);
			return;
		}
		callsInLastSecond++;
		setTimeout(function () {
			callsInLastSecond--;
			var parms;
			if (parms = queue.shift()) {
				limited.apply(parms[0], parms[1]);
			}
		}, delay);

		fn.apply(this, arguments);
	};
};






