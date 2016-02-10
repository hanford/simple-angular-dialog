(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null)

angular
  .module('ngDialogExample', ['simple-angular-dialog'])
  .controller('ctrl', function ($scope, dialog) {
    // Example dialog, with it's own controller and template
    $scope.showD = function () {
      dialog.show({
        template:
          '<div>' +
            '<div class="dialog-content">' +
              'Dialog with a fully custom template' +
            '</div>' +
            '<div class="dialog-footer">' +
              '<button type="button" ng-click="dialog.cancel()" class="ez-button">Cancel</button>' +
              '<button type="submit" class="ez-button primary loud" ng-click="dialog.submit({object: \'param\'})">Submit</button>' +
            '</div>' +
          '</div>',
        controller: function ($scope, dialog) {
          $scope.dialog = dialog
        }
      })
        .then(function (data) {
          console.log('success!', data)
        })
        .catch(function (err) {
          console.error('Error!', err)
        })
    }

    $scope.confirmRes = ''

    // Example confirm
    $scope.showConfirm = function (text) {
      dialog.confirm(text)
        .then(function () {
          $scope.confirmRes = 'Confirm accepted!'
        })
        .catch(function () {
          $scope.confirmRes = 'Confirm declined!'
        })
    }
  })

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
