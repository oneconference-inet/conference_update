var userInfo = {
    name: '',
    userId: '',
    option: {},
    iAmRecorder: false
  }

  function setName(name) {
      userInfo.name = name
  }

  function setUserId(id) {
      userInfo.userId = id
  }

  function setOption(option) {
      userInfo.option = option
  }

  function setiAmRecord () {
      userInfo.iAmRecorder = true
  }

  function getName () {
    return userInfo.name;
  }
  
  function getUserId () {
    return userInfo.userId;
  }

  function getOption () {
    return userInfo.option;
  }

  function getiAmRecord () {
    return userInfo.iAmRecorder;
  }

  export default {
    setName,
    setUserId,
    setOption,
    setiAmRecord,
    getName,
    getUserId,
    getOption,
    getiAmRecord
  }