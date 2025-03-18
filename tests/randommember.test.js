const { execute } = require("../commands/randommember.js");

describe("RandomMember Command", () => {
  it("should reply with a random members username", async () => {
    const members = [
      {user: {username: "Tom"}},
      {user: {username: "Jerry"}},
      {user: {username: "Donald"}},
      {user: {username: "Mickey"}},
    ];

    const interaction = {
      guild: {
        members: {
          fetch: jest.fn(),
          cache: new Map([
            ["1", members[0]],
            ["2", members[1]],
            ["3", members[2]],
            ["4", members[3]],
          ]),
        },
      },
      reply: jest.fn(),
    };

    await execute(interaction);

    expect(interaction.reply).toHaveBeenCalledWith(
      expect.stringMatching(/You have been chosen (Tom|Jerry|Donald|Mickey)!/)
    );
  });

  it("should reply with 'No members found!' if there are no users", async () => {
    const interaction = {
      guild: {
        members: {
          fetch: jest.fn(),
          cache: new Map(),
        },
      },
      reply: jest.fn(),
    };

    await execute(interaction);

    expect(interaction.reply).toHaveBeenCalledWith("No members found!");
  });
});