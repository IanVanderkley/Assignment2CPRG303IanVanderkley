import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Song } from "../types/music";
import { songs } from "../data/music";

interface PlayerState {
  song: Song;
  playing: boolean;
  position: number;
  liked: boolean;
  disliked: boolean;
  saved: boolean;
  shuffle: boolean;
  repeat: boolean;
  togglePlay: () => void;
  selectSong: (id: string) => void;
  next: () => void;
  previous: () => void;
  seek: (seconds: number) => void;
  toggleLike: (songId?: string) => void;
  toggleDislike: () => void;
  toggleSave: (songId?: string) => void;
  isSongLiked: (songId: string) => boolean;
  isSongSaved: (songId: string) => boolean;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

const PlayerContext = createContext<PlayerState | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [position, setPosition] = useState(1);
  const [likedSongIds, setLikedSongIds] = useState<string[]>(
    songs.filter((item) => item.initiallyLiked).map((item) => item.id),
  );
  const [dislikedSongIds, setDislikedSongIds] = useState<string[]>([]);
  const [savedSongIds, setSavedSongIds] = useState<string[]>([]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const song = songs[currentSongIndex];

  function changeSong(newIndex: number) {
    setCurrentSongIndex(newIndex);
    setPosition(0);
  }

  function selectSong(songId: string) {
    const songIndex = songs.findIndex((item) => item.id === songId);

    if (songIndex >= 0) {
      changeSong(songIndex);
      setPlaying(true);
    }
  }

  function next() {
    const offset = shuffle
      ? 1 + Math.floor(Math.random() * (songs.length - 1))
      : 1;
    setCurrentSongIndex((songIndex) => (songIndex + offset) % songs.length);
    setPosition(0);
  }

  function previous() {
    // If the song has already started, go back to the beginning first.
    if (position > 3) {
      setPosition(0);
    } else {
      const previousIndex =
        (currentSongIndex + songs.length - 1) % songs.length;
      changeSong(previousIndex);
    }
  }

  function seek(seconds: number) {
    if (!Number.isFinite(seconds)) {
      return;
    }
    const newPosition = Math.max(0, Math.min(song.duration - 1, seconds));
    setPosition(newPosition);
  }

  function togglePlay() {
    setPlaying((isPlaying) => !isPlaying);
  }

  function toggleLike(songId = song.id) {
    setDislikedSongIds((songIds) => songIds.filter((id) => id !== songId));
    setLikedSongIds((songIds) => {
      if (songIds.includes(songId)) {
        return songIds.filter((id) => id !== songId);
      }
      return [...songIds, songId];
    });
  }

  function toggleDislike() {
    setLikedSongIds((songIds) => songIds.filter((id) => id !== song.id));
    setDislikedSongIds((songIds) => {
      if (songIds.includes(song.id)) {
        return songIds.filter((id) => id !== song.id);
      }
      return [...songIds, song.id];
    });
  }

  function toggleSave(songId = song.id) {
    setSavedSongIds((songIds) => {
      if (songIds.includes(songId)) {
        return songIds.filter((id) => id !== songId);
      }
      return [...songIds, songId];
    });
  }

  function toggleShuffle() {
    setShuffle((isShuffling) => !isShuffling);
  }

  function toggleRepeat() {
    setRepeat((isRepeating) => !isRepeating);
  }

  // This timer moves the progress bar without playing real music.
  useEffect(() => {
    if (!playing) {
      return;
    }

    const timer = setInterval(() => {
      setPosition((seconds) => Math.min(seconds + 1, song.duration));
    }, 1000);

    return () => clearInterval(timer);
  }, [playing, song.id, song.duration]);

  useEffect(() => {
    if (position < song.duration) {
      return;
    }

    setPosition(0);
    if (!repeat) {
      // Use shuffle here too when the timer reaches the end.
      const offset = shuffle
        ? 1 + Math.floor(Math.random() * (songs.length - 1))
        : 1;
      setCurrentSongIndex((songIndex) => (songIndex + offset) % songs.length);
    }
  }, [position, song.duration, repeat, shuffle]);

  // Both players use this state so they always show the same song.
  return (
    <PlayerContext.Provider
      value={{
        song,
        playing,
        position,
        liked: likedSongIds.includes(song.id),
        disliked: dislikedSongIds.includes(song.id),
        saved: savedSongIds.includes(song.id),
        shuffle,
        repeat,
        togglePlay,
        selectSong,
        next,
        previous,
        seek,
        toggleLike,
        toggleDislike,
        toggleSave,
        isSongLiked: (songId) => likedSongIds.includes(songId),
        isSongSaved: (songId) => savedSongIds.includes(songId),
        toggleShuffle,
        toggleRepeat,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const player = useContext(PlayerContext);

  if (!player) {
    throw new Error("PlayerProvider is missing");
  }

  return player;
}
