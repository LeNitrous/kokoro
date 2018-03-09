module.exports = {
    name: "Mute",
    desc: "Gag a member",
    help: "Gag a member for a set time.",
    preq: ["HasElevatedPerms"],
    perm: ["MANAGE_ROLES"],
    args: [
        {name: "member", desc: "Mentioned member"}
    ],
    task: (Kokoro, msg, args) => {
        
    }
};