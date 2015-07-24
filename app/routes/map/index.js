import Ember from "ember";
import AuthenticatedRouteMixin from "simple-auth/mixins/authenticated-route-mixin";


export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model() {
    return new Ember.RSVP.Promise((resolve) => {
      this.getContext(resolve);
    });
  },

  getContext(resolve) {
    var promises = [];
    var map_model = this.modelFor("map");
    var associations;

    // check if map_model is present
    if (!map_model) return null;

    // map items for the current map
    promises.push(map_model.get("map_items"));

    // map items for associations
    associations = map_model.get("structure").filter(function(struct) {
      return !!struct.type.match(/^association\.\w+$/);
    });

    associations.forEach((association) => {
      var associated_map = this.getMap({ slug: association.key.split("->")[0] });
      if (associated_map) promises.push(associated_map.get("map_items"));
    });

    // promise
    Ember.RSVP.all(promises).then(function(resolved_objects) {
      var map_items = resolved_objects[0];
      var associations = {};

      resolved_objects.slice(1, resolved_objects.length).forEach(function(res) {
        var slug = res.record._data.slug;
        if (slug) {
          associations[slug] = res;
        }
      });

      resolve({
        map_items: map_items,
        associations: associations
      });
    });
  },

  setupController(controller, context) {
    if (controller && (context !== undefined)) {
      controller.set("model", context.map_items);
      controller.set("associations", context.associations);
    }
  },

  getMap(params) {
    return this.store.all("map").filter(function(m) {
      return m.get("slug") === params.slug;
    })[0];
  }
});
