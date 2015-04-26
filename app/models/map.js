import DS from "ember-data";

var attr = DS.attr;

export default DS.Model.extend({
  name: attr("string"),
  slug: attr("string"),
  structure: attr("json_array"),
  settings: attr("json_object"),
  created_at: attr(),
  updated_at: attr(),

  map_items: DS.hasMany("map-item", { async: true })
});
