import Scroll from "../src/javascripts/module/Scroll";
import Tab from "../src/javascripts/module/Tab";
import EnviromentLinkChange from "../src/javascripts/module/EnvironmentLinkChange";

window.addEventListener("load", () => {
  new Scroll();
  new EnviromentLinkChange();
});

document.addEventListener("DOMContentLoaded", () => {
  new Tab();
});
