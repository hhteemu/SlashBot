const { execute } = require("../commands/hello");

describe("Hello Command", () => {
  it("should reply with 'Hello World!'", async () => {
    const interaction = {
      reply: jest.fn()
    };

    await execute(interaction);

    expect(interaction.reply).toHaveBeenCalledWith("Hello World!");
  });
});