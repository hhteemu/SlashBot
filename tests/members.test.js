const { execute } = require("../commands/members");

describe("Members Command", () => {
  it("should reply with a list of member usernames", async () => {
    const interaction = {
      guild: {
        members: {
          fetch: jest.fn(),
          cache: new Map([
            ["1", {user: {username: "Tom"}}],
            ["2", {user: {username: "Jerry"}}],
            ["3", {user: {username: "Donald"}}],
            ["4", {user: {username: "Mickey"}}],
          ]),
        },
      },
      reply: jest.fn(),
    };

    await execute(interaction);

    expect(interaction.reply).toHaveBeenCalledWith("Server members: Tom, Jerry, Donald, Mickey");
  });
});