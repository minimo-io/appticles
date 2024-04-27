<script lang="ts">
    // @ts-nocheck
    import NDK, { type NDKUserProfile } from "@nostr-dev-kit/ndk";
    import type { userFollowData } from "./lib/types";
    import { relays } from "./lib/data/relays";

    let npubToQuery = "npub1wujhdsytm3w6g0mpsqh8v7ezx83jcm64dlkwuqgm5v8lv0pds55ssudkw0";

    let querying: "completed" | "processing" | "uninitiated" = "uninitiated";

    let userProfile: NDKUserProfile | null;

    let followsCount = 0;
    let followBackCount = 0;
    let notFollowBackCount = 0;
    let unknownFollowBack = 0;
    let totalCountOfContactsChecked = 0;

    $: progress = ((totalCountOfContactsChecked / followsCount) * 100).toFixed() | 0;
    $: notFollowBackPercentage = ((notFollowersBack.length / originalFollow.length) * 100) | 0;

    let originalFollow = [];
    let notFollowersBack = [];

    async function checkFollowBacks() {
        try {
            const ndk = new NDK({
                explicitRelayUrls: relays,
            });
            await ndk.connect(6000);
            querying = "processing";

            // create user instance
            const user = ndk.getUser({ npub: npubToQuery });
            // query for user profile
            userProfile = await user.fetchProfile();

            if (userProfile) {
                // console.log(user.profile);
                const follows = await user.follows({ groupable: false }, false);
                // query for a set of user followers

                followsCount = follows.size;

                let lastFollowerBack;
                let i = 0;

                for await (const follower of follows) {
                    const followerFollowList = await follower.follows();

                    try {
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
                    } catch (error) {
                        console.log(follower);
                        console.error(`Error fetching npub:`, error);
                    }
                }
            }
            querying = "completed";
        } catch (error) {
            console.error(`Error fetching data (${npubToQuery}):`, error);
        }
    }
    function ItemCount(i: number): string {
        let ret = i.toString();
        if (i < 10) ret = `0${i}`;
        return ret;
    }
</script>

<form class="npub-form">
    <input
        disabled={querying == "processing" && progress < 100}
        type="text"
        placeholder="npub to check"
        bind:value={npubToQuery}
    />
    <input
        type="button"
        on:click={async () => {
            querying = true;
            userProfile = null;
            originalFollow = [];
            notFollowersBack = [];
            followBackCount = 0;
            notFollowBackCount = 0;
            unknownFollowBack = 0;
            totalCountOfContactsChecked = 0;
            await checkFollowBacks();
        }}
        disabled={!npubToQuery && progress < 100}
        value="Analyze"
    />
</form>

{#if userProfile}
    <div class="user-box">
        <img src={userProfile.image} width="50" style="border-radius:100%;" alt="user-thumb" />
        User:
        <a href="https://primal.net/p/{npubToQuery}">{userProfile.displayName}</a>
        |  Follows: {followsCount}
        <br />
        Unknown: {unknownFollowBack} - Follow_Back: {followBackCount} -
        <strong>👉 Not_Follow_Back</strong>
        :
        <span title="Actualy counted">{notFollowersBack.length}</span>
        <br />
        {#if progress < 100}
            <p>
                Progress = <strong>{progress}%</strong>
                - {totalCountOfContactsChecked} of {followsCount}
            </p>
        {:else}
            <p><strong>✅ Completed!</strong></p>
        {/if}
        <hr />
        <br />
        <strong>Not followers</strong>
        : {notFollowersBack.length} of
        {originalFollow.length} ({notFollowBackPercentage}%)
        <ul>
            {#each originalFollow as item, i}
                <li>
                    #{ItemCount(i + 1)} - {@html item.followBack == "0" ? "<span>🔴</span>" : "<span>🟢</span>"}
                    <a target="_blank noreferrer noopener" href="https://primal.net/p/{item.npub}">
                        {item.npub}
                    </a>
                    <!-- {JSON.stringify(item)} -->
                </li>
            {/each}
        </ul>
    </div>
{:else if querying == "uninitiated"}
    <!-- <p>Let's find out who does not follow you back in Nostr!</p> -->
{:else}
    <div class="loader">Loading data...</div>
{/if}

<style>
    .npub-form input[type="text"] {
        padding: 5px;
        width: 50%;
    }
</style>
