

const api="http://localhost:8000/api";

const apiModules={
  authenticate:`${api}/auth`,
  v1:`${api}/v1`
}
export const environment = {
  production: false,
  api_routes:{
    login:`${apiModules.authenticate}/primary/login`,
    getUserData:`${apiModules.authenticate}/users/get`,
    isAuthenticated:`${apiModules.authenticate}/validate/is_auth`
  }
};
