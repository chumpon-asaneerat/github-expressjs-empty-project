const path = require("path");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const favicon = require("serve-favicon");

const APPNAME = "Express Project";
const PORT = 3000;

const app = express();

app.use(helmet());
app.use(morgan("dev"));

app.use(cookieparser("YOUR_SECURE_KEY@123"));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const iconpath = path.join(__dirname, "public", "favicon.ico");
app.use(favicon(iconpath));

const publicPath = path.join(__dirname, 'public');
//const publicMaxAge = { maxage: '30d' };
const publicMaxAge = { maxage: '30s' };
app.use('/public', express.static(publicPath, publicMaxAge));

const distPath = path.join(__dirname, 'public', 'dist');
//const distMaxAge = { maxage: '1d' };
const distMaxAge = { maxage: '15s' };
//const libMaxAge = { maxage: '15s' };
const dist_libs = [
    /* jQuery */
    { "route": "/dist/js", "path": "jquery-3.3.1" },
    /* jQuery UI */
    { "route": "/dist/css", "path": "jquery-ui-1.12.1" },
    { "route": "/dist/js", "path": "jquery-ui-1.12.1" },
    /* bootstrap 4.x */
    { "route": "/dist/js", "path": "popperjs-1.15.0" },
    { "route": "/dist/js", "path": "tooltipjs-1.3.2" },
    { "route": "/dist", "path": "bootstrap-4.2.1" },
    /* font-awesome 5.x */
    { "route": "/dist", "path": "font-awesome-5.9.0" },
    /* emoji-symbols */
    { "route": "/dist/css", "path": "emoji-symbols-1.0.0" },
    /* flag-icon-css 3.x */
    { "route": "/dist", "path": "flag-icon-css-3.1.0" },
    /* animate-css */
    { "route": "/dist", "path": "animate-css-3.7.2" },
    /* moment */
    { "route": "/dist/js", "path": "moment-2.24.0" },
    /* chartjs */
    { "route": "/dist", "path": "chart-js-2.8.0" },
    /* chartjs-plugin-datalabels */
    { "route": "/dist", "path": "chart-js-plugin-datalabels-0.6.0" },
    /* chartjs-plugin-piechart-outlabels */
    { "route": "/dist", "path": "chart-js-plugin-piechart-outlabels-0.1.4" },
    /* howler */
    { "route": "/dist/js", "path": "howler-2.1.2" },
    /* jquery-org-chart */
    { "route": "/dist", "path": "jquery-org-chart-2.1.3" },
    /* tabulator */
    { "route": "/dist", "path": "tabulator-4.4.1" },
    /* ace */
    { "route": "/dist/js", "path": "ace-1.4.5" },
    /* simplebar */
    { "route": "/dist", "path": "simplebar-4.1.0" },
    /* overlay-scrollbar */
    { "route": "/dist", "path": "overlay-scrollbars-1.9.1" },
    /* reveal.js */
    //{ "route": "/dist", "path": "reveal-3.8.0" },
    /* riotjs */
    { "route": "/dist/js", "path": "riotjs-3.13.2" },
    /* fabricjs */
    { "route": "/dist", "path": "fabricjs-3.4.0" },
    /* gifuct */
    { "route": "/dist", "path": "gifuct-js-1.0.0" },
    /* highcharts */
    { "route": "/dist/css", "path": "highcharts-7.2.0/code/css" },
    { "route": "/dist/js", "path": "highcharts-7.2.0/code" },
    /* interact.js */
    { "route": "/dist/js", "path": "interactjs-1.6.2" }
];

function dist_lib(app, exportRoute, localPath) {
    console.log('publish "' + localPath + '"');
    app.use(exportRoute, express.static(path.join(distPath, localPath), distMaxAge));
};

// dist paths.
dist_libs.forEach(element => {
    dist_lib(app, element.route, element.path);
});

app.get("/", (req, res) => {
    res.send(`It's work!!`);
});

app.get("/:file", (req, res) => {
    if (req.params.file === 'index.html') {
        res.sendFile(path.join(__dirname, req.params.file));
    }
    else {
        next();
    }
});

const server = app.listen(PORT, () => {
    console.log(`${APPNAME} listen on port: ${PORT}`);
});