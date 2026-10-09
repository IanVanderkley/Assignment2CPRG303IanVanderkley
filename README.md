2. `app/(tabs)/_layout.tsx`: four Tabs.Screen entries and Expo icons.
3. `app/(tabs)/index.tsx`: Home, arrays of data and reusable cards.
4. `components/MusicTabBar.tsx` and `MiniPlayer.tsx`: mini-player above the tab bar.
5. `app/player.tsx`: player controls and the stack back action.
6. `context/PlayerContext.tsx`: state shared across the player and tabs.
7. `components/LikeButton.tsx`: animation bonus.

Reusable components have typed props. SearchRow and SampleAction stay in their respective screen files because no other screen uses them. Shared cards, buttons, rows and progress live in `components/` because multiple parts of the interface use them or because they isolate a substantial responsibility.

## Small additions beyond the supplied slides

- `createContext` / `useContext`: let multiple screens share one player's state without passing props through the navigator.
- `useEffect`: starts the simulated playback timer and cleans it up, and subscribes to keyboard events.
- `useRef` and built-in `Animated`: hold the animation value and TextInput reference. Native animation runs on the UI thread.
- `useFocusEffect`: focuses Search when its tab becomes active.
- A custom `tabBar` wrapper composes the mini-player with Expo Router's standard BottomTabBar. The wrapper hides during native Search keyboard entry and omits the mini-player on Samples.

No extra animation package was added. Expo Router, TypeScript, Pressable, TextInput, local Image assets, arrays and typed components remain the main tools demonstrated in the course examples.

## Reference artwork

`references/` contains the five original screenshots for visual comparison and snapshot selection. `assets/images/` contains cropped artwork from those user-supplied screenshots. UI is implemented with real React Native components, rather than displaying a screenshot as each screen. Player screenshots supply larger artwork for the Home grid and Library. The four Search covers were downloaded from Apple’s public catalog; their source links are recorded in `references/search-artwork-sources.json`. Samples uses a crop to exclude the reference's overlaid controls. Images and YouTube branding remain the property of their owners; this is a classroom recreation.

## Before submitting

Run the checks and follow `TESTING.md` on both iPhone and Android. Review the code until you can explain it and follow your course's requirements for acknowledging assistance. Push the source folder to **your own assignment repository**, not the instructor's demo repository. `node_modules` and generated output are excluded by `.gitignore`.

```bash
npm run typecheck
npm run check
npx expo export --platform all
```

This project has not been pushed to GitHub. The provided GitHub link is an instructor reference, not a submission destination.

## Visual refinements

Home titles use a transparent fade rather than a solid bar, the Mix tile shows all three dots and opens STELLA LEFTY, and category chips are more compact. Home includes Party, Commute, Romance, Sad, Focus and Sleep; Library includes Profiles and Podcasts. Search has 16 familiar 2000s–2010s song queries and four matching cover images. Selected tab icons are white against muted inactive icons; Samples fills its icon and Search adds the small inner ring. Samples overflow dots share the same horizontal centre as its action buttons.
