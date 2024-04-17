<script>
    import NDK from "@nostr-dev-kit/ndk";
    import { fetchUserProfile } from "$lib/fetchs.js";
    import { relays } from "$lib/data/relays";

    let npubToQuery = "npub1fyjqppvxj9z8km5c9hmyfvvnrqj8qxcz82av3dse57v3lftvhz3q98p6ma";
    let userName;
    let userThumb;
    let followsCount;
    let listOfFollows = [];
    async function init() {
        try {
            const ndk = new NDK({
                explicitRelayUrls: relays,
            });
            await ndk.connect();

            const user = await fetchUserProfile(npubToQuery, ndk);
            userName = user.profile.name;
            userThumb = user.profile.image;

            if (userName) {
                const follows = await user.follows();
                followsCount = follows.size;
                if (follows.size) {
                    follows.forEach((contact) => {
                        listOfFollows.push(contact.npub);
                        listOfFollows = listOfFollows;
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    init();
</script>

<h3>This npub follows:</h3>
{#if userThumb}
    <a target="_blank noreferrer noopener" href="https://primal.net/p/{npubToQuery}"
        ><img src={userThumb} width="50" style="border-radius:100%;" alt="user-thumb" /></a
    >
    User: <a target="_blank noreferrer noopener" href="https://primal.net/p/{npubToQuery}">{userName}</a> |  Follows: {followsCount}
{:else}
    <div class="loader">Loading data for... {npubToQuery}</div>
{/if}

<br /><br />

<ul>
    {#each listOfFollows as item}
        <li>{item}</li>
    {/each}
</ul>
