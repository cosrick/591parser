
var CronJob = require('cron').CronJob;
var timeZone= "Asia/Singapore";
var wojoii 	= require('./591parser.js');

new CronJob('0 1-59/2  * * * *', function () { wojoii() }, null, true, timeZone); 
