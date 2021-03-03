var userInfo = {
  name: "",
  userId: "",
  option: {},
  iAmRecorder: false,
  redirect: "",
};

function setName(name) {
  userInfo.name = name;
}

function setUserId(id) {
  userInfo.userId = id;
}

function setOption(option) {
  userInfo.option = option;
}

function setiAmRecord() {
  userInfo.iAmRecorder = true;
}

function setRedirect(link) {
  userInfo.redirect = link;
}

function getName() {
  return userInfo.name;
}

function getUserId() {
  return userInfo.userId;
}

function getOption() {
  return userInfo.option;
}

function getiAmRecord() {
  return userInfo.iAmRecorder;
}

function getRedirect(link) {
  return userInfo.redirect;
}

export default {
  setName,
  setUserId,
  setOption,
  setiAmRecord,
  setRedirect,
  getName,
  getUserId,
  getOption,
  getiAmRecord,
  getRedirect,
};