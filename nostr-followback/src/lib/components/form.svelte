<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Querying } from "../types";

    const dispatch = createEventDispatcher();

    export let npubToQuery = "";
    export let progress = 0;
    export let querying: Querying;
    export let analyzeFn = function () {
        dispatch("click");
    };
</script>

<form class="npub-form">
    <input
        type="text"
        placeholder="npub to check"
        bind:value={npubToQuery}
        disabled={querying == "processing" && progress < 100}
    />
    <input type="button" on:click={analyzeFn} value="Analyze" />
</form>

<style>
    .npub-form input[type="text"] {
        padding: 5px;
        width: 50%;
    }
</style>
