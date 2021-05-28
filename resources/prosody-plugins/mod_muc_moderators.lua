local muc_svc = module:depends("muc");

function module.load()
    muc_svc.room_mt.get_affiliation = function (room, jid)
      return "owner";
  end
end