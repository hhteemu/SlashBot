const { execute } = require("../commands/roll");

describe("Roll Command", () => {
  it("should reply with a number between 1-100", async () => {
    const interaction = {
      reply: jest.fn()
    };

    await execute(interaction);

    expect(interaction.reply).toHaveBeenCalledWith(expect.stringMatching(/You rolled a \d+/));
  });
});