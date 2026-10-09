# Device demonstration checklist

Actual iPhone and Android testing is required before claiming cross-platform runtime verification. Bundle checks alone cannot verify a native keyboard, safe areas, hardware Back or visual fidelity on a phone.

1. Launch in Expo Go. Confirm Home opens, all artwork loads and four tabs appear.
2. Tap each tab. Verify Samples has its own song label rather than the shared mini-player.
3. From Home, open the mini-player. Close it and confirm you return to Home.
4. From Library, open the mini-player. Close it and confirm you return to Library. Repeat with Android hardware Back.
5. Pause. Verify the displayed time stops. Close the player; confirm the mini-player shows Play. Resume and verify time advances.
6. Tap Next and Previous. Verify title, artwork and duration change together. Tap the progress bar near its middle and confirm elapsed time jumps there.
7. Turn on Repeat, seek close to the end, and wait for the timer to reset. Turn Repeat off and verify the next song begins at the end.
8. Tap Like and observe the spring animation. Verify the icon and count update. Toggle Save and Shuffle.
9. Open Search. Confirm the device keyboard appears and the tabs/mini-player are hidden while it is open. Tap a recent search, type, submit and return to Home. Open Search again and verify focus returns.
10. Open Samples. Like and Save toggle; Share opens the native share sheet. Play opens Pretty Privilege in Now Playing.
11. Scroll Home and Library. Confirm content does not sit behind the mini-player. Library cards remain visual-only.
12. Tap the three-dot My Mix tile. Confirm Thinking 'bout You by STELLA LEFTY opens. Check Jessie Murph and Zach Bryan when selecting their songs.
13. Swipe the Home and Library chip rows to check the new categories. Dismiss the Search keyboard and scroll to the last few song titles.
14. Compare all five screens with `references/` on your target phone. Check spacing, font scale, safe areas, icon alignment and artwork.

Keep the app's font scaling enabled; large accessibility fonts may change line breaks. Player content scrolls on shorter screens so controls remain reachable.

## Player regression checks

- Dislike a song, press Next, and confirm the next song is not disliked. Return to the first song and confirm its Dislike remains selected. Like it and confirm Dislike clears.
- In Samples, Like and Save Pretty Privilege. Open its player and confirm both selections are shared. Remove Save in the player and return to Samples to confirm the change.
- Like or Save in Samples while another song is selected. Return to Home and confirm the mini-player still shows that other song.
- With Shuffle on and Repeat off, seek near the end and confirm automatic advancement selects another song. With Repeat on, confirm the current song restarts instead.
- Pause and tap the middle of the progress bar. Confirm the displayed elapsed time moves to about half the duration and stays there until resumed. Repeat in the browser and on a phone.
- Confirm screenshot counts: The Man That Came Back shows 65K likes and 437 comments before toggling its Like. Quick Picks should show artist names without repeated play counts.
