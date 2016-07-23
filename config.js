
var config = {

	baseURL: "https://rent.591.com.tw/index.php",

	// 4184, 4231, 4232, 4233, 4234, 4246, 4247,4205,4190,4178, 66264   
	// 古亭, 頂溪, 永安市場, 景安, 南勢角, 萬隆, 景美, 象山, 六張犁, 民權西路, 中山國小

	search: [
		{pattern: 3, rentprice 	: '15000,30000', mrtcoods: 4184},
		{pattern: 3, rentprice 	: '15000,30000', mrtcoods: 4231},
		{pattern: 3, rentprice 	: '15000,30000', mrtcoods: 4232},
		{pattern: 3, rentprice 	: '15000,30000', mrtcoods: 4233},
		{pattern: 3, rentprice 	: '15000,30000', mrtcoods: 4234},
		{pattern: 3, rentprice 	: '15000,30000', mrtcoods: 4246},
		{pattern: 3, rentprice 	: '15000,30000', mrtcoods: 4247},
		{pattern: 3, rentprice 	: '15000,30000', mrtcoods: 4205},
		{pattern: 3, rentprice 	: '15000,30000', mrtcoods: 4190},
		{pattern: 3, rentprice 	: '15000,30000', mrtcoods: 4178},
		{pattern: 2, rentprice 	: '10000,20000', mrtcoods: 4184},
		{pattern: 2, rentprice 	: '10000,20000', mrtcoods: 4231},
		{pattern: 2, rentprice 	: '10000,20000', mrtcoods: 4232},
		{pattern: 2, rentprice 	: '10000,20000', mrtcoods: 4233},
		{pattern: 2, rentprice 	: '10000,20000', mrtcoods: 4234},
		{pattern: 2, rentprice 	: '10000,20000', mrtcoods: 4246},
		{pattern: 2, rentprice 	: '10000,20000', mrtcoods: 4247},
		{pattern: 2, rentprice 	: '10000,20000', mrtcoods: 4205},
		{pattern: 2, rentprice 	: '10000,20000', mrtcoods: 4190},
		{pattern: 2, rentprice 	: '10000,20000', mrtcoods: 4178},
	],

	query: {
		module 		: 'search',
		action 		: 'rslist',
		is_new_list : 1,
		type		: 1,
		searchtype 	: 4,
		region 		: 1,
		listview 	: 'img',
		mrt 		: 1,
		// mrtcoods 	: MRTS.join(','),
		// pattern 	: 2,												//三房
		option 		: "cold,icebox,hotwater,washer,naturalgas",			//冷氣、冰箱、熱水器、洗衣機、天然瓦斯
		// rentprice 	: '15000,30000',								//價錢區間
		other 		: 'cook',											//可開伙
		kind 		: 1,												//整層住家

	},

};


module.exports = config;