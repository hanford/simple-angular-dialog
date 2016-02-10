var angular = require('angular')

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
