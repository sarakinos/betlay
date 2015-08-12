var betlay = angular.module('betlay',['ngRoute','controllers']);

betlay.config(function($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl:'partials/home.html',
		controller:'HomeController'
	})
	.when('/coupon',{
		templateUrl:'partials/coupon.html',
		controller:'CouponController'
	})
	.when('/betlay',{
		templateUrl:'partials/betlay.html',
		controller:'BetlayController'
	})
	.when('/logout',{
		templateUrl:'partials/logout.html',
		controller:'LogoutController'
	})

});

betlay.factory('Coupon', function($http) {

    var getData = function() {


        return $http({method:"GET", url:"/getOpapCoupon"}).then(function(result){
            var rowJson = result.data;
		    var coupon = [];

		    for(k=0;k<rowJson.length;k++){
		    	var game = {};
		    var gameId = rowJson[k].id;
		    var time = rowJson[k].betEndDate;
		    var props = rowJson[k].properties.prop;
		    var firstTeamId,secondTeamId,firstTeamName,secondTeamName,matchCode;
		    var lexicon = rowJson[k].lexicon.resources;
		    var code1 = rowJson[k].codes[0].odd;
		    var codeX = rowJson[k].codes[1].odd;
		    var code2 = rowJson[k].codes[2].odd;

	
		    for(var i=0;i<props.length;i++){
		    	if(props[i].id=='30'){
		    	firstTeamId = props[i].value;
		    	firstTeamName = lexicon[firstTeamId];
		    }else if(props[i].id=='31'){
		    	secondTeamId = props[i].value;
		    	secondTeamName = lexicon[secondTeamId];
		    }else if(props[i].id=='6'){
		    	matchCode = props[i].value;
		    }
		    }
		    game = {
		    	'gameId':gameId,
		    	'time':time,
		    	'firstTeamId':firstTeamId,
		    	'matchCode':matchCode,
		    	'secondTeamId':secondTeamId,
		    	'firstTeamName':firstTeamName,
		    	'secondTeamName':secondTeamName,
		    	'code1':code1,
		    	'codeX':codeX,
		    	'code2':code2
		    }
		    coupon.push(game);
		}
		return coupon;
        });
    };
    return { getData: getData };
});









// betlay.service('Coupon',function($http){
// 	var couponFinal;
// 	this.getOpapCoupon = function(scope){
// 		//setInterval(function(){
// 		$http.get('/getOpapCoupon').
//   			success(function(data, status, headers, config) {
// 		    //Json manipulation
		    
// 		    //Json manupulation end  
// 		    var rowJson = data;
// 		    var coupon = [];

// 		    for(k=0;k<rowJson.length;k++){

// 		    	var game = {};



// 		    var gameId = rowJson[k].id;
// 		    var time = rowJson[k].betEndDate;
// 		    var props = rowJson[k].properties.prop;
// 		    var firstTeamId,secondTeamId,firstTeamName,secondTeamName;
// 		    var lexicon = rowJson[k].lexicon.resources;
// 		    var code1 = rowJson[k].codes[0].odd;
// 		    var codeX = rowJson[k].codes[1].odd;
// 		    var code2 = rowJson[k].codes[2].odd;
	
// 		    for(var i=0;i<props.length;i++){
// 		    	if(props[i].id=='30'){
// 		    	firstTeamId = props[i].value;
// 		    	firstTeamName = lexicon[firstTeamId];
// 		    }else if(props[i].id=='31'){
// 		    	secondTeamId = props[i].value;
// 		    	secondTeamName = lexicon[secondTeamId];
// 		    }
// 		    }

// 		    //Assign to scope

// 		    game = {
// 		    	'gameId':gameId,
// 		    	'time':time,
// 		    	'firstTeamId':firstTeamId,
// 		    	'secondTeamId':secondTeamId,
// 		    	'firstTeamName':firstTeamName,
// 		    	'secondTeamName':secondTeamName,
// 		    	'code1':code1,
// 		    	'codeX':codeX,
// 		    	'code2':code2
// 		    }
// 		    coupon.push(game);

// 		}
// 		scope.coupon = coupon;
// 		couponFinal = coupon;
//   		}).
//   		error(function(data, status, headers, config) {
//     		scope.error = data; 
//   		});
// 						// }
// 						// , 9000);
// 	}
// });