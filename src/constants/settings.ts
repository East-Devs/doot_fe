import imagePlaceholder from "../assets/images/users/profile-placeholder.png";

export enum DISPLAY_TYPES {
  EVERYONE = "everyone",
  SELECTED = "selected",
  NOBODY = "nobody",
}

export enum SETTINGS_COLLAPSES {
  PROFILE = "profile",
  THEME = "theme",
  PRIVACY = "privacy",
  SECURITY = "security",
  HELP = "help",
}
export interface DisplayOpt {
  label: string;
  value: DISPLAY_TYPES;
}

export const DisplayTypes: Array<DisplayOpt> = [
  { label: "Everyone", value: DISPLAY_TYPES.EVERYONE },
  { label: "Nobody", value: DISPLAY_TYPES.NOBODY },
  { label: "Selected", value: DISPLAY_TYPES.SELECTED },
];

export enum STATUS_TYPES {
  ACTIVE = "Active",
  AWAY = "Away",
  DO_NOT_DISTURB = "Do not disturb",
}

export const BACKEND_URL = "http://localhost:4000";

export function getProfileImage(image: string | undefined) {
  if (!image) return imagePlaceholder;
  return `${BACKEND_URL}/images/${image}`;
}
