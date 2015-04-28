import Ember from "ember";

export default Ember.View.extend({
  classNames: "field",


  fieldValue: function(k, val) { //, old_val
    var key = this.get("key");
    var key_array, obj, rt, store, association_type;

    // getter
    if (arguments.length === 1) {
      rt = this.get("item.structure_changed_data." + key) ||
           this.get("item.structure_data." + key);

      // if it's an association, look up models
      if (this.get("type").match(/^association\.\w+$/)) {
        store = this.get("controller.store");
        association_type = this.get("type").split(".").get("lastObject");

        if (association_type === "one") {
          rt = store.getById("map-item", parseInt(rt, 10));
        } else if (association_type === "many") {
          // TODO
        }
      }

      return rt;

    // setter
    } else {
      // parse values
      // number (which might be a string) -> float
      // association_model -> model.id
      if (this.get("type") === "number") {
        val = parseFloat(val);
      } else if (this.get("type").match(/^association\.\w+$/)) {
        val = val.id;
      }

      if (!this.get("item.structure_changed_data")) {
        this.set(
          "item.structure_changed_data",
          Ember.$.extend({}, this.get("item.structure_data"))
        );
      }

      key_array = key.split(".");

      obj = this.down_the_road(this, key_array, 0);
      obj[key_array[key_array.length - 1]] = val;

      return val;

    }

  }.property(),


  down_the_road: function(view, key_array, step) {
    var base = "item.structure_changed_data";
    var key_chain, obj;

    if (step - 1 < 0) {
      obj = view.get(base);

      if (!obj) {
        obj = {};
        view.set(base, obj);
      }

    } else {
      key_chain = base + "." + key_array.slice(0, step).join(".");
      obj = view.get(key_chain);

      if (!obj) {
        obj = {};
        view.set(key_chain, obj);
      }

    }

    if (step + 1 < key_array.length) {
      return view.down_the_road(view, key_array, step + 1);
    } else {
      return obj;
    }
  }

});
