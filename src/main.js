import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@tabler/core/dist/css/tabler.min.css";
import "@tabler/core/dist/css/demo.min.css";
import "@tabler/core/dist/js/demo-theme.min.js";
import "@tabler/core/dist/js/tabler.min.js";
import "@tabler/core/dist/js/demo.min.js";
import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
