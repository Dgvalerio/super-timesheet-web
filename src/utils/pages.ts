export enum Routes {
  Home = `/`,
  Dashboard = `/dashboard`,
  // Auth
  AuthLogin = `/auth/login`,
  // User
  CreateUser = `/auth/sign-up`,
  // Appointment
  CreateAppointment = `/appointment/create`,
  ReadAppointments = `/appointment/list`,
  // Appointment
  CreateAzureInfos = `/perfil/infos`,
}

export const routes = {
  home: (): Routes => Routes.Home,
  dashboard: (): Routes => Routes.Dashboard,
  auth: {
    login: (): Routes => Routes.AuthLogin,
  },
  user: {
    create: (): Routes => Routes.CreateUser,
  },
  appointment: {
    create: (): Routes => Routes.CreateAppointment,
    read: (): Routes => Routes.ReadAppointments,
  },
  azureInfos: {
    create: (): Routes => Routes.CreateAzureInfos,
  },
};
