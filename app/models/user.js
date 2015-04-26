import DS from "ember-data";

var attr = DS.attr;

export default DS.Model.extend({
  email: attr("string"),
  password: attr("string"),
  password_confirmation: attr("string"),
  token: attr("string")
});
