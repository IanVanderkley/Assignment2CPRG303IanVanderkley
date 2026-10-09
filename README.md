# Assignment 2 — YouTube Music Clone

**Student:** Ian Vanderkley  
**Course:** CPRG303

This project recreates five YouTube Music mobile screens using Expo, React Native and TypeScript. The interface is based on reference iPhone screenshots and uses React Native components with local artwork and song data.

## Running the project

The project is configured for Expo SDK 57. Install Node.js and use a version of Expo Go that supports the project's SDK.
From the project folder containing package.json:

```bash
npm ci
npm start
```

Keep the phone and computer on the same Wi-Fi network. Scan the QR code with the iPhone Camera app or from Expo Go on Android.
For a browser preview:

```bash
npm run web
```

The browser uses the mobile layout. Native keyboard behaviour, safe areas and sharing should be checked on a phone.

## Screens and navigation

Home, Samples, Search and Library use tab navigation. Now Playing opens as a separate screen in the root stack. Closing the player returns to the originating tab.
| Screen | Implemented behaviour |
| --- | --- |
| Home | Scrollable categories, Speed dial cards and Quick Picks. Selecting an item opens Now Playing. My Mix selects Thinking 'bout You by STELLA LEFTY. |
| Samples | Static sample background, animated Like, Save toggle, native sharing and Play for Pretty Privilege. Like and Save share state with Now Playing. |
| Search | Editable input that focuses when the tab opens, four artwork cards and 16 sample search entries. Tapping an entry fills the input; submitting dismisses the keyboard. |
| Library | Scrollable categories and a two-column playlist grid. Playlist cards and Library controls are visual-only. |
| Now Playing | Play/pause, next/previous, simulated progress, tap-to-seek, Shuffle, Repeat, Like, Dislike and Save. |


A shared mini-player appears above the tabs on Home, Search and Library. It stays synchronized with Now Playing. Samples has its own song display. The mini-player and tab bar hide while the native Search keyboard is open.

## Component organization

| File or folder | Responsibility |
| --- | --- |
| app/_layout.tsx | Root Stack, safe-area provider and shared player provider. |
| app/(tabs)/_layout.tsx | Four tabs, labels and active/inactive icons. |
| app/(tabs)/ | Home, Samples, Search and Library layouts. |
| app/player.tsx | Now Playing layout and stack back action. |
| components/ | Shared headers, cards, buttons, rows, mini-player and progress bar. |
| components/PlayerActions.tsx | Like, Dislike, Lyrics, Comments and Save controls. |
| components/PlayerControls.tsx | Shuffle, previous, play/pause, next and Repeat controls. |
| context/PlayerContext.tsx | Shared song selection, per-song likes/dislikes/saves and simulated playback timer. |
| data/music.ts | Song and playlist arrays, local artwork and sample searches. |
| types/music.ts | Song and playlist interfaces. |
| constants/theme.ts | Common colours and styles. |


Reusable components have typed props. SearchRow and SampleAction remain in their screen files because only those screens use them. The larger player control sections are separate components to keep player.tsx readable.
The screens render cards and rows from arrays using .map(). Icons use @expo/vector-icons, and styles use StyleSheet.create(). React Context keeps the player state consistent across screens.

## Animation bonus

components/LikeButton.tsx uses React Native's built-in Animated API. On a tap, the icon scales to 1.3 over 120 milliseconds, then springs back to its original size. No additional animation package was added.
The root stack also gives Now Playing a slide_from_bottom opening transition.

## Demo limitations

- Playback is simulated. No audio, YouTube service, authentication or backend is connected.
- Search fills the input without fetching results. Microphone and sound-recognition icons are visual-only.
- Play all selects Steady without creating a Quick Picks queue. Shuffle does not maintain a listening-history queue.
- Samples and the Video view use static images. Lyrics, Comments, Shorts and casting controls display demo alerts where implemented.
- Like, Dislike and Save selections reset when the app restarts. Reference counts are fixed values rather than live service data.
- Category chips, Library controls and several decorative icons are visual-only.
