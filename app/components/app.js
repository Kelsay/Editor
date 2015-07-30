'use strict';
// The Main Application module

var app = angular.module('ClauseMatch', ['ngAnimate', 'ui.router', 'contenteditable', 'dndLists'])

// Default UI State
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state("home", {
        url: "",
        templateUrl: "build/templates/home.html"
    });
}]);