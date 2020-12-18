var userInfo = {
    name: '',
    userId: '',
    option: ''
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

  function getName () {
    return userInfo.name;
  }
  
  function getUserId () {
    return userInfo.userId;
  }

  function getOption () {
    return userInfo.option;
  }

  export default {
    setName,
    setUserId,
    setOption,
    getName,
    getUserId,
    getOption
  }