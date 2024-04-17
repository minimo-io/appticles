export async function fetchUserProfile(npub, ndk) {
    const user = ndk.getUser({ npub });
    await user.fetchProfile();
    return user;
}
export async function fetchNotes(hexkey, ndk) {
    const kind1filter = { kinds: [3], authors: [hexkey] };
    return ndk.fetchEvent(kind1filter);
}
