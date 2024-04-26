# Nostr Followback

Find out who does and who doesn't follow you back on Nostr.
Let promote some reciprocity here! 😹

## ToDo

-   Actually load builds at minimo.io/app/ or something alike.
-   Ask community for help about the bug (see below) so I can keep understanding the protocol and the library.
-   Polish the proof-of-concept code, making it TS code and remove `// @ts-nocheck`!
-   Create interfaces or new types instead of loose variables
-   Save followbackers and not followbackers in lists to see details.
-   Create an UI/UX that's worth looking at.
-   Close connection with relays after all is checked
-   Show the relay list to be used
-   Upload a localStorage list of relays

-   ~~Configure Vite for the miniapp to be loaded in the article's url as base.~~
-   ~~Remove SvelteKit (just Vite + Svelte).~~

## BUG

-   **When user follows lots of people, progress freezes:**<br>
    [NDK](https://github.com/nostr-dev-kit/ndk) keeps trying to re-connect to relays, and progress slows down or halts completly. Maybe slow requests down? Are they blocking the requests because they are too many too fast?
