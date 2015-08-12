var controllers = angular.module('controllers',[]);

controllers.controller('HomeController',function($scope){
	
})
.controller('MainController',function($scope){
		// notifierShow = true;
		// 		setInterval(function(){
		// 	notifierShow = !notifierShow;
		// 	$scope.$apply(function(){
		// 	$scope.notifierShow = notifierShow;
		// 	});

		// 	console.log($scope.notifierShow);
		// 	}, 2000);
})
.controller('BetlayController',function($scope){

})
.controller('CouponController',function(Coupon,$scope){
		(function getOpapCouponFromServer(){
			var couponPromise = Coupon.getData();
    		couponPromise
    		.then(function(result) {         
		        $scope.coupon = result;
		        $scope.updatedAt = new Date();
			});
		setTimeout(getOpapCouponFromServer, 6000);
	})();

})
	
	
.controller('LogoutController',function($scope){
	
});