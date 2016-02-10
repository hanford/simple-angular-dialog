var extend = require('xtend')
var angular = require('angular')

module.exports = angular
  .module('simple-angular-dialog', [])
  .factory('dialog', ngDialog)
  .name

ngDialog.$inject = [
  '$document',
  '$compile',
  '$rootScope',
  '$controller',
  '$timeout',
  '$q'
]

function ngDialog ($document, $compile, $rootScope, $controller, $timeout, $q) {
  var defaults = {
    template: null,
    controller: null,
    escapeKey: true,
    locals: {}
  }

  var body = $document.find('body')
  var modal
  var deferred

  return {
    show: show,
    cancel: cancel,
    submit: submit,
    confirm: confirm
  }

  function submit (data) {
    if (!deferred) return

    if (modal) {
      modal.remove()
    }

    return deferred.resolve(data)
  }

  function cancel () {
    if (!deferred) return

    if (modal) {
      modal.remove()
    }

    return deferred.reject('Canceled')
  }

  function confirm (text) {
    deferred = $q.defer()

    var confirmModal = angular.element(
        '<div class="dialog-container">' +
         '<div class="dialog" id="confirm">' +
           '<div class="dialog-body text-center" style="min-width:250px;min-height:50px;display:flex;display:-webkit-flex;align-items:center;justify-content:center;align-items:center;">' +
             '<div style="display:flex;display:-webkit-flex;">' + text + '</div>' +
           '</div>' +
           '<div class="dialog-footer">' +
             '<button class="button" ng-click="decline()">Cancel</button>' +
             '<button class="button" ng-click="accept()">Submit</button>' +
           '</div>' +
         '</div>' +
       '</div>'
    )

    var scope = $rootScope.$new()

    scope.decline = function () {
      confirmModal.remove()
      return deferred.reject()
    }

    scope.accept = function () {
      confirmModal.remove()
      return deferred.resolve()
    }

    $compile(confirmModal)(scope)

    // Attach compiled modal to DOM
    body.append(confirmModal)

    $timeout(function () {
      $timeout(function () {
        document.querySelector('#confirm').classList.add('show-dialog')
      }, 200)
      confirmModal.addClass('fadeIn')
    }, 0)

    return deferred.promise
  }

  function show (options) {
    deferred = $q.defer()

    options = extend({}, defaults, options)

    modal = angular.element('<div class="dialog-container"><div class="dialog">' + options.template + '</div></div>')

    var keyDown = function (event) {
      if (event.keyCode === 27) {
        closeFn()
      }
    }

    var closeFn = function () {
      body.unbind('keydown', keyDown)
      modal.remove()
    }

    if (options.escapeKey !== false) {
      body.bind('keydown', keyDown)
    }

    var ctrl
    var locals
    var scope = $rootScope.$new()

    if (options.controller) {
      locals = extend({$scope: scope}, options.locals)
      ctrl = $controller(options.controller, locals)

      // controllerAs?
      if (options.controllerAs) {
        scope[options.controllerAs] = ctrl
      }

      // ngControllerController is not a typo -___-
      modal.contents().data('$ngControllerController', ctrl)
    }

    $compile(modal)(scope)

    // Attach compiled modal to DOM
    body.append(modal)

    $timeout(function () {
      $timeout(function () {
        document.querySelector('.dialog').classList.add('show-dialog')
      }, 200)
      modal.addClass('fadeIn')
    }, 0)

    return deferred.promise
  }
}
