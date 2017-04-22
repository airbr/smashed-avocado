(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-smashedavo-order="form"]';
  var CHECKLIST_SELECTOR = '[data-smashedavo-order="checklist"]';
  var SERVER_URL = 'https://smashed-avo.firebaseio.com/api.json';

  var App = window.App;
  var Truck = App.Truck;
  // var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;

  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck('test', remoteDS);
    // TODO: Make app offline/online switching
    // var myTruck = new Truck('LocalDS', new DataStore());
    window.myTruck = myTruck;

  var checkList = new CheckList(CHECKLIST_SELECTOR);
  console.log(checkList);
  // Attaches Particular window js truck to the DOM checklist for deletes
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function(data) {
    return myTruck.createOrder.call(myTruck, data)
          .then(function() {
            checkList.addRow.call(checkList, data);
          }, function () {
              alert('Server Unreachable');
          }
      );
  });
  formHandler.addInputHandler(Validation.isValidEmail);
  myTruck.printOrders(checkList.addRow.bind(checkList));
})(window);
