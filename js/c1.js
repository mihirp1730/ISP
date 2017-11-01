angular.module('starter.controllers', ['ngCordova', 'ngStorage'])

.factory ('StorageService', function ($localStorage) {

 $localStorage = $localStorage.$default({
  things: []
});

  $localStorage = $localStorage.$default({
  things1: []
});

var _getAll = function () {
  return $localStorage.things1;
};

var _getAllId = function () {
  return $localStorage.things;
};



var _add = function (product_id, variant_id, qty, price, tax, InventoryRefNo) {

  $localStorage.things.push({"ProductId":{"Id":product_id}, "VariantId":{"Id":variant_id}, "Quantity":qty, "Amount":price, "Tax":tax, "InventoryRefNo":InventoryRefNo});
}

var _addname = function (name, vname, qty, price, tax, InventoryRefNo) {

  $localStorage.things1.push({"ProductName":name, "VariantName":vname, "Quantity":qty, "Amount":price, "Tax":tax, "InventoryRefNo":InventoryRefNo});
}
var _remove = function (thing) {
  
  $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
  $localStorage.things1.splice($localStorage.things.indexOf(thing), 1);
}

var _remove1 = function (thing) {
  
  $localStorage.things.splice($localStorage.things);
  $localStorage.things1.splice($localStorage.things);
}
return {
    getAll: _getAll,
    getAllId: _getAllId,
    add: _add,
    addname: _addname,
    remove: _remove,
    remove1: _remove1
  };
})

.factory ('StorageOutwardService', function ($localStorage) {

 $localStorage = $localStorage.$default({
  thingsout: []
});

  $localStorage = $localStorage.$default({
  things1out: []
});

var _getAll = function () {
  return $localStorage.things1out;
};

var _getAllId = function () {
  return $localStorage.thingsout;
};

var _add = function (product_id, variant_id, qty) {

  $localStorage.thingsout.push({"ProductId":{"Id":product_id}, "VariantId":{"Id":variant_id}, "Quantity":qty});
}

var _addname = function (name, vname, qty) {

  

  $localStorage.things1out.push({"ProductName":name, "VariantName":vname, "Quantity":qty});
}
var _remove = function (thing) {
  $localStorage.thingsout.splice($localStorage.thingsout.indexOf(thing), 1);
  $localStorage.things1out.splice($localStorage.thingsout.indexOf(thing), 1);
}

var _remove1 = function (thing) {
  $localStorage.thingsout.splice($localStorage.thingsout);
  $localStorage.things1out.splice($localStorage.thingsout);
}
return {
    getAll: _getAll,
    getAllId: _getAllId,
    add: _add,
    addname: _addname,
    remove: _remove,
    remove1: _remove1
  };
})

.controller('OnlinePaymentCtrl', function($scope,$state, $cordovaToast, $ionicLoading, $http) {

$scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
}; 



var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        // start to initialize PayPalMobile library
        app.initPaymentUI();
    },
    initPaymentUI : function () {
      var clientIDs = {
        "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
        "PayPalEnvironmentSandbox": "AdZhsVFLGK9kpiCCVOoULOmmLLa7MU0P_uQRFghpm8g31qVEn0ub_SU-1uvjI0tz_C2jv6JjQbVgI-7Q"
      };
      PayPalMobile.init(clientIDs, app.onPayPalMobileInit);

    },
    onSuccesfulPayment : function(payment) {
      console.log("payment success: " + JSON.stringify(payment, null, 4));
    },
    // This code is only used for independent card.io scanning abilities
    onCardIOComplete: function(card) {
      console.log("Card Scanned success: " + JSON.stringify(card, null, 4));
    },
    onAuthorizationCallback : function(authorization) {
      console.log("authorization: " + JSON.stringify(authorization, null, 4));
    },
    createPayment : function () {
      // for simplicity use predefined amount
      // optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
      var paymentDetails = new PayPalPaymentDetails("1.00", "0.00", "0.00");
      var payment = new PayPalPayment("1.00", "USD", "Awesome Sauce", "Sale", paymentDetails);
      return payment;
    },
    configuration : function () {
      // for more options see `paypal-mobile-js-helper.js`
      var config = new PayPalConfiguration({merchantName: "My test shop", merchantPrivacyPolicyURL: "https://mytestshop.com/policy", merchantUserAgreementURL: "https://mytestshop.com/agreement"});
      return config;
    },
    onPrepareRender : function() {
      // buttons defined in index.html
      //  <button id="buyNowBtn"> Buy Now !</button>
      //  <button id="buyInFutureBtn"> Pay in Future !</button>
      //  <button id="profileSharingBtn"> ProfileSharing !</button>
      //  <button id="cardScanBtn">Advanced: Use card.io scan only</button>
      var buyNowBtn = document.getElementById("buyNowBtn");
      var buyInFutureBtn = document.getElementById("buyInFutureBtn");
      var profileSharingBtn = document.getElementById("profileSharingBtn");
      var cardScanBtn = document.getElementById("cardScanBtn");

      buyNowBtn.onclick = function(e) {
        // single payment
        PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);
      };

      buyInFutureBtn.onclick = function(e) {
        // future payment
        PayPalMobile.renderFuturePaymentUI(app.onAuthorizationCallback, app.onUserCanceled);
      };

      profileSharingBtn.onclick = function(e) {
        // profile sharing
        PayPalMobile.renderProfileSharingUI(["profile", "email", "phone", "address", "futurepayments", "paypalattributes"], app.onAuthorizationCallback, app.onUserCanceled);
      };
      
      cardScanBtn.onclick = function(e) {
        // card.io scanning independent of paypal payments. 
        // This is used for cases where you only need to scan credit cards and not use PayPal as funding option.
        CardIO.scan({
                     "requireExpiry": true,
                     "requireCVV": false,
                     "requirePostalCode": false,
                     "restrictPostalCodeToNumericOnly": true
                   },
                   app.onCardIOComplete,
                   app.onUserCanceled
                 );
       };
    },
    onPayPalMobileInit : function() {
      // must be called
      // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
      PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", app.configuration(), app.onPrepareRender);
    },
    onUserCanceled : function(result) {
      console.log(result);
    }
};

app.initialize();
})

.controller('UserdashboardCtrl', function($scope,$state, $ionicLoading, $http) {


$scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
}; 




 var token = localStorage.getItem("token");
 var u_id = localStorage.getItem("UserPlanMapId");

$scope.GetCurrentPlan = function(){
  $scope.show($ionicLoading);

      $http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getplanbyuserid?userId="+u_id,
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
    console.log(response);
    $scope.CurrentPlan = response.Data;
    $scope.hide($ionicLoading);
  })
}


  $scope.make_payment = function (Id, Price) {
    
    localStorage.setItem("plan_id", Id);
    localStorage.setItem("Price", Price);
    $state.go('Payment');
  };

 
})

.controller('TechNotificationCtrl', function($scope,$state, $ionicLoading, $filter, $ionicModal, $http, $cordovaCamera, $timeout) {
     
    $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
}; 


     var token = localStorage.getItem("token");

      $http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getstatus",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
    console.log(response);
    $scope.StatusList = response.Data;
  })

$scope.GetAssignComplains = function(){
$scope.show($ionicLoading);
var UserId = localStorage.getItem("UserId");
      $http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getcomplainassignbyuserid?userId="+UserId+"&statusId=0",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
    console.log(response);
     if(response.Message == 'No Records'){
        $scope.ComplainError = true;
        $scope.assign_complain = false;
        $scope.hide($ionicLoading);
    }
    else{ 
    $scope.ComplainAssignList = response.Data;
    $scope.ComplainError = false;
    $scope.assign_complain = true;
    $scope.hide($ionicLoading);
  }
  })
}

 $ionicModal.fromTemplateUrl('modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.Status = {};

  $scope.Update_Complain = function(ComplainId, statusName){


 if(statusName == 'InProgress'){

  var StatusId = 3;

 }

 if(statusName == 'Complete'){
  var StatusId = 4;
 }    
    
$scope.show($ionicLoading);
$scope.AssignComplainData = {
                                "Data":{
                                        "Id":ComplainId,
                                        "StatusId":{
                                          "Id":StatusId
                                        }
                                      }
                            }


 
$.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/complain/savetechcomplain',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.AssignComplainData),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                alert("Status Updated");
                $state.go('app.tech_notification');
            },
            error: function(error)
            {
                console.log(error);
            }
        });
}

$scope.ComplainDetail1 = function(Id){

$scope.show($ionicLoading);
  
$http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getcomplainassignbyid?complainAssignId="+Id,
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
     console.log(response.Data);
     console.log(response.Data.ComplainId.UserId.AddressId.Street1);
     $state.go('Tech_Complain_Detail');
     $scope.hide($ionicLoading);
     localStorage.setItem("ComplainId", response.Data.ComplainId.Id);
     localStorage.setItem("CustomerName", response.Data.ComplainId.UserId.ContactId.Name);
     localStorage.setItem("Category", response.Data.ComplainId.CategoryId.Name);
     localStorage.setItem("Description", response.Data.ComplainId.Description);
     localStorage.setItem("Img", response.Data.ComplainId.FileId.Name);
     localStorage.setItem("Date",$filter('date')(response.Data.ComplainId.Date, 'yyyy-MM-dd'));
     localStorage.setItem("Street1", response.Data.ComplainId.UserId.AddressId.Street1);
     localStorage.setItem("Street2", response.Data.ComplainId.UserId.AddressId.Street2);
     localStorage.setItem("City", response.Data.ComplainId.UserId.AddressId.City);
     localStorage.setItem("ZipCode", response.Data.ComplainId.UserId.AddressId.ZipCode);
     
})


}

$scope.ComplainId = localStorage.getItem("ComplainId");
$scope.CustomerName = localStorage.getItem("CustomerName");
$scope.Category = localStorage.getItem("Category");
$scope.Description = localStorage.getItem("Description");
$scope.Image = localStorage.getItem("Img");
$scope.RegisterDate = localStorage.getItem("Date");
$scope.Street1 = localStorage.getItem("Street1");
$scope.Street2 = localStorage.getItem("Street2");
$scope.City = localStorage.getItem("City");
$scope.ZipCode = localStorage.getItem("ZipCode");

$scope.back_technotification = function(){
 
  $state.go('app.tech_notification');
}

})


.controller('UserPaymentHistoryCtrl', function($scope,$state, $ionicLoading, $ionicHistory, $location, $filter, $http) {
  
   $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

var token = localStorage.getItem("token");
var user_id = localStorage.getItem("UserId");

$scope.GetPendingUserPayment = function(){

$scope.show($ionicLoading);  
$http({
    method: "GET",
    url: "http://localhost:49535/api/invoice/getuserpayment?userid="+user_id+"&paymentId=0",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {

  

   if(response.Message == 'No Records'){
    $scope.error = true;
    $scope.PendingData = false;
    $scope.hide($ionicLoading);
   }

   else{
     $scope.error = false;
    $scope.PendingData = true;
    $scope.PendingUserPayment = response.Data;
    $scope.hide($ionicLoading);
   }
   
   

})
}

$scope.GetCompleteUserPayment = function(){

$scope.show($ionicLoading);  
$http({
    method: "GET",
    url: "http://localhost:49535/api/invoice/getuserpayment?userid="+user_id+"&paymentId=1",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {

    if(response.Message == 'No Records'){
    $scope.error = true;
    $scope.CompleteData = false;
    $scope.hide($ionicLoading);
   }

   else{
     $scope.error = false;
    $scope.CompleteData = true;
    $scope.CompleteUserPayment = response.Data;
    $scope.hide($ionicLoading);
   }
   
    

})
}


})  
.controller('PaymentDetailCtrl', function($scope,$state, $ionicLoading, $ionicHistory, $location, $filter, $http) {
 
  $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
}; 

  var token =  localStorage.getItem("token");
  var PaymentId = localStorage.getItem("Id");

$scope.GetPaymentDetails = function(){

$scope.show($ionicLoading);  
$http({
    method: "GET",
    url: "http://localhost:49535/api/invoice/getpaymentbyid?paymentId="+PaymentId,
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {

  

   $scope.PaymentStatus = localStorage.getItem("r");

  if($scope.PaymentStatus === '/app/pending_payment'){
   
    $scope.paymet_pending = true;
    $scope.paymet_received = false;
    $scope.TapButton = true;
  }

  else if($scope.PaymentStatus === '/app/superadmin_notification'){
    $scope.paymet_pending = true;
    $scope.paymet_received = false;
    $scope.TapButton = true;
  }

  else{
    $scope.paymet_pending = false;
    $scope.paymet_received = true;
    $scope.TapButton = false;
  }
  $scope.PayDetail = response.Data;
  $scope.hide($ionicLoading);

})

}

$scope.Update_Payment_Status = function(Id){

  $scope.show($ionicLoading);



 $http({
    method: "POST",
    url: "http://localhost:49535/api/invoice/updateispaid?invoiceId="+Id,
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
   alert('Payment Status Updated');
   $scope.hide($ionicLoading);
  $ionicHistory.goBack(); 
  
})
}

$scope.back_notification = function(){
 $ionicHistory.goBack();
}

})

.controller('PendingPaymentCtrl', function($scope,$state,$filter,$location,$ionicLoading,$http) {

  $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
}; 


  var token = localStorage.getItem("token");

$scope.GetPendingPayments = function(){

  $scope.show($ionicLoading);
  $http({
    method: "GET",
    url: "http://localhost:49535/api/invoice/getpayment?payId=0",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}
).success(function (response) {
    console.log(response);
    $scope.PendingPaymentList = response.Data;
    $scope.hide($ionicLoading);
  })
}

$scope.PaymentDetail = function(Id){
  
  var r = $location.path();
  localStorage.setItem("Id", Id);
  localStorage.setItem("r", r);
  $state.go('PaymentDetail');

}

})

.controller('CompletePaymentCtrl', function($scope,$state,$location,$filter, $ionicLoading, $http) {

  $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
}; 


  var token = localStorage.getItem("token");

$scope.GetCompletePayments = function(){

  $scope.show($ionicLoading);
  $http({
    method: "GET",
    url: "http://localhost:49535/api/invoice/getpayment?payId=1",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
    console.log(response);
    $scope.CompletePaymentList = response.Data;
    $scope.hide($ionicLoading);
  })
}

$scope.PaymentDetail = function(Id){

  var r = $location.path();
  localStorage.setItem("r", r);
  localStorage.setItem("Id", Id);
  $state.go('PaymentDetail');

}

})


.controller('NotificationCtrl', function($scope,$state, $location, $ionicLoading, $cordovaFileTransfer, $filter, $ionicModal, $http, $cordovaCamera, $timeout) {

$scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
}; 

$scope.StartLoading = function(){
  $scope.show($ionicLoading);
}


$scope.downloadFile = function() {
      
        var url = "http://cssent.com/demo/bk/uploads/angular-bg.png";
        var filename = url.split("/").pop();
        alert(filename);
        var targetPath = cordova.file.externalRootDirectory + filename;
        var trustHosts = true
        var options = {};
        alert(cordova.file.externalRootDirectory);
        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
            .then(function(result) {
                // Success!
                console.log(JSON.stringify(result));
            }, function(error) {
                // Error
                console.log(JSON.stringify(error));
            }, function (progress) {
                $timeout(function () {
                    $scope.per = true;
                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                })
            });
    }
var token = localStorage.getItem("token");

   $http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getcomplain",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
  
   localStorage.setItem("Comp", response.Message);
    if(response.Message == 'No Records'){

       
        $scope.ComplainRecords = false;
    }
    
    else
    { 
    $scope.ComplainList = response.Data;
    $scope.ComplainError = false;
    $scope.ComplainRecords = true;
  }
  })

$http({
    method: "GET",
    url: "http://localhost:49535/api/invoice/getpayment?payId=2",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
   
    localStorage.setItem("Pay", response.Message);
    $scope.hide($ionicLoading);
    $scope.Modal();
    if(response.Message == 'No Records'){
        //$scope.ComplainError = true;
        $scope.PaymentRecords = false;
    }
    else{ 
    $scope.PaymentList = response.Data;
  
    $scope.ComplainError = false;
    $scope.PaymentRecords = true;
  }
})


$scope.Modal = function(){
  $scope.PaymentList = localStorage.getItem("Pay");
  $scope.CompList = localStorage.getItem("Comp");

  if( $scope.PaymentList == 'No Records' &&  $scope.CompList== 'No Records'){
       $scope.ComplainError = true;
  }
}

//  $http({
//     method: "GET",
//     url: "http://localhost:49535/api/invoice/getcustomer",
//     headers: {'Content-Type': 'application/x-www-form-urlencoded',
//               'Authorization': token}
// }).success(function (response) {
//     console.log(response);
//     $scope.CustomerPaymentList = response.Data;
//   })


$http({
    method: "GET",
    url: "http://localhost:49535/api/contact/getnamebyrole?roleId=5",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
    $scope.technicians = response.Data;
})

$scope.back_notification = function(){
  $state.go('app.superadmin_notification');
}

 $ionicModal.fromTemplateUrl('modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

$scope.Assign_Complain = function(ComplainId, techId){

$scope.show($ionicLoading);
$scope.AssignComplainData = {
                              "Data":{
                                       "ComplainId":{
                                                       "Id":ComplainId
                                                    },

                                        "UserId":{
                                                       "Id":techId.UserId.Id
                                                },

                                        "AssignedDate":$filter('date')(new Date(), 'yyyy-MM-dd'),
                                        "AssignedBy":"SuperAdmin",
                                        "IsForwarded":0,
                                       
                                        "CloseDate":$filter('date')(new Date(), 'yyyy-MM-dd'),                   
                                        "Notes":"complete it today",
                                        "StatusId":2
                                      }
                            }

   console.log($scope.AssignComplainData);                         


 
$.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/complain/savecomplainassign',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.AssignComplainData),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                alert("Complain Assign Successfully");
                $state.go('app.superadmin_notification');
            },
            error: function(error)
            {
                console.log(error);
            }
        });
}

$scope.PaymentDetail = function(Id){
  var r = $location.path();
  localStorage.setItem("r", r);
  localStorage.setItem("Id", Id);
  $state.go('PaymentDetail');

}  
$scope.ComplainDetail = function(Id){

$scope.show($ionicLoading);  
  
$http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getcomplainbyid?complainId="+Id,
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
     console.log(response.Data);
     $state.go('ComplainDetail');
     $scope.hide($ionicLoading);
     localStorage.setItem("ComplainId", response.Data.Id);
     localStorage.setItem("CustomerName", response.Data.UserId.ContactId.Name);
     localStorage.setItem("Category", response.Data.CategoryId.Name);
     localStorage.setItem("Description", response.Data.Description);
     localStorage.setItem("Img", response.Data.FileId.Name);
     localStorage.setItem("Date",$filter('date')(response.Data.Date, 'yyyy-MM-dd'));
     localStorage.setItem("Street1", response.Data.UserId.AddressId.Street1);
     localStorage.setItem("Street2", response.Data.UserId.AddressId.Street2);
     localStorage.setItem("City", response.Data.UserId.AddressId.City);
     localStorage.setItem("ZipCode", response.Data.UserId.AddressId.ZipCode);
     
})
}


$scope.ComplainId = localStorage.getItem("ComplainId");
$scope.CustomerName = localStorage.getItem("CustomerName");
$scope.Category = localStorage.getItem("Category");
$scope.Description = localStorage.getItem("Description");
$scope.Image = localStorage.getItem("Img");
$scope.RegisterDate = localStorage.getItem("Date");
$scope.Street1 = localStorage.getItem("Street1");
$scope.Street2 = localStorage.getItem("Street2");
$scope.City = localStorage.getItem("City");
$scope.ZipCode = localStorage.getItem("ZipCode");



})

.controller('ReportsCtrl', function($scope,$state, $rootScope, $ionicLoading, $http, $cordovaPrinter, $cordovaCamera, $timeout) {
$scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

$scope.StartLoading = function(){
  $scope.show($ionicLoading);
}

var token = localStorage.getItem("token");
$http({
    method: "GET",
    url: "http://localhost:49535/api/invoice/getinvoice",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
    console.log(response.Data);
    $scope.Invoice_Report = response.Data;
    $scope.hide($ionicLoading);
  })

$scope.InvoiceDetail = function(Id){
  localStorage.setItem("Id",Id);
   $scope.show($ionicLoading);
  $state.go('InvoiceDetail');
}

$scope.back_report = function(){
  $state.go('app.reports');
}

$scope.InvoiceReportDetail = function(){

 $scope.show($ionicLoading); 
 var id = localStorage.getItem("Id"); 
 $http({
    method: "GET",
    url: "http://localhost:49535/api/invoice/getinvoicebyid?id="+id,
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}

}).success(function (response) {
  console.log(response.Data);
  var sub_total = 0;
  var tax = 0;
  for(var i = 0; i < response.Data.length; i++)
  {
      sub_total = sub_total + response.Data[i].Amount;
  }

  for(var i = 0; i < response.Data.length; i++)
  {
      tax = tax + response.Data[i].Tax;
  }
    $scope.SubTotal = sub_total;
    $scope.Tax = tax;
    $scope.Total = $scope.SubTotal + $scope.Tax;
    $scope.InvoiceNumber = response.Data[0].InvoiceId.InvoiceNumber;
    $scope.BuyerInvoiceNumber = response.Data[0].InvoiceId.BuyerInvoiceNumber;
    $scope.VendorName = response.Data[0].InvoiceId.UserId.ContactId.Name;
    $scope.Email = response.Data[0].InvoiceId.UserId.ContactId.Email;
    $scope.Mobile = response.Data[0].InvoiceId.UserId.ContactId.Mobile;
    $scope.Invoice_Detail = response.Data;
    $scope.hide($ionicLoading);
  })
}

      $scope.print = function() {
        if($cordovaPrinter.isAvailable()) {
          var page = document.getElementById('invoice');
            $cordovaPrinter.print(page, 'Invoice');
        } else {
            alert("Printing is not available on device");
        }
    }

}) 

.controller('AppCtrl', function($scope,$state, $rootScope, $ionicLoading, $http, $cordovaCamera, $timeout) {

$scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};


$scope.GotoReset = function(email){

  if(email==undefined){
    alert("Enter Email");
  }

  else{

  localStorage.setItem("Email", email);
  $state.go('reset_password');

}


}

$scope.back_forgot = function(){
  $state.go('forgot_password');
}

$scope.GetEmail = function(){
  $scope.email = localStorage.getItem("Email");
}


$scope.ResetPassword = function(password){

  if(password==undefined){
    alert("Enter Password");
  }

  else{

    $scope.show($ionicLoading);

    var email = localStorage.getItem("Email");

    $scope.ResetData = {

                        "Email":email,
                        "Password":password,

    }

    

     $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/account/resetPassword',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.ResetData),
//           ,
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                
            },
            success: function(data, status)
            {
           
              console.log(data.Message);
              if(data.Message == 'Unregistered email'){

                 alert("Your Email Address Is Not Registered")

                 $scope.hide($ionicLoading);

                 $state.go('forgot_password');

              }

              else{

                alert("Password Updated");
                $scope.hide($ionicLoading);
                 $state.go('login');
              }
             
            },
            error: function(error)
            {
                console.log(error);
            }
        });

  }

} 


$scope.ccavenue = function(){
 window.location = 'http://aksharsoftwaresolutions.esy.es/skyjinx/ccavRequestHandler.php';
}

// $http({
//     method: "GET",
//     url: "http://localhost:49535/api/contact/getrole",
//     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
// }).success(function (response) {
//     // console.log(response);
//     $scope.role = response.Data;
// })


// $http({
//     method: "GET",
//     url: "http://localhost:49535/api/plan/getplan",
//     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
// }).success(function (response) {
//     // console.log(response);
//     $scope.service = response.Data;
// })



$scope.forgot_pass = function(){
  $state.go('forgot_password');
}

$scope.login = function(){
  $state.go('login');
}

$scope.homepage = function(){
  $state.go('homepage');
}


$scope.onplanselect = function(PlanName){
  alert(PlanName);

  $.ajax(
        { 
            type: 'GET',
            url: 'http://localhost:49535/api/plan/getspeedprice/?planName='+PlanName,
           
            success: function(data, status)
            {
                // console.log(data); // Contains the suite
            },
            error: function(error)
            {
                console.log(error);
            }
        });
}
  
$scope.LoginData = {};
  // Perform the login action when the user submits the login form
$scope.login_role = function() {



if($scope.LoginData.Email=="admin"){

  alert("Enter Email");
     
      $state.go('app.superadmin_notification');

      $rootScope.isShowNav=true;
      $rootScope.isShowNav1=true;
      $rootScope.isShowNav2=true;
      $rootScope.isShowNav3=true;
      $rootScope.isShowNav4=true;
      $rootScope.isShowNav5=true;
      $rootScope.isShowNav6=true;
      $rootScope.isShowNav7=true;
      $rootScope.isShowNav8=true;
      $rootScope.isShowNav9=true;
      $rootScope.isShowNav10=true;
      $rootScope.isShowNav11=true;
      $rootScope.isShowNav12=true;
      $rootScope.isShowNav13=true;
}

else if($scope.LoginData.Email=="user"){

       alert("Enter Password");
      $state.go('app.user_dashboard');
      $rootScope.isShowNavU1=true;
      $rootScope.isShowNavU2=true;
      $rootScope.isShowNavU3=true;
      $rootScope.isShowNavU4=true;
      $rootScope.isShowNavU5=true;
       
}



      else if($scope.LoginData.Email=="tech"){
        $state.go('app.tech_notification');
        $rootScope.isShowNavT1=true;
        $rootScope.isShowNavT2=true;
        $rootScope.isShowNavT3=true;
        $rootScope.isShowNavU1=false;
        $rootScope.isShowNavU2=false;
        $rootScope.isShowNavU3=false;
        $rootScope.isShowNavU4=false;
        $rootScope.isShowNavU5=false;
       
        
      }


else{

// $scope.show($ionicLoading);

// $.ajax(
//         { 
//             type: 'POST',
//             url: 'http://localhost:49535/api/account/token',
//             contentType: "application/Body-x-www-form-urlencoded",
//             dataType: "json",
//             data: {'grant_type': 'password','username': $scope.LoginData.Email,
//             'password': $scope.LoginData.Password,
//             'gcmString': 'cEATY5ERJAQ:APA91bGZJ9lGLtU97mLQy82stDTdCG9XwyDK39hzSbeaLCQMPm5Q2ARx_bg6eDolcbGZWYA0iDr5eudySebDRMU2QLLNmII-1cDIdvZ1pcIcZnEsvk8Ourw29IFxNxoYqUkysh4cR7jg'},
//              beforeSend: function(xhr)
//             {
//                 xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//                // xhr.setRequestHeader("Authorization", token);
//             },
//             success: function(data, status)
//             {
//             console.log(data);  
//             localStorage.setItem("token", 'bearer '+data.access_token); // Contains the suite
//             localStorage.setItem("UserId", data.userId);
//             localStorage.setItem("UserPlanMapId", data.userPlanMapId);
//             localStorage.setItem("AddressId", data.addressId); 
//             localStorage.setItem("PlanId", data.planId);

//             if(data.userRole=='Technician'){

//                 $state.go('app.tech_notification');
//                 $scope.hide($ionicLoading);
//                 $rootScope.isShowNavT1=true;
//                 $rootScope.isShowNavT2=true;
//                 $rootScope.isShowNavT3=true;

//                 $rootScope.isShowNavU1=false;
//                 $rootScope.isShowNavU2=false;
//                 $rootScope.isShowNavU3=false;
//                 $rootScope.isShowNavU4=false;
//                 $rootScope.isShowNavU5=false;

//                  $rootScope.isShowNav=false;
//                   $rootScope.isShowNav1=false;
//                   $rootScope.isShowNav2=false;
//                   $rootScope.isShowNav3=false;
//                   $rootScope.isShowNav4=false;
//                   $rootScope.isShowNav5=false;
//                   $rootScope.isShowNav6=false;
//                   $rootScope.isShowNav7=false;
//                   $rootScope.isShowNav8=false;
//                   $rootScope.isShowNav9=false;
//                   $rootScope.isShowNav10=false;
//                   $rootScope.isShowNav11=false;
//                   $rootScope.isShowNav12=false;
//                   $rootScope.isShowNav13=false;
//             }

//             else if(data.userRole=='Admin'){

//                  $state.go('app.superadmin_notification');

//                   $rootScope.isShowNav=true;
//                   $rootScope.isShowNav1=true;
//                   $rootScope.isShowNav2=true;
//                   $rootScope.isShowNav3=true;
//                   $rootScope.isShowNav4=true;
//                   $rootScope.isShowNav5=true;
//                   $rootScope.isShowNav6=true;
//                   $rootScope.isShowNav7=true;
//                   $rootScope.isShowNav8=true;
//                   $rootScope.isShowNav9=true;
//                   $rootScope.isShowNav10=true;
//                   $rootScope.isShowNav11=true;
//                   $rootScope.isShowNav12=true;
//                   $rootScope.isShowNav13=true;

//                       $rootScope.isShowNavT1=false;
//                       $rootScope.isShowNavT2=false;
//                       $rootScope.isShowNavT3=false; 

//                         $rootScope.isShowNavU1=false;
//                         $rootScope.isShowNavU2=false;
//                         $rootScope.isShowNavU3=false;
//                         $rootScope.isShowNavU4=false;
//                         $rootScope.isShowNavU5=false;
//             }

//             else{

//                 $state.go('app.user_dashboard');
//                 $rootScope.isShowNavU1=true;
//                 $rootScope.isShowNavU2=true;
//                 $rootScope.isShowNavU3=true;
//                 $rootScope.isShowNavU4=true;
//                 $rootScope.isShowNavU5=true;

//                   $rootScope.isShowNav=false;
//                   $rootScope.isShowNav1=false;
//                   $rootScope.isShowNav2=false;
//                   $rootScope.isShowNav3=false;
//                   $rootScope.isShowNav4=false;
//                   $rootScope.isShowNav5=false;
//                   $rootScope.isShowNav6=false;
//                   $rootScope.isShowNav7=false;
//                   $rootScope.isShowNav8=false;
//                   $rootScope.isShowNav9=false;
//                   $rootScope.isShowNav10=false;
//                   $rootScope.isShowNav11=false;
//                   $rootScope.isShowNav12=false;
//                   $rootScope.isShowNav13=false;

//                     $rootScope.isShowNavT1=false;
//                     $rootScope.isShowNavT2=false;
//                     $rootScope.isShowNavT3=false;
//             }  
//             },
//             error: function(error)
//             {
//                 console.log(error);
//             }
//         });
// //   }

}
}
})

.controller('VendorlistCtrl', function($scope, $ionicModal, $ionicPopup, $http, $ionicLoading, $timeout, $state) {

  $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

 $scope.add_new_user = function(){
   
    $state.go('add_users');
  }


var token = localStorage.getItem("token");
$scope.GetUsers = function(){
$scope.show($ionicLoading);
$http({
    method: "GET",
    url: "http://localhost:49535/api/contact/getallnamebyrole",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
    console.log(response);
    $scope.userlist = response.Data;
    $scope.hide($ionicLoading);
  })
}

$scope.showConfirm = function(Id) {

  

   $scope.user = {  
                "Data":{
                    "UserId":
                       { 
                        "Id": Id
                         
                       } 
                     } 
                  };
   var confirmPopup = $ionicPopup.confirm({
    
     template: 'Are you sure you want to delete profile?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log( $scope.user);
       $scope.show($ionicLoading);
       $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/contact/removecontact',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.user),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                 xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
             
            $http({
                method: "GET",
                url: "http://localhost:49535/api/contact/getallnamebyrole",
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                          'Authorization': token}
            }).success(function (response) {
               
                $scope.hide($ionicLoading);
                alert("Profile Deleted");
                $scope.userlist = response.Data;
              })
              // Contains the suite
            },
            error: function(error)
            {
                console.log(error);
            }
        });
  
     } else {
       console.log('You are not sure');
     }
   });
 }
 
})


.controller('CustomerListCtrl', function($scope, $ionicLoading, $ionicPopup, $http, $state, $ionicHistory) {

$scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

 $scope.add_new_customer = function(){
   
    $state.go('add_customer');
  }


var token = localStorage.getItem("token");
$scope.GetUsers = function(){
$scope.show($ionicLoading);

 
$http({
    method: "GET",
    url: "http://localhost:49535/api/contact/getallnamebyrole",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
    console.log(response);
    $scope.userlist = response.Data;
    $scope.hide($ionicLoading);
  })
}

$scope.showConfirm = function(Id) {

  

   $scope.user = {  
                "Data":{
                    "UserId":
                       { 
                        "Id": Id
                         
                       } 
                     } 
                  };
   var confirmPopup = $ionicPopup.confirm({
    
     template: 'Are you sure you want to delete profile?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log( $scope.user);
       $scope.show($ionicLoading);
       $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/contact/removecontact',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.user),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                 xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
              
            $http({
                method: "GET",
                url: "http://localhost:49535/api/contact/getallnamebyrole",
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                          'Authorization': token}
            }).success(function (response) {
               
                $scope.hide($ionicLoading);
                alert("Profile Deleted");
                $scope.userlist = response.Data;
              })
              // Contains the suite
            },
            error: function(error)
            {
                console.log(error);
            }
        });
  
     } else {
       console.log('You are not sure');
     }
   });
 }


})

.controller('TechListCtrl', function($scope, $ionicLoading, $ionicPopup, $http, $state, $ionicHistory) {

  $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};


  var token = localStorage.getItem("token");

$scope.GetUsers = function(){ 

$scope.show($ionicLoading); 
$http({
    method: "GET",
    url: "http://localhost:49535/api/contact/getallnamebyrole",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
    console.log(response);
    $scope.userlist = response.Data;
    $scope.hide($ionicLoading);
  })
}

 $scope.add_new_user = function(){
       $state.go('add_users');
  }

  $scope.showConfirm = function(Id) {
  


   $scope.user = {  
                "Data":{
                    "UserId":
                       { 
                        "Id": Id
                         
                       } 
                     } 
                  };
   var confirmPopup = $ionicPopup.confirm({
    
     template: 'Are you sure you want to delete profile?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       
         $scope.show($ionicLoading);
       $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/contact/removecontact',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.user),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                 xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
             
            $http({
                method: "GET",
                url: "http://localhost:49535/api/contact/getallnamebyrole",
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                          'Authorization': token}
            }).success(function (response) {
                
                $scope.hide($ionicLoading);
                alert("Profile Deleted");
                $scope.userlist = response.Data;
              })
              // Contains the suite
            },
            error: function(error)
            {
                console.log(error);
            }
        });
  
     } else {
       console.log('You are not sure');
     }
   });
 }


})


.controller('AdminCtrl', function($scope, $filter, $ionicLoading, $http, $state, $ionicPopup, $ionicHistory) {


$scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

var token = localStorage.getItem("token");

 

$scope.GetServices = function(){
   $http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getplan",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
    console.log(response);
     $scope.hide($ionicLoading);
    $scope.service = response.Data;
})
}

$scope.GetUsers = function(){
   $scope.show($ionicLoading);
  $http({
    method: "GET",
    url: "http://localhost:49535/api/contact/getallnamebyrole",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
    console.log(response);
    $scope.hide($ionicLoading);
    $scope.userlist = response.Data;
  })
}



$scope.GetRole_GetServices = function(){

  $scope.show($ionicLoading);


  $http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getplan",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
    console.log(response);

    $scope.service = response.Data;
    $scope.hide($ionicLoading);
})


}

 $http({
    method: "GET",
    url: "http://localhost:49535/api/contact/getnamebyrole?roleId=3",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
    $scope.vendor = response.Data;
})







 $scope.showConfirm = function(Id) {

  

   $scope.user = {  
                "Data":{
                    "UserId":
                       { 
                        "Id": Id
                         
                       } 
                     } 
                  };
   var confirmPopup = $ionicPopup.confirm({
    
     template: 'Are you sure you want to delete profile?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log( $scope.user);
       $scope.show($ionicLoading);
       $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/contact/removecontact',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.user),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                 xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
             
            $http({
                method: "GET",
                url: "http://localhost:49535/api/contact/getallnamebyrole",
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                          'Authorization': token}
            }).success(function (response) {
               
                $scope.hide($ionicLoading);
                alert("Profile Deleted");
                $scope.userlist = response.Data;
              })
              // Contains the suite
            },
            error: function(error)
            {
                console.log(error);
            }
        });
  
     } else {
       console.log('You are not sure');
     }
   });
 }



$scope.profile_client = function(Id, Name){

$scope.show($ionicLoading);
  
    $http({
    method: "GET",
    url: "http://localhost:49535/api/contact/getcontactbyid?userId="+Id,
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
    console.log(response.Data);
    
    if(Name === "User"){
    localStorage.setItem("UserId", Id);
    localStorage.setItem("UserName", response.Data.UserId.Username);
    localStorage.setItem("Name", response.Data.Name);
    localStorage.setItem("ContactId", response.Data.Id);
    localStorage.setItem("AddressId", response.Data.AddressId.Id);
    localStorage.setItem("UserPlanMapId", response.Data.Plans.Id);
    localStorage.setItem("Email", response.Data.Email);
    localStorage.setItem("Phone", response.Data.Phone);
    localStorage.setItem("Mobile", response.Data.Mobile);
    localStorage.setItem("Street1", response.Data.AddressId.Street1);
    localStorage.setItem("Street2", response.Data.AddressId.Street2);
    localStorage.setItem("City", response.Data.AddressId.City);
    localStorage.setItem("State", response.Data.AddressId.State);
    localStorage.setItem("Country", response.Data.AddressId.Country);
    localStorage.setItem("ZipCode", response.Data.AddressId.ZipCode);
    localStorage.setItem("RadiusId", response.Data.UserAddressId.RadiusId);
    localStorage.setItem("RadiusUsername", response.Data.UserAddressId.RadiusUsername);
    localStorage.setItem("RadiusPassword", response.Data.UserAddressId.RadiusPassword);
    localStorage.setItem("UserRole", response.Data.Role.Name);
    localStorage.setItem("PlanName", response.Data.Plans.PlanId.Name);
    localStorage.setItem("PlanSpeed", response.Data.Plans.PlanId.Speed);
    localStorage.setItem("PlanPrice", response.Data.Plans.PlanId.Price);
    localStorage.setItem("StartDate",$filter('date')(response.Data.Plans.StartDate, 'yyyy-MM-dd'));
    localStorage.setItem("EndDate", $filter('date')(response.Data.Plans.EndDate, 'yyyy-MM-dd'));
    $state.go('edit_profile');
  }

  else{

    localStorage.setItem("UserId", Id);
    localStorage.setItem("UserName", response.Data.UserId.Username);
    localStorage.setItem("Name", response.Data.Name);
    localStorage.setItem("ContactId", response.Data.Id);
    localStorage.setItem("AddressId", response.Data.AddressId.Id);
    localStorage.setItem("Email", response.Data.Email);
    localStorage.setItem("Phone", response.Data.Phone);
    localStorage.setItem("Mobile", response.Data.Mobile);
    localStorage.setItem("Street1", response.Data.AddressId.Street1);
    localStorage.setItem("Street2", response.Data.AddressId.Street2);
    localStorage.setItem("City", response.Data.AddressId.City);
    localStorage.setItem("State", response.Data.AddressId.State);
    localStorage.setItem("Country", response.Data.AddressId.Country);
    localStorage.setItem("ZipCode", response.Data.AddressId.ZipCode);
    localStorage.setItem("UserRole", response.Data.Role.Name);
    $scope.hide($ionicLoading);
    $state.go('AdminEditProfile');

  }
  
})

}
  $scope.UserId = localStorage.getItem("UserId");
  $scope.UserName = localStorage.getItem("UserName");
  $scope.Name = localStorage.getItem("Name");
  $scope.Email = localStorage.getItem("Email");
  $scope.Phone = localStorage.getItem("Phone");
  $scope.Mobile = localStorage.getItem("Mobile");
  $scope.Street1 = localStorage.getItem("Street1");
  $scope.Street2 = localStorage.getItem("Street2");
  $scope.City = localStorage.getItem("City");
  $scope.State = localStorage.getItem("State");
  $scope.Country = localStorage.getItem("Country");
  $scope.ZipCode = localStorage.getItem("ZipCode");
  $scope.RadiusId = localStorage.getItem("RadiusId");
  $scope.RadiusUsername = localStorage.getItem("RadiusUsername");
  $scope.RadiusPassword = localStorage.getItem("RadiusPassword");
  $scope.UserRole = localStorage.getItem("UserRole");
  $scope.PlanName = localStorage.getItem("PlanName");
  $scope.PlanSpeed = localStorage.getItem("PlanSpeed");
  $scope.PlanPrice = localStorage.getItem("PlanPrice");
  $scope.StartDate = localStorage.getItem("StartDate");
  $scope.EndDate = localStorage.getItem("EndDate");
  $scope.new_admin = function(){
    $state.go('add_admin');
  }

  $scope.goBack = function(){
      $ionicHistory.goBack();
  }

  $scope.back_customer_list = function(){
      $state.go('app.customer_list');
  }   
   

  
  $scope.user = {};
  $scope.add_new_customer = function(){
    $state.go('add_customer');
  }

  $scope.add_new_user = function(){

    $state.go('add_users');
  } 
  $scope.user = {};
  $scope.new_customer = function(){
    
  if($scope.user.Data.Username==undefined){

    alert("Enter Username");

  }

  else if($scope.user.Data.Password==undefined){

    alert("Enter Password");

  }

  else if($scope.user.Data.ContactId.Name==undefined){

    alert("Enter Name");

  }

  else if($scope.user.Data.ContactId.Email==undefined){

   alert("Enter Email");
  }

  else if($scope.user.Data.ContactId.Phone==undefined){

  alert("Enter Phone");  
  }

  else if($scope.user.Data.ContactId.Mobile==undefined){

    alert("Enter Mobile Number");

  }

  else if($scope.user.Data.ContactId.Mobile.length<10 || $scope.user.Data.ContactId.Mobile.length>10){
    alert("Mobile number must contain 10 digits only"); 
  }

   else if($scope.user.Data.AddressId.Street1===undefined){

     alert("Enter Address Line1");

  }


   else if($scope.user.Data.AddressId.Street2==undefined){

     alert("Enter Address Line2");

  }

   else if($scope.user.Data.AddressId.City==undefined){

     alert("Enter City");

  }

  else if($scope.user.Data.AddressId.State==undefined){

     alert("Enter State");

  }

  else if($scope.user.Data.AddressId.Country==undefined){

     alert("Enter Country");

  }

  else if($scope.user.Data.AddressId.ZipCode==undefined){

     alert("Enter Zipcode");

  }

  else if($scope.user.Data.ContactId.BirthDate==undefined){

     alert("Enter Birth Date");

  }

  else if($scope.user.Data.UserAddressMap.RadiusId==undefined){

     alert("Enter Radius Id");

  }

  else if($scope.user.Data.UserAddressMap.RadiusUserName==undefined){

     alert("Enter Radius UserName");

  }

  else if($scope.user.Data.UserAddressMap.RadiusPassword==undefined){

    alert("Enter Radius Password");

  }


  else if($scope.user.Data.UserRole.Name==undefined){

    alert("Enter User Role");

  }


  else if($scope.user.Data.UserPlanMapId.PlanId.Name==undefined){

    alert("Enter User Plan");

  }


  else if($scope.user.Data.UserPlanMapId.PlanId.Speed==undefined){

    alert("Enter Speed");

  }

  else if($scope.user.Data.UserPlanMapId.PlanId.Price==undefined){

    alert("Enter Price");

  }

   else if($scope.user.Data.UserPlanMapId.StartDate==undefined){

    alert("Enter Start Date");

  }

   else if($scope.user.Data.UserPlanMapId.EndDate==undefined){

    alert("Enter End Date");

  }

  else{




  $scope.show($ionicLoading); 
  $scope.user.Data.UserPlanMapId.StartDate = $filter('date')($scope.user.Data.UserPlanMapId.StartDate, 'MM-dd-yyyy');  
  $scope.user.Data.UserPlanMapId.EndDate = $filter('date')($scope.user.Data.UserPlanMapId.EndDate, 'MM-dd-yyyy'); 
  $scope.user.Data.ContactId.BirthDate = $filter('date')($scope.user.Data.ContactId.BirthDate, 'MM-dd-yyyy');
  
  
  


$scope.user.Data.UserRole.Name = "User";
 

$.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/account/register',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.user),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
               // xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                // console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                alert("User Added");
                $state.go('app.customer_list');
            },
            error: function(error)
            {
                console.log(error);
            }
        });
  
  }
}


 $scope.new_customer1 = function(){

 
  if($scope.user.Data.Username==undefined){

    alert("Enter Username");

  }

  else if($scope.user.Data.Password==undefined){

    alert("Enter Password");

  }

  else if($scope.user.Data.ContactId.Name==undefined){

    alert("Enter Name");

  }

  else if($scope.user.Data.ContactId.Email==undefined){

   alert("Enter Email");
  }

  else if($scope.user.Data.ContactId.Phone==undefined){

  alert("Enter Phone");  
  }

  else if($scope.user.Data.ContactId.Mobile==undefined){

    alert("Enter Mobile Number");

  }

  else if($scope.user.Data.ContactId.Mobile.length<10 || $scope.user.Data.ContactId.Mobile.length>10){
    alert("Mobile number must contain 10 digits only"); 
  }

   else if($scope.user.Data.AddressId.Street1===undefined){

     alert("Enter Address Line1");

  }


   else if($scope.user.Data.AddressId.Street2==undefined){

     alert("Enter Address Line2");

  }

   else if($scope.user.Data.AddressId.City==undefined){

     alert("Enter City");

  }

  else if($scope.user.Data.AddressId.State==undefined){

     alert("Enter State");

  }

  else if($scope.user.Data.AddressId.Country==undefined){

     alert("Enter Country");

  }

  else if($scope.user.Data.AddressId.ZipCode==undefined){

     alert("Enter Zipcode");

  }

  else if($scope.user.Data.ContactId.BirthDate==undefined){

     alert("Enter Birth Date");

  }

  else if($scope.user.Data.UserRole.Name==undefined){

    alert("Enter User Role");

  }

else{  


$scope.show($ionicLoading); 

$scope.user.Data.ContactId.BirthDate = $filter('date')($scope.user.Data.ContactId.BirthDate, 'MM-dd-yyyy');

$.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/account/register',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.user),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
               // xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                // console.log(data); // Contains the suite

                 $scope.hide($ionicLoading); 
                 $ionicHistory.goBack();

            },
            error: function(error)
            {
                console.log(error);
            }
      });
}
}

$scope.edit_customer = function(UserId, UserName, Name, Email, Phone, Mobile, Street1, Street2
     , City, State, Country, ZipCode, RadiusId, RadiusUsername, RadiusPassword, PlanName,
      PlanSpeed, PlanPrice, StartDate, EndDate){
 $scope.show($ionicLoading); 
 $scope.edit_data =

   {
    "Data":{
          "Id":UserId,
          "Username":UserName,
          "Password":"Abc@123",
          "ContactId":{
            "Id":localStorage.getItem("ContactId"),
          "Name":Name,
          "Email":Email,
          "Phone":Phone,
          "Mobile":Mobile
           },
          "UserRole":{
            "Name":"User"
          },
          "AddressId":{
            "Id":localStorage.getItem("AddressId"),
          "Street1":Street1,
          "Street2":Street2,
          "City":City,
          "State":State,
          "Country":Country,
          "ZipCode":ZipCode
          
          },
          "UserAddressMap":
          {
          "RadiusId":RadiusId,
          "RadiusUserName":RadiusUsername,
          "RadiusPassword":RadiusPassword
          },
          "UserPlanMapId":{
            "Id":localStorage.getItem("UserPlanMapId"),
            "PlanId":{
              "Name":PlanName,
          "Speed":PlanSpeed,
          "Price":PlanPrice
            },
          "StartDate":StartDate,
          "EndDate":EndDate
          }
         
 }
}

  
 

$.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/account/manageinfo',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.edit_data),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                console.log(data); 
                $scope.hide($ionicLoading);
                $state.go('app.customer_list');

                // Contains the suite
            },
            error: function(error)
            {
                console.log(error);
            }
        });
  
  
}


$scope.edit_user = function(UserId, UserName, Name, Email, Phone, Mobile, Street1, Street2
     , City, State, Country, ZipCode, UserRole){
  $scope.show($ionicLoading);
  
 $scope.edit_data =

   {
    "Data":{
          "Id":UserId,
          "Username":UserName,
          "Password":"Abc@123",
          "ContactId":{
            "Id":localStorage.getItem("ContactId"),
          "Name":Name,
          "Email":Email,
          "Phone":Phone,
          "Mobile":Mobile
           },
          "UserRole":{
            "Name":UserRole
          },
          "AddressId":{
            "Id":localStorage.getItem("AddressId"),
          "Street1":Street1,
          "Street2":Street2,
          "City":City,
          "State":State,
          "Country":Country,
          "ZipCode":ZipCode
          
          }        
         
 }
}

  
 

$.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/account/manageinfo',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.edit_data),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                $ionicHistory.goBack();
            },
            error: function(error)
            {
                console.log(error);
            }
        });
  
  
}

$scope.new_user = function(){
    
    alert("dds");

  
  // if($scope.user.username === undefined){
  //   alert("Enter Username"); 
  // } 

  // else if($scope.user.password === undefined){
  //   alert("Enter Password"); 
  // }

  // else if($scope.user.password.length<6 || $scope.user.password.length>18){
  //   alert("Password must contain between 6-18"); 
  // }

  // else if($scope.user.name === undefined){
  //   alert("Enter Name"); 
  // }

  // else if($scope.user.email === undefined){
  //   alert("Enter Email Address"); 
  // }

  // else if($scope.user.mobile_number === undefined){
  //   alert("Enter Mobile Number"); 
  // }

  // else if($scope.user.mobile_number.length<10 || $scope.user.mobile_number.length>10){
  //   alert("Mobile number must contain 10 digits only"); 
  // }

  // else if($scope.user.address1 === undefined){
  //   alert("Enter Street 1"); 
  // }

  // else if($scope.user.address2 === undefined){
  //   alert("Enter Street 2"); 
  // }

  // else if($scope.user.city === undefined){
  //   alert("Enter City"); 
  // }

  // else if($scope.user.state === undefined){
  //   alert("Enter State"); 
  // }

  // else if($scope.user.country === undefined){
  //   alert("Enter Country"); 
  // }

  // else if($scope.user.zipcode === undefined){
  //   alert("Enter Zipcode"); 
  // }

  // else if($scope.user.zipcode.length<6 || $scope.user.zipcode.length>6){
  //   alert("Zipcode should be 6 digits only"); 
  // }

  // else if($scope.user.radius_id === undefined){
  //   alert("Enter Radius User ID"); 
  // }

  //  else if($scope.user.radius_username === undefined){
  //   alert("Enter Radius User Name"); 
  // }

  // else if($scope.user.radius_password === undefined){
  //   alert("Enter Password"); 
  // }

  // else if($scope.user.sname === undefined){
  //   alert("Select Service"); 
  // }
  
  // else if($scope.user.speed === undefined){
  //   alert("Select Speed"); 
  // }

  // else if($scope.user.start_date === null){
  //   alert("Select Start date"); 
  //   $scope.user.start_date = $filter('date')($scope.user.start_date,'MM-dd-yyyy');
  // }

  // else if($scope.user.end_date === null){
  //   alert("Select End date"); 
  //   $scope.user.end_date = $filter('date')($scope.user.end_date,'MM-dd-yyyy');
  // }

  // else if($scope.user.price === undefined){
  //   alert("Select Price"); 
  // }



  // else{

 

$.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/account/register',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.user),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
               // xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                console.log(data); // Contains the suite
            },
            error: function(error)
            {
                console.log(error);
            }
        });
  
  
}
})




.controller('CustomertechCtrl', function($scope, $ionicLoading, $ionicHistory, $state, $http) {

  $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
}; 


  var token = localStorage.getItem("token");

$scope.GetAllCustomers = function(){
  $scope.show($ionicLoading);
   $http({
    method: "GET",
    url: "http://localhost:49535/api/contact/getallnamebyrole",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
    console.log(response);
    $scope.users = response.Data;
    $scope.hide($ionicLoading);
})
}

$scope.add_outward = function(Name,Email){
  $state.go('outward');
  localStorage.setItem("Tname", Name);
  localStorage.setItem("Temail", Email);
 
}



})

.factory('GetPlanServices', function($http){

  var token = localStorage.getItem("token");
  
  return {
   
    GetAllPlans: function(){

    return  $http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getplan",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
   console.log(response);
   service = response.Data;
   return service;

});

    }
  }
})


.controller('PlanCtrl', function($scope, $ionicPopup, $ionicLoading, GetPlanServices, $ionicHistory, $state, $http) {

var token = localStorage.getItem("token");


// GetPlanServices.GetAllPlans().then(function(service) {
//     console.log(service);
//      $scope.hide($ionicLoading);
//       $scope.service = service.data.Data;
//  })

 $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

$scope.GetAllPlans = function(){
  $scope.show($ionicLoading);
     
$http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getplan",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
   console.log(response);
   $scope.hide($ionicLoading);
   $scope.service = response.Data;
})
}


$scope.Delete_Plan = function(Id) {

$scope.delete_data = {  
                "Data":{
                         "Id": Id
                       } 
              };
   var confirmPopup = $ionicPopup.confirm({
    
     template: 'Are you sure you want to delete plan?'
   });

   confirmPopup.then(function(res) {
     if(res) {

      $scope.show($ionicLoading);
       $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/plan/removeplan',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.delete_data),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                 xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
              
            
                $http({
                    method: "GET",
                    url: "http://localhost:49535/api/plan/getplan",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded',
                              'Authorization': token}
                }).success(function (response) {
                   $scope.hide($ionicLoading);
                   alert('Plan Deleted');  
                   $scope.service = response.Data;

                })
              // Contains the suite
            },
            error: function(error)
            {
                console.log(error);
            }
        });
  
     } else {
       console.log('You are not sure');
     }
   });
 }


 $scope.edit_plan = function(Id){
   
    $scope.show($ionicLoading);
    $http({
        method: "GET",
        url: "http://localhost:49535/api/plan/getplanbyid?planId="+Id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': token}
    }).success(function (response) {
       
        $scope.edit_service = response.Data;
        localStorage.setItem("Id", response.Data.Id);
        localStorage.setItem("PlanName", response.Data.Name);
        localStorage.setItem("Speed", response.Data.Speed);
        localStorage.setItem("Duration", response.Data.Duration);
        localStorage.setItem("Price", response.Data.Price);
        localStorage.setItem("RadiusId", response.Data.RadiusPlanId);
        $scope.hide($ionicLoading);
        $state.go("edit_plan");

    })

}
   $scope.Id = localStorage.getItem("Id"); 
   $scope.PlanName = localStorage.getItem("PlanName");
   $scope.Speed = localStorage.getItem("Speed");
   $scope.Duration = localStorage.getItem("Duration");
   $scope.Price = parseInt(localStorage.getItem("Price"));
   $scope.RadiusId = parseInt(localStorage.getItem("RadiusId"));

  $scope.new_plan = function(){
    $state.go("add_plan");
  }

   $scope.login = function(){
    $state.go("login");
  }

   $scope.back_list_plan = function(){
      $state.go("app.list_plan");
    }

  $scope.Plan = {};
  $scope.add_new_plan = function(){
      if($scope.Plan.Data.Name===undefined){

        alert("Enter Name");

      }

      else if($scope.Plan.Data.Speed===undefined){
        alert("Enter Speed");
      }

       else if($scope.Plan.Data.Duration===undefined){
        alert("Enter Duration");
      }

       else if($scope.Plan.Data.Price===undefined){
        alert("Enter Price");
      }

      else{

        $scope.show($ionicLoading);

         $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/plan/saveplan',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.Plan),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
               xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                alert("Plan Added");
                $state.go('app.list_plan');
            },
            error: function(error)
            {
                console.log(error);
            }
        });
      }
    } 

$scope.save_edit_plan = function(Id, PlanName, Speed, Duration, Price, RadiusId){


      if(PlanName===undefined){

        alert("Enter Name");

      }

      else if(Speed===undefined){
        alert("Enter Speed");
      }

       else if(Duration===undefined){
        alert("Enter Duration");
      }

       else if(Price===undefined){
        alert("Enter Price");
      }

        else if(RadiusId===undefined){
        alert("Enter Radius Id");
      }

      else{

        $scope.show($ionicLoading);

      $scope.edit_plan_data = {
                                  "Data":{
                                    "Id": Id,
                                    "Name":PlanName,
                                    "Speed":Speed,
                                    "Duration":Duration,
                                    "Price":Price,
                                    "RadiusPlanId":RadiusId
                                  }
                              }
  

         $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/plan/saveplan',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.edit_plan_data),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                alert("Plan Updated");
                $state.go('app.list_plan');
            },
            error: function(error)
            {
                console.log(error);
            }
        });
      }
    } 

})

.controller('TestCtrl', function($scope, $state, $ionicLoading, $cordovaCamera, $cordovaFileTransfer, $http) {

 // $scope.data = { "ImageURI" :  "Select Image" };

 $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
}; 

   
    $scope.selectPicture = function() { 


    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: Camera.EncodingType.PNG
    };

    
    $cordovaCamera.getPicture(options).then(
    function(imageURI) {

    //debugger;
    window.FilePath.resolveNativePath(imageURI, function(result) {
    // onSuccess code
    imageURI = 'file://' + result;
    $scope.picData=imageURI;
    $scope.picData1=imageURI.substr(imageURI.lastIndexOf('/') + 1);
    document.getElementById("demo").innerHTML = $scope.picData1;
    localStorage.setItem("img",$scope.picData1);
    $scope.ftLoad = true;
    var fileURL = $scope.picData;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = true;
    
    var success = function (r) {
        console.log("Successful upload...");
        console.log("Code = " + r.responseCode);
        // displayFileData(fileEntry.fullPath + " (content uploaded to server)");
    }

    var fail = function (error) {
        console.log("error");
    }

   
    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
    // SERVER must be a URL that can handle the request, like
    // http://some.server.com/upload.php
    debugger;
    ft.upload(fileURL, encodeURI("http://cssent.com/demo/bk/upload.php"), success, fail, options);

  },function (error) {
    console.log("error");
  })
     
  })
}
 
})
.controller('StokelistCtrl', function($scope, $state, $ionicLoading, StorageService, $ionicModal, $cordovaCamera, $cordovaFileTransfer, $http) {


 $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

$scope.StartLoading = function(){
  $scope.show($ionicLoading);
} 

 var token = localStorage.getItem("token");   

 $http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getinventory",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
    console.log(response.Data);
    $scope.hide($ionicLoading);
    $scope.Inventory = response.Data;
})

})

.controller('PaymentCtrl', function($scope, $state, $ionicLoading, StorageService, StorageOutwardService, $ionicModal, $cordovaCamera, $cordovaFileTransfer, $http) {


$scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
}; 


var token = localStorage.getItem("token");

 $scope.goBack_Dashboard = function(){
  $state.go('app.user_dashboard');
 }

 $scope.Price = localStorage.getItem("Price");

 $scope.Pay = function(trans_type, Amount, Price){

$scope.show($ionicLoading);
var Invoice_Number = Math.floor(Math.random()*90000) + 10000;

var Ref_Number = Math.floor(Math.random()*90000) + 10000;

 $scope.Payment = {
  "Data":{
    "UserId":
    {
      "Id":localStorage.getItem("UserId")
    },
   
     "PlanId":{
      "Id":localStorage.getItem("plan_id")
    },
    
    "InvoiceNumber":Invoice_Number,

    "TotalAmount":Price,

    "TransactionType":trans_type,

    "Payment":{
      "AmountPaid":Amount,
      "PaymentRefNumber":Ref_Number
    }

    
    
   
       
    }
  };


   $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/invoice/savepayment',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data:JSON.stringify($scope.Payment),

             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                 console.log(data); // Contains the suite
                 $scope.hide($ionicLoading);
                 alert("Payment Done");
                 $state.go('app.user_dashboard');
            },
            error: function(error)
            {
                console.log(error);
            }
        });
    alert("Success"); 
  
}


})

.controller('StokeCtrl', function($scope, $state, $localStorage, $ionicLoading, StorageService, StorageOutwardService, $ionicModal, $cordovaCamera, $cordovaFileTransfer, $http) {

$scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

$scope.things = StorageService.getAll();


$scope.Inward={};
$scope.Outward={};

$scope.CheckOut = function(){
  $state.go('checkout');
}

$scope.addToCart = function (qty, price, tax, invoice_number) {

    var InventoryRefNo = Math.floor(Math.random()*90000) + 10000;
    var product_id = $scope.Inward.Data.Id;
    var variant_id = $scope.Inward.Variant.Id;
    var name = localStorage.getItem("pname");
    var vname = localStorage.getItem("vname");
    localStorage.setItem("ThingsInValue", true);
    localStorage.setItem("Buyer_InvoiceNumber", invoice_number);
    StorageService.add(product_id, variant_id, qty, price, tax, InventoryRefNo);
    StorageService.addname(name, vname, qty, price, tax, InventoryRefNo);

  };
  
  $scope.back_vendor = function(){
    $state.go('app.stoke');
  }

  $scope.Next_Inward = function(){
    $state.go('stoke1');
   
    localStorage.setItem("UserId", $scope.Inward.Vendor.UserId.Id.UserId.Id);
    localStorage.setItem("merchant_name", $scope.Inward.Vendor.UserId.Id.Name);
  }

  $scope.RemoveItem = function (index) {
    alert(index);
    StorageService.remove(index);
  };


 $scope.cart = function(){
 $state.go('scart');
} 

 $scope.back_inward = function(){
 $state.go('app.stoke');
} 
  

 $scope.p_id = function(Name){
  localStorage.setItem("pname", Name);
  
 } 

 $scope.v_id = function(Name){
  
  localStorage.setItem("vname", Name);
 
 } 

 $scope.pln_id = function(Name){
  
  localStorage.setItem("planname", Name);
 
 } 


  // $scope.remove = function (thing) {
  //   StorageService.remove(thing);
  // };




var token = localStorage.getItem("token");

 
  
 $http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getvariant",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
   //console.log(response);
    $scope.variant = response.Data;
})



$scope.GetVendors = function(){
  $scope.show($ionicLoading);
   $http({
    method: "GET",
    url: "http://localhost:49535/api/contact/getnamebyrole?roleId=3",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
    console.log(response);
    $scope.hide($ionicLoading);
    $scope.vendor = response.Data;
})
}

$scope.GetProducts = function(){
  $scope.show($ionicLoading);
   $http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getproduct",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
   //console.log(response);
   $scope.hide($ionicLoading);
    $scope.product = response.Data;
})
}
  


$http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getplan",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {

   $scope.service = response.Data;
})


$scope.InwardItmesInCart = localStorage.getItem("ThingsInValue");

$scope.img_select = function(){

    var control = document.getElementById("your-files");
   
     control.addEventListener("change", function(event) {
    // When the control has changed, there are new files
    var files = control.files;
    for (var i = 0; i < files.length; i++) {


        var sFileName = files[i].name;
        var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1];
        var dotPosition = sFileExtension.lastIndexOf(".");
        var fileExt = sFileExtension.substring(dotPosition, sFileExtension.length);
        localStorage.setItem("img_name", files[i].name);
        localStorage.setItem("img_type", files[i].type);
        localStorage.setItem("img_size", files[i].size);
        localStorage.setItem("img_ext", '.'+fileExt);
       
       
      
    }
}, false);

}     

$scope.subtotal = function(){

  var InvoiceDetails = StorageService.getAll(); 

  var i = 0;
  var Total_amount = 0;
  var Total_tax = 0;
  for (i = 0; i < InvoiceDetails.length; i++) {
    Total_amount += InvoiceDetails[i].Amount;
    Total_tax += InvoiceDetails[i].Tax;
}

$scope.Total_amount = Total_amount;
$scope.Total_tax = Total_tax;
$scope.Vendr_name = localStorage.getItem("merchant_name");

}
  

$scope.Add_inward = function(trans_type, paid_amount){

$scope.show($ionicLoading);
var Invoice_Number = Math.floor(Math.random()*90000) + 10000;
  // $scope.Inward.Data.InvoiceType = "Inward";
var InvoiceDetails = StorageService.getAll();
var InvoiceDetails1 = StorageService.getAllId(); 

var i = 0;
var Total_amount = 0;
var Total_tax = 0;
for (i = 0; i < InvoiceDetails.length; i++) {
    Total_amount += InvoiceDetails[i].Amount;
    Total_tax += InvoiceDetails[i].Tax;
}

 $scope.inwrd = {
  "Data":{
    "UserId":
    {
      "Id":localStorage.getItem("UserId")
    },
    "AddressId":{
      "Id":1
    },
    
    "InvoiceNumber":Invoice_Number,
    "BuyerInvoiceNumber": localStorage.getItem("Buyer_InvoiceNumber"),
    "InvoiceType":"Inward",
    "FileId":{
      "Name": localStorage.getItem("img_name"),
      "MimeType":localStorage.getItem("img_type"),
      "Extension":localStorage.getItem("img_ext"),
      "Size":localStorage.getItem("img_size")
    },
    "InvoiceDetails":InvoiceDetails1,
        "TotalAmount":Total_amount,
        "TotalTaxAmount":Total_tax,
        "TransactionType":trans_type,
        "Payment":{
        "AmountPaid":paid_amount,
        "PaymentRefNumber":"1a2"
    }
  }
};

 
 
  
      $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/invoice/invoice',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data:JSON.stringify($scope.inwrd),

             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                 console.log(data); // Contains the suite
                 $scope.hide($ionicLoading);
                 alert("Items Added");
                 StorageService.remove1();
                 // localStorage.RemoveItem("merchant_name");
                 localStorage.setItem("ThingsInValue", false);
                 $state.go('app.stoke');

            },
            error: function(error)
            {
                console.log(error);
            }
        });
    alert("Success"); 
  
}



})

.controller('ViewComplainCtrl', function($scope, $state, $ionicLoading, $http) {

  $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

   
   var token = localStorage.getItem("token");
   var UserId = localStorage.getItem("UserId");
$scope.GetUserComplains = function(){

  $scope.show($ionicLoading);

 $http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getcomplainbyuserid?userId="+UserId+"&roleId=1",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
    console.log(response.Data);
    $scope.ViewComplains = response.Data;
    $scope.hide($ionicLoading);
})
}

})

.controller('InventoryCtrl', function($scope, $ionicLoading, $state, $http) {

  $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
}; 


})
.controller('ViewComplainTechCtrl', function($scope, $filter, $ionicLoading, $state, $http) {

  $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
}; 

   
   var token = localStorage.getItem("token");
   var UserId = localStorage.getItem("UserId");

$scope.GetInProgressComplains = function(){

  $scope.show($ionicLoading);

 $http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getcomplainassignbyuserid?userId="+UserId+"&statusId=3",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
     console.log(response);
      if(response.Message == 'No Records'){
        $scope.error = true;
        $scope.records = false;
        $scope.hide($ionicLoading);
    }
    else{ 
    $scope.ViewComplainstech = response.Data;
    $scope.error = false;
    $scope.records = true;
    $scope.hide($ionicLoading);
  }
})
}

$scope.I_ComplainDetail = function(Id){
 
$scope.show($ionicLoading);

  
$http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getcomplainbyid?complainId="+Id,
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {

     console.log(response);

     localStorage.setItem("CustomerName", response.Data.UserId.ContactId.Name);
     localStorage.setItem("Category", response.Data.CategoryId.Name);
     localStorage.setItem("Description", response.Data.Description);
     localStorage.setItem("Img", response.Data.FileId.Name);
     localStorage.setItem("Date",$filter('date')(response.Data.Date, 'yyyy-MM-dd'));
     localStorage.setItem("Street1", response.Data.UserId.AddressId.Street1);
     localStorage.setItem("Street2", response.Data.UserId.AddressId.Street2);
     localStorage.setItem("City", response.Data.UserId.AddressId.City);
     localStorage.setItem("ZipCode", response.Data.UserId.AddressId.ZipCode);
     $state.go('TechInProgressComplainDetails');
     $scope.hide($ionicLoading);
    
  })
}



$scope.ComplainId = localStorage.getItem("ComplainId");
$scope.CustomerName = localStorage.getItem("CustomerName");
$scope.Category = localStorage.getItem("Category");
$scope.Description = localStorage.getItem("Description");
$scope.Image = localStorage.getItem("Img");
$scope.Date = localStorage.getItem("Date");
$scope.Street1 = localStorage.getItem("Street1");
$scope.Street2 = localStorage.getItem("Street2");
$scope.City = localStorage.getItem("City");
$scope.ZipCode =  localStorage.getItem("ZipCode");



 $scope.update_status_complete = function(Id){

$scope.show($ionicLoading);  

$scope.AssignComplainData = {
                                "Data":{
                                        "Id":Id,
                                        "StatusId":{
                                          "Id":4
                                        }
                                      }
                                    }


 
$.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/complain/savetechcomplain',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.AssignComplainData),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                
                $scope.hide($ionicLoading);
                alert('Status Updated');
                $state.go('app.viewcomplaintech');
            },
            error: function(error)
            {
                console.log(error);
            }
        });
}

$scope.GoToInprogreeeComplains = function(){
  $state.go('app.viewComplainstech');
}


})



.controller('PendingComplainCtrl', function($scope, $ionicLoading, $location, $filter, $state, $cordovaFile, $http, $ionicHistory, $cordovaCamera, $cordovaFileTransfer, $ionicModal, $timeout) {
 
 $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

 $ionicModal.fromTemplateUrl('modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

var token = localStorage.getItem("token");
$scope.Pending = function(){

 $scope.show($ionicLoading); 
 $http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getcomplainbystatusid?StatusId=1",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}

}).success(function (response) {
     if(response.Message == 'No Records'){
        $scope.error = true;
        $scope.hide($ionicLoading);
        $scope.records = false;
    }
    else{ 
    $scope.PendingComplains = response.Data;
    $scope.hide($ionicLoading);
    $scope.error = false;
    $scope.records = true;
  }
})

}

$scope.goBack = function(){
     $ionicHistory.goBack();
}

$scope.InProgress = function(){
  $scope.show($ionicLoading); 
  $http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getcomplainbystatusid?StatusId=3",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
   
    if(response.Message == 'No Records'){
        $scope.error = true;
        $scope.hide($ionicLoading);
        $scope.records = false;
    }
    else{ 
    $scope.InprogressComplains = response.Data;
    $scope.hide($ionicLoading);
    $scope.error = false;
    $scope.records = true;
  }
})
}

$scope.Complete = function(){
  $scope.show($ionicLoading); 
  $http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getcomplainbystatusid?StatusId=4",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
     if(response.Message == 'No Records'){
        $scope.error = true;
        $scope.hide($ionicLoading); 
        $scope.records = false;
    }
    else{ 
    $scope.CompleteComplains = response.Data;
    $scope.hide($ionicLoading); 
    $scope.error = false;
    $scope.records = true;
  }
  
})
}

$scope.FinalComplete = function(){
  $scope.show($ionicLoading); 
 $http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getcomplainbystatusid?StatusId=5",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
     if(response.Message == 'No Records'){
        $scope.error = true;
        $scope.hide($ionicLoading); 
        $scope.records = false;
    }
    else{ 
    $scope.FinalCompleteComplains = response.Data;
    $scope.hide($ionicLoading); 
    $scope.error = false;
    $scope.records = true;
  }
})
}


$scope.Update_Status = function(ComplainId, statusId){

 
  if(statusId == 'In Progress'){
    var Status_Id = 3;
  }

  if(statusId == 'Complete'){
    var Status_Id = 4;
  }

  if(statusId == 'Final Complete'){
    var Status_Id = 5;
  }

   $scope.show($ionicLoading); 

 $scope.AssignComplainData = {
                                "Data":{
                                        "Id":ComplainId,
                                        "StatusId":{
                                          "Id":Status_Id
                                        }
                                      }
                            }


 
$.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/complain/savetechcomplain',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.AssignComplainData),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                $ionicHistory.goBack();
            },
            error: function(error)
            {
                console.log(error);
            }
        });
}

$scope.P_ComplainDetail = function(Id){
$scope.show($ionicLoading);
var r = $location.path();
  
$http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getcomplainbyid?complainId="+Id,
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {

     console.log(response);

     localStorage.setItem("CustomerName", response.Data.UserId.ContactId.Name);
     localStorage.setItem("Category", response.Data.CategoryId.Name);
     localStorage.setItem("Description", response.Data.Description);
     localStorage.setItem("Img", response.Data.FileId.Name);
     localStorage.setItem("Date",$filter('date')(response.Data.Date, 'yyyy-MM-dd'));
     localStorage.setItem("Street1", response.Data.UserId.AddressId.Street1);
     localStorage.setItem("Street2", response.Data.UserId.AddressId.Street2);
     localStorage.setItem("City", response.Data.UserId.AddressId.City);
     localStorage.setItem("ZipCode", response.Data.UserId.AddressId.ZipCode);
     $state.go('PendingComplainDetails');
     $scope.hide($ionicLoading);
     localStorage.setItem("r",r);
  })
}



$scope.ComplainId = localStorage.getItem("ComplainId");
$scope.CustomerName = localStorage.getItem("CustomerName");
$scope.Category = localStorage.getItem("Category");
$scope.Description = localStorage.getItem("Description");
$scope.Image = localStorage.getItem("Img");
$scope.Date = localStorage.getItem("Date");
$scope.Street1 = localStorage.getItem("Street1");
$scope.Street2 = localStorage.getItem("Street2");
$scope.City = localStorage.getItem("City");
$scope.ZipCode =  localStorage.getItem("ZipCode");
if(localStorage.getItem("r") == '/app/final_complete_complain'){
   $scope.StatusBox = true;
   $scope.ButtonBox = true;
}


})

.controller('ComplainCtrl', function($scope, $ionicLoading, $filter, $cordovaFile, $http, $cordovaCamera, $cordovaFileTransfer, $ionicModal, $timeout) {
$scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

 
 var token = localStorage.getItem("token");
$scope.GetComplainDropDown = function() {

 $scope.show($ionicLoading);

   $http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getcategory",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}

}).success(function (response) {
    console.log(response);
    $scope.catagory = response.Data;
    $scope.hide($ionicLoading);
})

   $http({
    method: "GET",
    url: "http://localhost:49535/api/complain/getstatus",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
    console.log(response);
    $scope.status = response.Data;
})

}

 $scope.selectPicture = function() { 


    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: Camera.EncodingType.PNG
    };

    
    $cordovaCamera.getPicture(options).then(
    function(imageURI) {

    window.FilePath.resolveNativePath(imageURI, function(result) {
    // onSuccess code
    imageURI = 'file://' + result;
    console.log(imageURI);
   
    $scope.picData=imageURI;
    $scope.picData1=imageURI.substr(imageURI.lastIndexOf('/') + 1);
    document.getElementById("demo").innerHTML = $scope.picData1;
    var sFileExtension = $scope.picData1.split('.')[$scope.picData1.split('.').length - 1];
    localStorage.setItem("img_name",$scope.picData1);
    localStorage.setItem("img_ext",'.'+sFileExtension);
    $scope.ftLoad = true;
    var fileURL = $scope.picData;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = true;
    
    var success = function (r) {
      localStorage.setItem("img_size",r.bytesSent);
        console.log("Successful upload...");
        console.log("Code = " + r.responseCode);
        // displayFileData(fileEntry.fullPath + " (content uploaded to server)");
    }

    var fail = function (error) {
        console.log("error");
    }

   
    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
    // SERVER must be a URL that can handle the request, like
    // http://some.server.com/upload.php
  
    ft.upload(fileURL, encodeURI("http://cssent.com/demo/bk/upload.php"), success, fail, options);

  },function (error) {
    console.log("error");
  })
     
  })
}


$scope.img_select = function(){
    var control = document.getElementById("complain-files");
    console.log(control);
   
     control.addEventListener("change", function(event) {
    // When the control has changed, there are new files
    var files = control.files;
    for (var i = 0; i < files.length; i++) {
       
        var sFileName = files[i].name;
        var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1];
        var dotPosition = sFileExtension.lastIndexOf(".");
        var fileExt = sFileExtension.substring(dotPosition, sFileExtension.length);
        localStorage.setItem("img_name", files[i].name);
        localStorage.setItem("img_type", files[i].type);
        localStorage.setItem("img_size", files[i].size);
        localStorage.setItem("img_ext", '.'+fileExt);
      
    }
}, false);
}

$scope.ComplainData = {}; 


$scope.complain = function(name){



$scope.show($ionicLoading);

var ComplainDate = $filter('date')(new Date(), 'yyyy-MM-dd'); 
var img_ext = localStorage.getItem("img_ext");
if(img_ext == '.png'){
  var img_type = 'image/png'
}

else{
   var img_type = 'image/jpeg'
}

alert(img_type)
$scope.complain = 
{
  "Data" :{
    "UserId":{
               "Id":localStorage.getItem("UserId")
             },
    "UserPlanMapId":{
      "Id":localStorage.getItem("UserPlanMapId")
    },
    "CategoryId":{
      "Id":name.Id
    },
    "Description":$scope.ComplainData.Description,
    "FileId":{
      "Name":localStorage.getItem("img_name"),
      "MimeType":img_type,

    "Extension":localStorage.getItem("img_ext"),
     "Size":localStorage.getItem("img_size")    },
    "StatusId":{
      "Id": 1
    },
    "Date":ComplainDate
  }
}

console.log($scope.complain);

  $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/complain/savecomplain',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.complain),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
               xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                alert("Complete Submitted Successfully");
                $scope.name="";
                $scope.ComplainData.Description="";
            },
            error: function(error)
            {
                console.log(error);
            }
        });



}

  $scope.Catagory = {};
  $scope.Add_Category = function(){

    $scope.show($ionicLoading);
   
    // if($scope.Catagory.Data.Name === undefined){
    //   alert("Enter Name of Catagory"); 
    // } 
    // else{

      // console.log($scope.Catagory);
     
      $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/complain/savecategory',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.Catagory),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
               xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                alert('Category added Successfully');
            },
            error: function(error)
            {
                console.log(error);
            }
        });
    // }
  }
})

.controller('StatusCtrl', function($scope, $state, $ionicLoading, $ionicModal, $timeout) {

  $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};

 
   var token = localStorage.getItem("token");
  $scope.AddStatus = function(Name){
   
    if(Name === undefined){
      alert("Enter Status"); 
    } 
    else{

      $scope.show($ionicLoading);

      $scope.StatusData = {
                          "Data":
                                {
                                  "Name":Name
                                }
                          }

      $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/complain/savestatus',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.StatusData),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                 $scope.hide($ionicLoading);
                alert("Status Added Successfully"); // Contains the suite
            },
            error: function(error)
            {
                console.log(error);
            }
        }); 
    }
  }
})

.controller('OutwardCtrl', function($scope, $localStorage, StorageOutwardService, $ionicLoading, $ionicModal, $state, $http, $timeout) {


  $scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
}; 


  var token = localStorage.getItem("token");

$scope.t_cart = function(){
  $state.go('tcart');
}  
$scope.GetProduct_Variant_Service = function(){

  $scope.show($ionicLoading);
  $http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getproduct",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
    console.log(response);
    $scope.product = response.Data;
})

 $http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getplan",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {

    $scope.service = response.Data;
})

  
 $http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getvariant",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
   //console.log(response);
    $scope.variant = response.Data;
    $scope.hide($ionicLoading);
})

}

$scope.Tname = localStorage.getItem("Tname");
$scope.Temail = localStorage.getItem("Temail");

 $scope.RemoveItem1 = function (index) {
    alert(index);
    StorageOutwardService.remove(index);
  };

  $scope.back_outward = function(){
  $state.go('app.customer_list_tech');
  }

  $scope.Outward={};

  $scope.thingsout = StorageOutwardService.getAll();
 

  $scope.ItmesInCart = localStorage.getItem("ThingsOutValue");
 
  $scope.addToCart1 = function (qty) {

    localStorage.setItem("ThingsOutValue", true);
    var product_id = $scope.Outward.Data.Id;
    var variant_id = $scope.Outward.Variant.Id;
    var plan_id = $scope.Outward.Plan.Id;
    localStorage.setItem("plan_id", plan_id);
    var name = localStorage.getItem("pname");
    var vname = localStorage.getItem("vname");
    var planname = localStorage.getItem("planname");
    StorageOutwardService.add(product_id, variant_id, qty);
    StorageOutwardService.addname(name, vname, qty);

  };  

 $scope.p_id = function(Name){
  localStorage.setItem("pname", Name);
  
 } 

 $scope.v_id = function(Name){
  
  localStorage.setItem("vname", Name);
 
 } 

 $scope.pln_id = function(Name){
  
  localStorage.setItem("planname", Name);
 
 }

 $scope.PlanName = localStorage.getItem("planname"); 


$scope.Add_outward = function(){

$scope.show($ionicLoading);
var Invoice_Number = Math.floor(Math.random()*90000) + 10000;
  // $scope.Inward.Data.InvoiceType = "Inward";

var InvoiceDetails1 = StorageOutwardService.getAllId(); 


 $scope.outward = {
  "Data":{
    "UserId":
    {
      "Id":localStorage.getItem("UserId")
    },
    "AddressId":{
      "Id":localStorage.getItem("AddressId")
    },

     "PlanId":{
      "Id":localStorage.getItem("plan_id")
    },
    
    "InvoiceNumber":Invoice_Number,
    "InvoiceType":"Outward",
    
    "InvoiceDetails":InvoiceDetails1
       
    }
  };


 
  console.log($scope.outward);

      $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/invoice/invoice',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data:JSON.stringify($scope.outward),

             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                 console.log(data); // Contains the suite
                 $scope.hide($ionicLoading);
                 alert("Items Added");
                 localStorage.RemoveItem("planname");
                 localStorage.RemoveItem("Tname");
                 localStorage.RemoveItem("Temail");
                 StorageOutwardService.remove1();
                 localStorage.setItem("ThingsOutValue", false);
                 $state.go('app.customer_list_tech');
            },
            error: function(error)
            {
                console.log(error);
            }
        });
    alert("Success"); 
  
}

})

.controller('VariantCtrl', function($scope, $state, $ionicLoading, $http, $timeout) {


$scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};



  var token = localStorage.getItem("token");

 $scope.GetProducts_GetServices = function(){ 

  $scope.show($ionicLoading);

  $http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getproduct",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': token}
}).success(function (response) {
    console.log(response);
    $scope.product = response.Data;
})


  $http({
    method: "GET",
    url: "http://localhost:49535/api/plan/getplan",
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token}
}).success(function (response) {
    $scope.hide($ionicLoading);
    $scope.service = response.Data;
})

 

}

  $scope.Variant = {};

  $scope.isChacked = function(chacked){

        if(chacked==true){
         $scope.showplan = true;
         $scope.Variant.Data.IsPlanSpecific=true;
        }
        else{
          $scope.showplan = false;
          $scope.Variant.Data.IsPlanSpecific=false;
        }
  } 







  $scope.Add_variant = function(){
  
  $scope.show($ionicLoading);

      $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/plan/savevariant',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.Variant),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                // console.log(data); // Contains the suite
                $scope.hide($ionicLoading);
                alert('Variant Added Successfully');
            },
            error: function(error)
            {
                console.log(error);
            }
        });
    alert("Success"); 
  
}
})

.controller('ProductCtrl', function($scope, $ionicLoading, $ionicModal, $timeout) {

$scope.show = function(){
  
    $ionicLoading.show({
      template: ' <ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 400,
      showDelay: 0
    });
  };
 

$scope.hide = function(){
$ionicLoading.hide();
};


  var token = localStorage.getItem("token");

  $scope.product={};

  $scope.Add_product = function(){

  if($scope.product.Data.Name === undefined){
    alert("Enter Product Name"); 
  } 
  else if($scope.product.Data.UnitOfMeasure === undefined){
    alert("Enter Unit of Measure for Product"); 
  }
  else{

     $scope.show($ionicLoading);
    $.ajax(
        { 
            type: 'POST',
            url: 'http://localhost:49535/api/plan/saveproduct',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify($scope.product),
             beforeSend: function(xhr)
            {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", token);
            },
            success: function(data, status)
            {
                // console.log(data); // Contains the suite
                 $scope.hide($ionicLoading);
                 alert('Product Added Successfully');
            },
            error: function(error)
            {
                console.log(error);
            }
        });
    alert("Success"); 
  }
}
});
