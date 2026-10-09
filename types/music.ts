import { ImageSourcePropType } from "react-native";
export interface Song {
  id: string;
  title: string;
  artist: string;
  artwork: ImageSourcePropType;
  duration: number;
  likes?: number;
  initiallyLiked?: boolean;
  comments?: number;
}
export interface Playlist {
  id: string;
  title: string;
  subtitle?: string;
  hideTitle?: boolean;
  artwork: ImageSourcePropType;
}
