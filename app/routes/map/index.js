import Ember from "ember";
import AuthenticatedRouteMixin from "simple-auth/mixins/authenticated-route-mixin";
import { pluralize } from "ember-inflector";

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model() {
    var promises = [];
    var map_model = this.modelFor("map");
    var associations;

    // check if map_model is present
    if (!map_model) return null;

    // map items for the current map
    promises.push(map_model.get("map_items"));

    // map items for associations
    associations = map_model.get("structure").filter(function(struct) {
      return struct.type === "association";
    });

    associations.forEach((association) => {
      var singular = singularize(association.key);
      var plural = pluralize(association.key);

      // var is_singular = singular === association.key;
      // var is_plural = !is_singular;

      var map = this.getMap({ slug: plural, slug_backup: singular });
    });

    // promise
    return Ember.RSVP.all(promises);
  },

  setupController(controller, context) {
    if (controller && (context !== undefined)) {
      controller.set("model", context.map_items);
      controller.set("associations", context.associations);
    }
  },

  getMap(params) {
    return this.store.all("map").filter(function(m) {
      return (m.get("slug") === params.slug) ||
             (m.get("slug") === params.slug_backup);
    })[0];
  }
});
