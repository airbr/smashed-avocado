(function(window) {
  'use strict';
  var App = window.App || {};

    function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
      return;
    }
    console.log(url);
    this.serverUrl = url;
  }
  RemoteDataStore.prototype.add = function(key, val) {
                                // for Firebase Database
    return $.post(this.serverUrl, JSON.stringify(val), function(serverResponse) {
      console.log(serverResponse);
    });
  };
  RemoteDataStore.prototype.getAll = function() {
    return $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
    });
  };
  RemoteDataStore.prototype.get = function(key) {
    return $.get(JSON.parse(this.serverUrl), function(serverResponse) {
      console.log(serverResponse);
    });
  };
  RemoteDataStore.prototype.remove = function(key) {
    return $.ajax(this.serverUrl + '/' + key, {
      type: 'DELETE'
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
