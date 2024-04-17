<script>
    // Import the package
    import NDK from "@nostr-dev-kit/ndk";

    let npubToQuery = "npub1wujhdsytm3w6g0mpsqh8v7ezx83jcm64dlkwuqgm5v8lv0pds55ssudkw0";
    let userName;
    let userThumb;
    let followsCount;

    let followBackCount = 0;
    let notFollowBackCount = 0;
    let unknownFollowBack = 0;
    let totalCountOfContactsChecked = 0;

    let notFollowersBack = [];

    async function fetchUserProfile(npub, ndk) {
        const user = ndk.getUser({ npub });
        await user.fetchProfile();
        // console.log("User profile:", user.profile);
        // console.log("User profile:", user);
        return user;
    }
    async function fetchNotes(hexkey, ndk) {
        const kind1filter = { kinds: [3], authors: [hexkey] };
        return ndk.fetchEvent(kind1filter);

        // const kind1filter = { author: [hexkey] };
        // return ndk.fetchEvent(kind1filter);
    }

    async function bootstrap() {
        try {
            const ndk = new NDK({
                explicitRelayUrls: [
                    "wss://relay.hodl.ar",
                    "wss://relay.current.fyi",
                    "wss://nostr.wine",
                    "wss://nostr.plebchain.org",
                    "wss://purplepag.es",
                    "wss://nos.lol",
                    "wss://nostr.mom",
                    "wss://nostrelay.yeghro.site",
                    "wss://relay.damus.io",
                    "wss://relay.nostr.bg",
                    "wss://relay.snort.social",
                    "wss://relay.primal.net",
                    "wss://nostr.bitcoiner.social",
                    "wss://nostr.mutinywallet.com",
                    "wss://relay.current.fyi",
                    "wss://nostr-pub.wellorder.net",

                    // "wss://brb.io",
                    // "wss://eden.nostr.land",
                    // "wss://nostr.orangepill.dev",
                ],
            });
            await ndk.connect();

            // const user = await fetchUserProfile("npub1l8hja34gyeqrhc8plpcl3sql476n2rkgrzexazsfytwjkmy9kndqhx6pk9", ndk);
            const user = await fetchUserProfile(npubToQuery, ndk);

            userName = user.profile.name;
            userThumb = user.profile.image;

            if (userName) {
                // console.log(user.profile);
                const follows = await user.follows();

                followsCount = follows.size;

                let lastFollowerBack;

                follows.forEach(async (follower) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    const followerFollowList = await follower.follows();

                    if (followerFollowList.size) {
                        // console.log(followerFollowList);
                        // check if the user is in the queried user follow list
                        let doesFollowBack = false;
                        for (const contact of followerFollowList) {
                            lastFollowerBack = contact.npub;
                            if (contact.npub == npubToQuery) {
                                doesFollowBack = true;
                                break;
                            }
                        }

                        // decision making time
                        if (doesFollowBack) {
                            followBackCount++;
                            totalCountOfContactsChecked++;
                            // add here the ones who do follow back
                        } else {
                            notFollowBackCount++;

                            notFollowersBack.push(lastFollowerBack);
                            notFollowersBack = notFollowersBack;
                            totalCountOfContactsChecked++;
                        }
                    } else {
                        unknownFollowBack++;
                        totalCountOfContactsChecked++;
                    }
                });
            }

            // console.log("Followers:");
            // let followers = await fetchNotes(user.hexpubkey, ndk);
            // console.log(followers.tags.length);

            // const longNotes = await fetchLongNotes(hexkey, ndk);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    bootstrap();
</script>

<h1>Who does not follows you on Nostr</h1>
{#if !userThumb}
    {npubToQuery}
{/if}
<hr />
{#if userThumb}
    <div class="user-box">
        <img src={userThumb} width="50" style="border-radius:100%;" alt="user-thumb" />
        User: {userName} |  Follows: {followsCount}
        <br /><br />
        Unknown: {unknownFollowBack} | Follow_Back: {followBackCount} | <strong>Not_Follow_Back</strong>:
        <span title="Actually Counted">{notFollowBackCount}</span>
        / <span title="Actualy counted">{notFollowersBack.length}</span>
        <br />
        Total Scanned = {totalCountOfContactsChecked} of {followBackCount + notFollowBackCount + unknownFollowBack}
        <br /><br />
        <strong>They don't follow you ({notFollowersBack.length}):</strong>
        <br /><br />
        {#each notFollowersBack as item, i}
            <li>
                #{i + 1} - <a href="https://nostr.band/{item}" target="_blank noreferrer noopener">Nostr.Band</a>
                / <a href="https://primal.net/p/{item}" target="_blank noreferrer noopener">Primal</a>
                :
                {item}
            </li>
        {/each}
    </div>
{:else}
    <div class="loader">Loading data...</div>
{/if}
