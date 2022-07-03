export enum Routes {
  Home = `/`,
  Dashboard = `/dashboard`,
  AuthLogin = `/auth/login`,
  UserCreate = `/auth/sign-up`,
}

export const routes = {
  home: (): Routes => Routes.Home,
  dashboard: (): Routes => Routes.Dashboard,
  auth: {
    login: (): Routes => Routes.AuthLogin,
  },
  user: {
    create: (): Routes => Routes.UserCreate,
  },
};
