export enum Routes {
  Home = `/`,
  AuthLogin = `/auth/login`,
  UserCreate = `/auth/sign-up`,
}

export const routes = {
  home: (): Routes => Routes.Home,
  auth: {
    login: (): Routes => Routes.AuthLogin,
  },
  user: {
    create: (): Routes => Routes.UserCreate,
  },
};
