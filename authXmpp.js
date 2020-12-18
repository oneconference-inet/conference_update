var authXmpp = {
    userXmpp: '',
    passXmpp: ''
}

function setUser (user) {
    authXmpp.userXmpp = user
}

function setPass (pass) {
    authXmpp.passXmpp = pass
}

function getUserXmpp () {
    return authXmpp.userXmpp;
}

function getPassXmpp () {
    return authXmpp.passXmpp;
}

export default {
    setUser,
    setPass,
    getUserXmpp,
    getPassXmpp
}
