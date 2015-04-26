import DS from "ember-data";
import Config from "../config/environment";

export default DS.ActiveModelAdapter.extend({
  host: Config.APP.API_HOST
});
