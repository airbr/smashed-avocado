(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }
  CheckList.prototype.addRow = function(smashedavoOrder) {
    // remove any existing rows that match the email address
    this.removeRow(smashedavoOrder.email);
    // create a new instance of a row, using the smashedavo order info
    var rowElement = new Row(smashedavoOrder);
    // add the new row instance's $element property to the checklist
    this.$element.append(rowElement.$element);
  };
  CheckList.prototype.removeRow = function(email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-smashedavo-order="checkbox"]')
      .empty();
  };
  CheckList.prototype.addClickHandler = function(prototype) {

    this.$element.on('click', 'input', function(event) {
      // Why not preventDefault here?
      // Because it would prevent the item from being checked.
      prototype(event.target.value)
                                    .then(function() {
                                      this.removeRow(event.target.value);
                                    }.bind(this));
      // yep. need `.bind` after this one, otherwise
      // jQuery sets `this` to the `input` and not the instance of `CheckList`
    }.bind(this));
  };

  function Row(smashedavoOrder) {
    var $div = $('<div/>', {
      'data-smashedavo-order': 'checkbox',
      class: 'checkbox'
    });

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: smashedavoOrder.email
    });

    // Process string for description
    var description = smashedavoOrder.size + ' portion, ';
    if (smashedavoOrder.flavor) {
      description += smashedavoOrder.flavor + ', ';
    }
    description += smashedavoOrder.name + ', ';
    description += ' (' + smashedavoOrder.email + ')';
    description += ' [' + smashedavoOrder.strength + 'x Paleos!!]';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
