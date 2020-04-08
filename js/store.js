const store = {};
export default store;

function save (key, value) {
  uni.setStorageSync(key, value);
  // uni.setStorage({ key, data: value, });
}

function get (key) {
  return uni.getStorageSync(key);
}

store.get = (key) => get(key);

store.updateUser = (userId,token,phone) => {
	save('userId', userId);
	save('token', token);
	save('phone',phone);
};
store.getUserId = () => get('userId');
store.getToken = () => get('token');