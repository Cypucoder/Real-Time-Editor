//https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating

var app = angular.module('myApp', []);

app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    },
      removeAllListeners: function (eventName, callback) {
          socket.removeAllListeners(eventName, function() {
              var args = arguments;
              $rootScope.$apply(function () {
                callback.apply(socket, args);
              });
          }); 
      }
  };
});


//defines the rules and data available to the web page
//more efficient use of the server
app.controller('data_get', function($scope, $http, socket){
    var l = console.log
    function getEl(id) {
        return document.getElementById(id)
    }
    var editor = getEl("editor")
    editor.addEventListener("keyup", function(evt) {
        var text = editor.value
        socket.emit('message', text)
    })
    socket.on('message', function(data) {
        editor.value = data
    })
});