import { observable, action } from 'mobx';
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
  }
}
const userStore = new UserStore();
export default userStore;
export { UserStore };