import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/index.tsx"),

    route("/enter", "routes/page/start.page.tsx"),
    route("/login", "routes/services/login.service.tsx"),
    route("/subscribe", "routes/services/subscribe.service.tsx"),
    route("/chat", "routes/services/chat.service.tsx"),

] satisfies RouteConfig;
