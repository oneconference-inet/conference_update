var listUrl = {
  nameJoin: "",
  roomname: "",
  urlInvite: "",
  confirm: false,
  meetingId: "",
  service: "",
  isModerator: false,
  isApprove: false,
  muteAllState: false,
  isSecretRoom: false,
  isHostHangup: false,
};

function setRoomName(roomname) {
  listUrl.roomname = roomname;
}

function setService(service) {
  listUrl.service = service;
}

function setConfirm() {
  listUrl.confirm = true;
}

function setMuteAllState(mute) {
  listUrl.muteAllState = mute;
}

function setNameJoin(nameJoin) {
  listUrl.nameJoin = nameJoin;
}

function setMeetingId(meetingId) {
  listUrl.meetingId = meetingId;
}

function seturlInvite(urlInvite) {
  listUrl.urlInvite = urlInvite;
}

function setIsModerator() {
  listUrl.isModerator = true;
}

function setIsSecretRoom(secretroom) {
  listUrl.isSecretRoom = secretroom;
}

function setApprove(set) {
  listUrl.isApprove = set;
}

function setIsHostHangup() {
  listUrl.isHostHangup = true;
}

function getRoomName() {
  return listUrl.roomname;
}

function getService() {
  return listUrl.service;
}

function getConfirm() {
  return listUrl.confirm;
}

function getNameJoin() {
  return listUrl.nameJoin;
}

function getMeetingId() {
  return listUrl.meetingId;
}

function geturlInvite() {
  return listUrl.urlInvite;
}

function getIsModerator() {
  return listUrl.isModerator;
}

function getIsSecretRoom() {
  return listUrl.isSecretRoom;
}

function getApprove() {
  return listUrl.isApprove;
}

function getMuteAllState() {
  return listUrl.muteAllState;
}

function getListInfo() {
  return listUrl;
}

function getIsHostHangup() {
  return listUrl.isHostHangup;
}

export default {
  getRoomName,
  getService,
  getConfirm,
  getMuteAllState,
  getListInfo,
  getApprove,
  getNameJoin,
  geturlInvite,
  getIsModerator,
  getMeetingId,
  setRoomName,
  setService,
  setConfirm,
  seturlInvite,
  setNameJoin,
  setMeetingId,
  setIsModerator,
  setApprove,
  setMuteAllState,
  setIsSecretRoom,
  getIsSecretRoom,
  setIsHostHangup,
  getIsHostHangup,
};