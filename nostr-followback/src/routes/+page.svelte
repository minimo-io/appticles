<script>
    // Import the package
    import NDK from "@nostr-dev-kit/ndk";
    import { fetchUserProfile } from "$lib/fetchs";
    import { relays } from "$lib/data/relays";

    let npubToQuery = "npub1wujhdsytm3w6g0mpsqh8v7ezx83jcm64dlkwuqgm5v8lv0pds55ssudkw0";
    let userName;
    let userThumb;
    let followsCount;

    let followBackCount = 0;
    let notFollowBackCount = 0;
    let unknownFollowBack = 0;
    let totalCountOfContactsChecked = 0;

    let originalFollow = [];
    let notFollowersBack = [];

    function updateNpub() {}

    async function bootstrap() {
        try {
            const ndk = new NDK({
                explicitRelayUrls: relays,
            });
            await ndk.connect();

            const user = await fetchUserProfile(npubToQuery, ndk);

            userName = user.profile.name;
            userThumb = user.profile.image;

            if (userName) {
                // console.log(user.profile);
                const follows = await user.follows();

                followsCount = follows.size;

                let lastFollowerBack;
                let i = 0;
                follows.forEach(async (follower) => {
                    //for (const follower of follows) {
                    // await new Promise((resolve) => setTimeout(resolve, 0));
                    const followerFollowList = await follower.follows();

                    originalFollow.push({ npub: follower.npub, followsBack: "-" }); // add to follower list
                    originalFollow = originalFollow;

                    if (followerFollowList.size) {
                        // console.log(followerFollowList);
                        // check if the user is in the queried user follow list
                        let doesFollowBack = false;
                        for (let contact of followerFollowList) {
                            lastFollowerBack = contact.npub;
                            if (contact.npub == npubToQuery) {
                                doesFollowBack = true;
                                break;
                            }
                        }

                        originalFollow[i].followBack = doesFollowBack ? "1" : "0";

                        // decision making time
                        if (doesFollowBack) {
                            followBackCount++;
                            totalCountOfContactsChecked++;
                            // add here the ones who do follow back
                        } else {
                            notFollowBackCount++;

                            notFollowersBack.push(follower.npub);
                            notFollowersBack = notFollowersBack;
                            totalCountOfContactsChecked++;
                        }
                    } else {
                        unknownFollowBack++;
                        totalCountOfContactsChecked++;
                    }
                    i++;
                });

                // follows.forEach(async (follower) => {

                // });
            }
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
        <br />
        {npubToQuery}
        <br /><br />
        Unknown: {unknownFollowBack} | Follow_Back: {followBackCount} | <strong>Not_Follow_Back</strong>:
        <span title="Actually Counted">{notFollowBackCount}</span>
        / <span title="Actualy counted">{notFollowersBack.length}</span>
        <br />
        <p>
            Progress = {totalCountOfContactsChecked} of {followBackCount + notFollowBackCount + unknownFollowBack}
        </p>
        <hr />
        <br />
        Results ({originalFollow.length})
        <ul>
            {#each originalFollow as item, i}
                <li>
                    #{i + 1} - {@html item.followBack == "0" ? "<span>🔴</span>" : "<span>🟢</span>"}
                    <a target="_blank noreferrer noopener" href="https://primal.net/p/{item.npub}">
                        {item.npub}
                    </a>
                    <!-- {JSON.stringify(item)} -->
                </li>
            {/each}
        </ul>
        <!-- <br />
        <strong>They don't follow you ({notFollowersBack.length}):</strong>
        <br />

        <ul>
            {#each notFollowersBack as item, i (item)}
                <li>
                    #{i + 1} - <a href="https://nostr.band/{item}" target="_blank noreferrer noopener">Nostr.Band</a>
                    / <a href="https://primal.net/p/{item}" target="_blank noreferrer noopener">Primal</a>
                    :
                    {item}
                </li>
            {/each}
        </ul> -->
    </div>
{:else}
    <div class="loader">Loading data...</div>
{/if}
