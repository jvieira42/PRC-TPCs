import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/ListaFilmes.vue";
import Filme from "../components/Filme.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "ListaFilmes",
        component: Home,
    },
    {
        path: "/:idFilme",
        name: "Filme",
        component: Filme,
        props: true,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
