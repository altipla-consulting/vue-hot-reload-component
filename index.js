
export default function initComponent(componentModule, template, component) {
  let c = template(component);

  if (componentModule.hot) {
    const api = require('vue-hot-reload-api');
    const Vue = require('vue');

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
