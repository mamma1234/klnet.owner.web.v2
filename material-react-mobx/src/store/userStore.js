import { observable, action, computed } from 'mobx';
import StorageService from './StorageService'
class UserStore {
  @observable me;
  @observable user;
  @observable token;
  constructor() {
    // this.me = null;
    this.me = "mobx test";
    this.user = null;
    this.token = null;
  }
  @action setMe = (me) => {
    this.me = me;
  }
  @action setUser = (user) => {
    this.user = user;
  }
  @action setToken = (token) => {
    this.token = token;
    StorageService.setToken(this.token);
  }
  @computed get Token {
    if (!this.token){
      this.token = StorageService.getToken();
    }
    return this.token;
  }
  @action logout =() => {
    StorageService.removeToken();
  }
}
const userStore = new UserStore();
export default userStore;
export { UserStore };