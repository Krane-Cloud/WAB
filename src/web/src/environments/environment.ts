

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
    isAuthenticated:`${apiModules.authenticate}/validate/is_auth`,
    getUsername:`${apiModules.authenticate}/users/get_username`,
    add_app:`${apiModules.v1}/apps/add_app`,
    edit_app:`${apiModules.v1}/apps/edit_appbase`,
    get_apps:`${apiModules.v1}/apps/get_apps`,
    get_pages:`${apiModules.v1}/pages/get_pages`,
    validateCon:`${apiModules.authenticate}/primary/validate_connection`,
    remove_app: `${apiModules.v1}/apps/remove_app`,
    validate_access_app: `${apiModules.v1}/apps/validate_access`,
    validate_access_page: `${apiModules.v1}/pages/validate_access`,
    save_page: `${apiModules.v1}/pages/save_page`,
    get_page_details: `${apiModules.v1}/pages/get_page_details`,

  }
};
