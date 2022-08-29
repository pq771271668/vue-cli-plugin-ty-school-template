import PopupPanel from "./src/main.vue";

PopupPanel.install = function(Vue) {
  Vue.component(PopupPanel.name, PopupPanel);
};
export default PopupPanel;
