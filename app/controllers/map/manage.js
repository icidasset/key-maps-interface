import Ember from "ember";

export default Ember.Controller.extend({
  needs: ["application", "map", "map/index"],
  self_destruct_confirmation: false,


  set_default_self_destruct: function() {
    this.set("self_destruct_confirmation", false);
  }.on("didInsertElement").observes("model"),


  //
  //  Actions
  //
  actions: {

    self_destruct: function() {
      this.set("self_destruct_confirmation", true);
    },

    self_destruct_confirmation: function() {
      var model = this.get("model");
      if (model) model.destroyRecord();

      // redirect to index
      this.transitionToRoute("index");
    },

    import_data: function() {
      var text = this.get("import_data_text");
      var controller = this;
      var parsed_json;

      try {
        parsed_json = JSON.parse(text);
      } catch (err) {
        Ember.get(this, "flashMessages").warning("Invalid JSON");
        return;
      }

      if (Object.prototype.toString.call(parsed_json) !== "[object Array]") {
        Ember.get(this, "flashMessages").warning("Invalid JSON");
        return;
      }

      if (parsed_json) {
        Ember.get(this, "flashMessages").success("Imported");

        parsed_json.forEach(function(x) {
          controller.get("controllers.map/index").add_new(x);
        });
      }
    }

  }

});
