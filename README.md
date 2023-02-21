# Anime-Trivia-Game
## About
This is unofficial and not affiliated with [AniList](http://anilist.co/home) in any way.

A single page application game that uses the [AniList API](https://github.com/AniList/ApiV2-GraphQL-Docs) to generate random trivia questions.

## Technologies
- [Node.js](https://nodejs.org/)
- [React.js](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [GraphQL](https://graphql.org/) for consuming the [AniList API](https://github.com/AniList/ApiV2-GraphQL-Docs)
- [Material UI](https://mui.com/)

## Usage and Details
- Upon loading the page, you can add a user's profile to the game with the UI in the top right. You can add multiple users. 
    - If a user with the username provided exists, it will be loaded into the panel.
- After successfully adding a user, the user's lists will be available to be checked.
    - Checking a list will add all of the entries into a pool of potential entries to generate trivia from.
    - A user/profile can be removed with the 'X' on the top right of their profile card. Removing them will automatically remove media entries from the pool.
- Adjusting common users will cause the game to only generate trivia for entries that are shared by that many common users.
    - Example 1: If there are three profiles added and common users is set to two. The game will only choose from entries that are shared by atleast two profiles.
    - Example 2: If there are four profiles in total, if the anime Naruto is in the lists of three profiles and common users is set to three. Then it is possible for the game to pick Naruto and generate trivia from it. If common users is set to four but only three profiles have Naruto in their lists, Naruto will not be in the pool media to generate trivia from.
- Once the pool is populated with entries you may start the game. The game is dynamic and allows for adjustment of common users, adding additional profiles, and uncheck/checking lists.
- Sometimes due to circumstances the game will not be able to generate a question for the selected media, if this happens it will attempt to generate another question up to a maximum of 20 attempts. After 20 attempts it is recommended to check more lists.
    - Usually occurs if the pool of available media is too small. Or amount of common users is too strict.
- You can change the theme, access 'Getting Started', and the 'About' dialog located on the bottom bar. The bottom bar can also be collapsed.

## Potential Future Updates
- If no banner is found find a banner from previous/related anime (prequel, parent, manga)
- Weighted Questions
- Display type of anime (special, ova, movie, sequel, parent)
- Remove year if its in the title (eg. Hunter x Hunter (2011))
- Improve layout

