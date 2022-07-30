export enum Routes {
  Home = `/`,
  Dashboard = `/dashboard`,
  // Auth
  AuthLogin = `/auth/login`,
  // User
  CreateUser = `/auth/sign-up`,
  UpdateUser = `/perfil/update`,
  // Appointment
  CreateAppointment = `/appointment/create`,
  ReadAppointments = `/appointment/list`,
  // AzureInfos
  CreateAzureInfos = `/perfil/infos`,
  // System
  SystemOperation = `/system/operation`,
}

export const routes = {
  home: (): Routes => Routes.Home,
  dashboard: (): Routes => Routes.Dashboard,
  auth: {
    login: (): Routes => Routes.AuthLogin,
  },
  user: {
    create: (): Routes => Routes.CreateUser,
    update: (): Routes => Routes.UpdateUser,
  },
  appointment: {
    create: (): Routes => Routes.CreateAppointment,
    read: (): Routes => Routes.ReadAppointments,
  },
  azureInfos: {
    create: (): Routes => Routes.CreateAzureInfos,
  },
  system: {
    operation: (): Routes => Routes.SystemOperation,
  },
};
