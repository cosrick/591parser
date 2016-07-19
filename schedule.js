
var CronJob = require('cron').CronJob;
var timeZone= "Asia/Singapore";
var wojoii 	= require('./591parser.js');

new CronJob('0 1,7,13,19,25,31,37,43,49,55  * * * *', function () { wojoii() }, null, true, timeZone); 
