# Nostr Followback

Find out who does and who doesn't follow you back on Nostr.
Let promote some reciprocity here! 😹

## ToDo

-   Create groups to checks to fire simultaneously instad of one by one (to remember: fireing all the `fetchProfile` at once for a given npub resulted in a permanent halt of the process -mainly for big users). Maybe using https://lodash.com/docs `_.chunk(array, [size=1])`
-   Create interfaces or new types instead of loose variables
-   Save followbackers and not followbackers in lists to see details.
-   Create an UI/UX that's worth looking at.
-   Close connection with relays after all is checked
-   Show the relay list to be used
-   Upload a localStorage list of relays

-   ~~Actually load builds at minimo.io/app/ or something alike.~~
-   ~~Configure Vite for the miniapp to be loaded in the article's url as base.~~
-   ~~Remove SvelteKit (just Vite + Svelte).~~
