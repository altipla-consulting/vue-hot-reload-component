
export default function initComponent(componentModule, template, component) {
  var c = template(component);

  if (componentModule.hot) {
    var api = require('vue-hot-reload-api');
    var Vue = require('vue');

    api.install(Vue)

    componentModule.hot.accept();

    if (!componentModule.hot.data) {
      api.createRecord(module.id, c);
    } else {
      api.reload(module.id, c);
    }
  }

  return c;
}
