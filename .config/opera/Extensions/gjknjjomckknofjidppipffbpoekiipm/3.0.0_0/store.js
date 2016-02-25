'use strict';

module.exports = { store: {
    set: function set(key, value) {
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }

      localStorage.setItem(key, value);
    },

    get: function get(key) {
      var result = localStorage.getItem(key);

      try {
        result = JSON.parse(result);
      } catch (e) {}

      if (!isNaN(parseFloat(result))) {
        result = parseFloat(result);
      }

      if (result === 'false') result = false;
      if (result === 'true') result = true;

      return result;
    }
  } };
