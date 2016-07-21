var nodemailer = require('nodemailer');
var Q     = require('q');

var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'rick830620@gmail.com', // my mail
        pass: 'rick83062'
    }
}));

// create reusable transporter object using the default SMTP transport 
// var transporter = nodemailer.createTransport('smtps://rick830620@gmail.com:rick83062@smtp.gmail.com');
 
// setup e-mail data with unicode symbols 
var mailOptions = {
    from: '"RickLee" <rick830620@gmail.com>', // sender address 
    to: 'rick830620@gmail.com, yoyo420303@gmail.com', // list of receivers 
    subject: 'New House Released', // Subject line
};
 
var main = function(houselist){

	var deffered = Q.defer();
	var message = "";


	houselist.forEach(function(house){
		message = message + [house.address,house.pattern,house.mrtStation].join(' ');
		message = message + ' $' + house.price + '\n';
		message = message + "https://rent.591.com.tw/rent-detail-" + house.id + '.html?f_stat=\n'; 
	})

	mailOptions.text = message;
	mailOptions.subject = houselist[0].mrtStation + ' New House Released';

	// send mail with defined transport object 
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
			deffered.reject(error)
	    }else{
			deffered.resolve()
		}
	});

	return deffered.promise;

}

// run main if this file is directly executed.
if (require.main === module) {
	main([{
		address: 	'1',
		pattern: 	'1',
		mrtStation: '1',
		price: 		'1',
		id: 		'1',
	}]);
}

module.exports = main;