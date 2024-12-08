import page from "./lib/page.js";

import navigationMiddleware from "./middlewares/navMiddleware.js";
import createView from "./views/createView.js";
import dashBoardView from "./views/dashboardView.js";
import deleteView from "./views/deleteView.js";
import detailsView from "./views/detailsView.js";
import editView from "./views/editView.js";
import homeView from "./views/homeView.js";
import loginView from "./views/loginView.js";
import logoutView from "./views/logoutView.js";
import registerView from "./views/registerView.js";


page(navigationMiddleware);

page('/', homeView)
page('/dashboard', dashBoardView);
page('/details/:itemId', detailsView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/sell', createView);
page('/edit/:itemId', editView);
page('/delete/:itemId', deleteView);

page.start('/');