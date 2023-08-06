setInterval(partyCall, 30000);

function partyCall() {
  if (configs.party.leader == character.name) {
    myToons.forEach(function (name) {
      if (!parent.party.hasOwnProperty(name) && get_player(name) != null && character.name != name) {
        log("Sending Invite to: " + name);
        send_party_invite(name);
      }
    });
  }
}

function on_party_request(name) // called by the inviter's name - request = someone requesting to join your existing party
{
  
  if (configs.party.leader == name) {
    accept_party_request(name);
  }
}

function on_party_invite(name) // called by the inviter's name - request = someone requesting to join your existing party
{
  if (configs.party.leader == name) {
    accept_party_invite(name);
  }
}