---
title: "Claiming Land"
category: land
summary: "Protect your builds: how to claim, every claim command, settings, members, selling and more."
order: 50
updated: "2026-11-05"
---
BrindleWood uses the **SimpleClaimSystem** plugin. Claim your land in **playworld**, and only you and the people you add can build there. Claiming is **free**.

> Claim before you build. Unclaimed land can't be protected, and we can't roll back damage to it.

## Quick start

1. Stand in the chunk you want in **playworld**.
2. Type `/claim`. That chunk is yours and the claim menu opens.
3. Open `/claim settings` to choose who can do what, and `/claim members` to add friends.

You can see the borders with `/claim see`, and a chat map of nearby claims with `/claim map`. Your claims also show on the [Live Map](https://map.brindlewood.net).

## Your limits

| Limit | Default |
| --- | --- |
| Claims (separate plots) | 1 |
| Chunks you can claim | 10 |
| Members you can add per claim | 10 |
| Claim radius with `/claim <radius>` | up to 2 |
| Teleport delay to a claim | 3 seconds |
| Claim name length | 16 characters |
| Claim description length | 50 characters |

More claims come from [ranks](/guides/ranks) (Knight +2, Lord +4, Paladin +6, Duke +8, King +10), and more chunks from [Chunk Auctions](/guides/chunk-auctions) and the store.

> **Use it or lose it:** claims are removed after **2 weeks** without you logging in.

## Basic commands

| Command | What it does |
| --- | --- |
| `/claim` | Claims the chunk you're standing in and opens the claim menu |
| `/claim <radius>` | Claims the chunk and the ones around it, up to your radius limit |
| `/claim list` | Opens a menu of your claims |
| `/claims` | Opens a menu of all claims on the server |
| `/claim tp <claim name>` | Teleports you to one of your claims |
| `/claim setspawn` | Sets the teleport spot of the claim you're standing in |
| `/claim setname <old name> <new name>` | Renames a claim |
| `/claim setdesc <claim name> <description>` | Sets a claim's description |
| `/unclaim` | Gives up the claim you're standing in |
| `/unclaim <claim name>` | Gives up a claim by name |
| `/unclaim *` | Gives up **all** of your claims. Be careful. |

`/territory`, `/unterritory` and `/territories` work the same as `/claim`, `/unclaim` and `/claims`.

## Menus

These open a menu so you can click instead of typing. Leave out the claim name to use the claim you're standing in.

- `/claim main <claim name>` the claim's main menu
- `/claim settings [claim name]` who can do what in the claim
- `/claim members [claim name]` the people you've added
- `/claim chunks [claim name]` the chunks that make up the claim
- `/claim bans [claim name]` players banned from the claim

## Members: who can build

Only add people you truly trust, and read [Griefing and Rollbacks](/guides/griefing-and-rollbacks) first.

| Command | What it does |
| --- | --- |
| `/claim add <player>` | Adds a member to the claim you're standing in |
| `/claim add <claim name> <player>` | Adds a member to a specific claim |
| `/claim add * <player>` | Adds a member to **all** of your claims |
| `/claim remove <player>` | Removes a member (also works with a claim name or `*`) |
| `/claim ban <player>` | Bans a player from your claim so they can't enter |
| `/claim unban <player>` | Lifts the ban |
| `/claim kick <player>` | Removes a player who is standing in your claim |
| `/claim owner <player>` | Hands the claim to someone else for good |

Bedrock players: type their name with the **BR_** prefix, for example `/claim add BR_Steve`. See [Bedrock Players](/guides/bedrock-players).

## Claim settings

Open `/claim settings`. Every setting can be switched for **Members** (people you added) and **Visitors** (everyone else). These are the defaults for a new claim:

| Setting | Members | Visitors |
| --- | --- | --- |
| Build and Destroy | Yes | No |
| Open chests, furnaces, crafting tables, beds, signs and similar blocks | Yes | No |
| Use buttons, levers, pressure plates | Yes | Yes |
| Use doors, trapdoors, fence gates, bells | Yes | Yes |
| Interact with item frames, armor stands, boats, villagers, horses and similar | Yes | No |
| Use ender pearls, bows, buckets, fire, fishing rods, leads and similar items | Yes | No |
| Pick up and drop items | Yes | No |
| Use portals | Yes | No |
| Claim fly | Yes | No |
| Walk into the claim | Yes | Yes |

Settings for the whole claim, which apply to everyone:

| Setting | Default |
| --- | --- |
| PvP | Off. Turn it on to allow fights in your claim. |
| Explosions | Off |
| Fire spread | Off |
| Liquids flowing in from outside | Off |
| Redstone from outside (like pistons) | Off |
| Monsters spawning | On |

> **Spawners** are protected by the *Special Blocks* setting, which is off by default. If you can't break a spawner in your own claim, check it in `/claim settings`. See [Spawners](/guides/spawners).

## Handy toggles

| Command | What it does |
| --- | --- |
| `/claim see` | Shows the claim borders with particles |
| `/claim map` | Shows a chat map of nearby claims |
| `/claim automap` | Shows that map automatically when you change chunk |
| `/claim autoclaim` | Claims each new chunk you walk into, until you turn it off |
| `/claim autounclaim` | Gives up each chunk you walk into, until you turn it off |
| `/claim chat` | Switches to a chat only your claim's members can see |
| `/claim fly` | Turns claim fly on or off, if you have it |
| `/claim autofly` | Turns claim fly on automatically when you enter |

## Changing the shape of a claim

| Command | What it does |
| --- | --- |
| `/claim addchunk <claim name>` | Adds the chunk you're standing in to a claim |
| `/claim delchunk <claim name> <chunk>` | Removes a chunk (write it as `world;x;z`, or use the chunks menu) |
| `/claim autoaddchunk <claim name>` | Adds each new chunk you walk into until you turn it off |
| `/claim autodelchunk <claim name>` | Removes each chunk you walk into until you turn it off |
| `/claim merge <claim name> <claim name>` | Joins two of your claims into one |

## Selling a claim

You can sell a claim to another player for money:

- `/claim sell <claim name> <price>` puts it up for sale
- `/claim cancel <claim name> <price>` takes it off sale
- `/claim buy` buys the claim you're standing in, if it's for sale

## Good to know

- You can only claim in **playworld**. Aldoria (spawn), the Nether and the End can't be claimed.
- Claiming costs **no money**.
- Adding a member takes effect right away. They don't have to accept an invite.
- You get a message when you enter or leave a claim.
- `/claim`, `/claims`, `/claiming`, `/unclaim` and `/map` are open to every player. If a specific `/claim` option doesn't work for you, ask in a ticket.
- Lost something to grief? See [Griefing and Rollbacks](/guides/griefing-and-rollbacks).
