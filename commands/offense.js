const Services = require("../services");
const { getHeroName, log } = require("../utils");

function sendOffenseGrade(message, data) {
  message.channel
    .send(
      `Here are ${data.heroName}'s **offense** grades:

**Speed**: ${data.speed}
**Effect**: ${data.effect}
**Stamina**: ${data.stamina}
**Versatility**: ${data.versatility}
**War**: ${data.war}
__
${data.heroName}'s overall **offense** grade is **${data.overallGrade}**`
    )
    .then(() => log(`Successfully retrieved offense data for ${data.heroName}`))
    .catch(error => console.error(error.message));
}

module.exports = {
  name: "offense",
  description: "Get offense grades for a hero",
  args: true,
  execute: async function(message, args) {
    console.log("executing offense..", args);
    if (args.length) {
      const hero = getHeroName(args);
      Services.fetchOffenseGrade(hero, message)
        .then(stats => {
          sendOffenseGrade(message, stats);
        })
        .catch(err => console.error(err));
    }
  }
};
