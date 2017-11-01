// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'ngStorage', 'ngCordova', 'ngJsonExportExcel'])

.run(function($ionicPlatform, $timeout, $cordovaToast, $cordovaAdMob) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        function wait(ms) {
            var start = new Date().getTime();
            var end = start;
            while (end < start + ms) {
                end = new Date().getTime();
            }
        }

        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                $cordovaToast.show('No Internet Connection', 'long', 'center');
                wait(2000);
                ionic.Platform.exitApp();

            }
        }

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        onDeviceReady();


        // var adMobPosition = {
        //     BOTTOM_CENTER: 8
        // };

        var options = {
            interstitialAdId: 'ca-app-pub-8235065863815935/7005695207',
            autoShow: true
        };


        // try {


        //     $cordovaAdMob.createInterstitialView(options, function() {
        //             admob.requestInterstitialAd({
        //                     'isTesting': true
        //                 },
        //                 function() {


        //                     admob.showAd(true);
        //                     console.log('Show Interstitial Ad');
        //                 },
        //                 function(error) {
        //                     console.log('failed to request ad ' + error);
        //                 }
        //             );
        //         },
        //         function() {
        //             console.log('failed to create Interstitial view');
        //         });

        // } catch (e) {

        //     console.log("ALAS");
        // }


    });


})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('login', {
        cache: 'false',
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'AppCtrl'
    })


    .state('forgot_password', {
        cache: 'false',
        url: '/forgot_password',
        templateUrl: 'templates/forgot_password.html',
        controller: 'AppCtrl'
    })


    .state('reset_password', {
        cache: 'false',
        url: '/reset_password',
        templateUrl: 'templates/reset_password.html',
        controller: 'AppCtrl'
    })

    .state('fccomplain', {
        cache: 'false',
        url: '/fccomplain',
        templateUrl: 'templates/fccomplain.html',
        controller: 'NotificationCtrl'
    })

    .state('ccomplain', {
        cache: 'false',
        url: '/ccomplain',
        templateUrl: 'templates/ccomplain.html',
        controller: 'NotificationCtrl'
    })

    .state('pcomplain', {
        cache: 'false',
        url: '/pcomplain',
        templateUrl: 'templates/pcomplain.html',
        controller: 'NotificationCtrl'
    })

    .state('dpayment', {
        cache: 'false',
        url: '/dpayment',
        templateUrl: 'templates/dpayment.html',
        controller: 'NotificationCtrl'
    })

    .state('ppayment', {
        cache: 'false',
        url: '/ppayment',
        templateUrl: 'templates/ppayment.html',
        controller: 'NotificationCtrl'
    })

    .state('odpayment', {
        cache: 'false',
        url: '/odpayment',
        templateUrl: 'templates/odpayment.html',
        controller: 'NotificationCtrl'
    })

    .state('nconnection', {
        cache: 'false',
        url: '/nconnection',
        templateUrl: 'templates/nconnection.html',
        controller: 'NotificationCtrl'
    })

    .state('cconnection', {
        cache: 'false',
        url: '/cconnection',
        templateUrl: 'templates/cconnection.html',
        controller: 'NotificationCtrl'
    })

    .state('gconnection', {
        cache: 'false',
        url: '/gconnection',
        templateUrl: 'templates/gconnection.html',
        controller: 'NotificationCtrl'
    })

    .state('onlinepayment', {
        cache: 'false',
        url: '/onlinepayment',
        templateUrl: 'templates/onlinepayment.html',
        controller: 'OnlinePaymentCtrl'
    })

    .state('add_users', {
        cache: 'false',
        url: '/add_users',
        templateUrl: 'templates/add_users.html',
        controller: 'AdminCtrl'
    })

    .state('add_customer', {
        cache: 'false',
        url: '/add_customer',
        templateUrl: 'templates/add_customer.html',
        controller: 'AdminCtrl'
    })


    .state('cart', {
        cache: 'false',
        url: '/cart',
        templateUrl: 'templates/cart.html',
        controller: 'StockCtrl'
    })

    .state('add_plan', {
        cache: 'false',
        url: '/add_plan',
        templateUrl: 'templates/add_plan.html',
        controller: 'PlanCtrl'
    })

    .state('homepage', {
        cache: 'false',
        url: '/homepage',
        templateUrl: 'templates/homepage.html',
        controller: 'PlanCtrl'
    })

    .state('outward', {
        cache: 'false',
        url: '/outward',
        templateUrl: 'templates/outward.html',
        controller: 'OutwardCtrl'
    })


    .state('edit_plan', {
        cache: 'false',
        url: '/edit_plan',
        templateUrl: 'templates/edit_plan.html',
        controller: 'PlanCtrl'
    })

    .state('edit_profile', {
        cache: 'false',
        url: '/edit_profile',
        templateUrl: 'templates/edit_profile.html',
        controller: 'AdminCtrl'
    })

    .state('PendingComplainDetails', {
        cache: 'false',
        url: '/PendingComplainDetails',
        templateUrl: 'templates/PendingComplainDetails.html',
        controller: 'PendingComplainCtrl'
    })

    .state('AdminEditProfile', {
        cache: 'false',
        url: '/AdminEditProfile',
        templateUrl: 'templates/AdminEditProfile.html',
        controller: 'AdminCtrl'
    })

    .state('ComplainDetail', {
        cache: 'false',
        url: '/ComplainDetail',
        templateUrl: 'templates/ComplainDetail.html',
        controller: 'NotificationCtrl'
    })

    .state('PaymentDetail', {
        cache: 'false',
        url: '/PaymentDetail',
        templateUrl: 'templates/PaymentDetail.html',
        controller: 'PaymentDetailCtrl'
    })

    .state('planchange_detail', {
        cache: 'false',
        url: '/planchange_detail',
        templateUrl: 'templates/planchange_detail.html',
        controller: 'PlanChangeCtrl'
    })

    .state('planchange_pending_detail', {
        cache: 'false',
        url: '/planchange_pending_detail',
        templateUrl: 'templates/planchange_pending_detail.html',
        controller: 'PlanChangePendingCtrl'
    })


    .state('Tech_Complain_Detail', {
        cache: 'false',
        url: '/Tech_Complain_Detail',
        templateUrl: 'templates/Tech_Complain_Detail.html',
        controller: 'TechNotificationCtrl'
    })

    .state('Payment', {
        cache: 'false',
        url: '/Payment',
        templateUrl: 'templates/Payment.html',
        controller: 'PaymentCtrl'
    })

    .state('InvoiceDetail', {
        cache: 'false',
        url: '/InvoiceDetail',
        templateUrl: 'templates/InvoiceDetail.html',
        controller: 'ReportsCtrl'
    })

    .state('scart', {
        cache: 'false',
        url: '/scart',
        templateUrl: 'templates/scart.html',
        controller: 'StockCtrl'
    })


    .state('checkout', {
        cache: 'false',
        url: '/checkout',
        templateUrl: 'templates/checkout.html',
        controller: 'StockCtrl'
    })


    .state('stock1', {
        cache: 'false',
        url: '/stock1',
        templateUrl: 'templates/stock1.html',
        controller: 'StockCtrl'
    })

    .state('TechInProgressComplainDetails', {
        cache: 'false',
        url: '/TechInProgressComplainDetails',
        templateUrl: 'templates/TechInProgressComplainDetails.html',
        controller: 'ViewComplainTechCtrl'
    })

    .state('admin_list', {
        cache: 'false',
        url: '/admin_list',
        templateUrl: 'templates/admin_list.html',
        controller: 'AdminCtrl'
    })


    .state('customer_list', {
        cache: 'false',
        url: '/customer_list',
        templateUrl: 'templates/customer_list.html',
        controller: 'CustomerListCtrl'
    })

    .state('tech_list', {
        cache: 'false',
        url: '/tech_list',
        templateUrl: 'templates/tech_list.html',
        controller: 'TechListCtrl'
    })


    .state('vendor_list', {
        cache: 'false',
        url: '/vendor_list',
        templateUrl: 'templates/vendor_list.html',
        controller: 'VendorlistCtrl'
    })


    .state('tcart', {
        cache: 'false',
        url: '/tcart',
        templateUrl: 'templates/tcart.html',
        controller: 'OutwardCtrl'
    })

    .state('pending_complain', {
        cache: 'false',
        url: '/pending_complain',
        templateUrl: 'templates/pending_complain.html',
        controller: 'PendingComplainCtrl'
    })

    .state('inprogress_complain', {
        cache: 'false',
        url: '/inprogress_complain',
        templateUrl: 'templates/inprogress_complain.html',
        controller: 'PendingComplainCtrl'
    })

    .state('complete_complain', {
        cache: 'false',
        url: '/complete_complain',
        templateUrl: 'templates/complete_complain.html',
        controller: 'PendingComplainCtrl'
    })

    .state('final_complete_complain', {
        cache: 'false',
        url: '/final_complete_complain',
        templateUrl: 'templates/final_complete_complain.html',
        controller: 'PendingComplainCtrl'
    })

    .state('pending_payment', {
        cache: 'false',
        url: '/pending_payment',
        templateUrl: 'templates/pending_payment.html',
        controller: 'PendingPaymentCtrl'
    })

    .state('complete_payment', {
        cache: 'false',
        url: '/complete_payment',
        templateUrl: 'templates/complete_payment.html',
        controller: 'CompletePaymentCtrl'
    })

    .state('user_pending_payment', {
        cache: 'false',
        url: '/user_pending_payment',
        templateUrl: 'templates/user_pending_payment.html',
        controller: 'UserPaymentHistoryCtrl'
    })

    .state('user_complete_payment', {
        cache: 'false',
        url: '/user_complete_payment',
        templateUrl: 'templates/user_complete_payment.html',
        controller: 'UserPaymentHistoryCtrl'
    })





    .state('app', {
        url: '/app',
        cache: 'false',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })


    .state('app.stock', {
        url: '/stock',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/stock.html',
                controller: 'StockCtrl'
            }
        }
    })


    .state('app.pending_plan_list', {
        url: '/pending_plan_list',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/pending_plan_list.html',
                controller: 'PlanChangePendingCtrl'
            }
        }
    })



    .state('app.viewcomplain', {
        url: '/viewcomplain',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/viewcomplain.html',
                controller: 'ViewComplainCtrl'
            }
        }
    })

    .state('app.viewcomplaintech', {
        url: '/viewcomplaintech',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/viewcomplaintech.html',
                controller: 'ViewComplainTechCtrl'
            }
        }
    })


    .state('app.assets_list', {
        url: '/assets_list',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/assets_list.html',
                controller: 'InventoryCtrl'
            }
        }
    })

    .state('app.reports', {
        url: '/reports',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/reports.html',
                controller: 'ReportsCtrl'
            }
        }
    })



    .state('app.stock_list', {
        url: '/stock_list',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/stock_list.html',
                controller: 'StocklistCtrl'
            }
        }
    })


    .state('app.user_dashboard', {
        url: '/user_dashboard',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/user_dashboard.html',
                controller: 'UserdashboardCtrl'
            }
        }
    })

    .state('app.superadmin_notification', {
        url: '/superadmin_notification',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/superadmin_notification.html',
                controller: 'NotificationCtrl'
            }
        }
    })




    .state('app.tech_notification', {
        url: '/tech_notification',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/tech_notification.html',
                controller: 'TechNotificationCtrl'
            }
        }
    })



    .state('app.product', {
        url: '/product',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/product.html',
                controller: 'ProductCtrl'
            }
        }
    })


    .state('app.complain_status', {
        url: '/complain_status',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/complain_status.html',
                controller: 'StatusCtrl'
            }
        }
    })


    .state('app.customer_list_tech', {
            url: '/customer_list_tech',
            cache: 'false',
            views: {
                'menuContent': {
                    templateUrl: 'templates/customer_list_tech.html',
                    controller: 'CustomertechCtrl'
                }
            }
        })
        .state('app.variant', {
            url: '/variant',
            cache: 'false',
            views: {
                'menuContent': {
                    templateUrl: 'templates/variant.html',
                    controller: 'VariantCtrl'
                }
            }
        })

    .state('app.complain_catagory', {
        url: '/complain_catagory',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/complain_catagory.html',
                controller: 'ComplainCtrl'
            }
        }
    })

    .state('app.complain', {
            url: '/complain',
            cache: 'false',
            views: {
                'menuContent': {
                    templateUrl: 'templates/complain.html',
                    controller: 'ComplainCtrl'
                }
            }
        })
        .state('app.admin_complain', {
            url: '/admin_complain',
            cache: 'false',
            views: {
                'menuContent': {
                    templateUrl: 'templates/admin_complain.html',
                    controller: 'adminComplainCtrl'
                }
            }
        })
        .state('app.technician_complain', {
            url: '/technician_complain',
            cache: 'false',
            views: {
                'menuContent': {
                    templateUrl: 'templates/technician_complain.html',
                    controller: 'techComplainCtrl'
                }
            }
        })
        .state('app.add_admin', {
            url: '/add_admin',
            cache: 'false',
            views: {
                'menuContent': {
                    templateUrl: 'templates/add_admin.html',
                    controller: 'techComplainCtrl'
                }
            }
        })





    .state('app.services', {
        url: '/services',
        cache: 'false',
        views: {
            'menuContent': {
                templateUrl: 'templates/services.html',
                controller: 'PlanCtrl'
            }
        }
    })

    .state('app.list_plan', {
            url: '/list_plan',
            cache: 'false',
            views: {
                'menuContent': {
                    templateUrl: 'templates/list_plan.html',
                    controller: 'PlanCtrl'
                }
            }
        })
        .state('app.test', {
            url: '/test',
            cache: 'false',
            views: {
                'menuContent': {
                    templateUrl: 'templates/test.html',
                    controller: 'TestCtrl'
                }
            }
        });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('homepage');
})

// /app/add_customer

.run(['$state', '$window',
    function($state, $window) {
        $window.addEventListener('LaunchUrl', function(event) {
            // gets page name from url
            var page = /.*:[/]{2}([^?]*)[?]?(.*)/.exec(event.detail.reset_password)[1];
            // redirects to page specified in url
            $state.go('tab.' + page, {});
        });
    }
]);

function handleOpenURL(url) {
    setTimeout(function() {
        var event = new CustomEvent('LaunchUrl', { detail: { 'url': url } });
        window.dispatchEvent(event);
    }, 0);
};