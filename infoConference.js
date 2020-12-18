var listUrl = {
    nameJoin: '',
    urlInvite: '',
    confirm: false,
    urlhref: '',
    service: '',
    isModerator: false,
    isApprove: false,
    muteAllState: false
  }

  function setService (service) {
    listUrl.service = service
  }

  function setConfirm () {
    listUrl.confirm = true
  }
  
  function setMuteAllState (mute) {
    listUrl.muteAllState = mute
  }
  
  function setNameJoin (nameJoin) {
    listUrl.nameJoin = nameJoin
  }
  
  function seturlhref (urlhref) {
    listUrl.urlhref = urlhref
  }
  
  function seturlInvite (urlInvite){
    listUrl.urlInvite = urlInvite
  }
  
  function setIsModerator (set) {
    listUrl.isModerator = set;
  }
  
  function setApprove (set) {
    listUrl.isApprove = set
  }

  function getService () {
    return listUrl.service;
  }

  function getConfirm () {
    return listUrl.confirm;
  }
  
  function getNameJoin () {
    return listUrl.nameJoin;
  }
  
  function geturlhref () {
    return listUrl.urlhref;
  }
  
  function geturlInvite () {
    return listUrl.urlInvite;
  }
  
  function getIsModerator () {
    return listUrl.isModerator;
  }
  
  function getApprove () {
    return listUrl.isApprove;
  }
  
  function getMuteAllState () {
    return listUrl.muteAllState;
  }
  
  function getListInfo () {
    return listUrl;
  }
  
  export default{
    getService,
    getConfirm,
    getMuteAllState,
    getListInfo,
    getApprove,
    getNameJoin,
    geturlInvite,
    getIsModerator,
    geturlhref,
    setService,
    setConfirm,
    seturlInvite,
    setNameJoin,
    seturlhref,
    setIsModerator,
    setApprove,
    setMuteAllState
  }