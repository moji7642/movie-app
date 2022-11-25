import { baseUrlImage } from "../../api";

export function imgUrl(path, size) {
  return `${baseUrlImage}/${size}/${path}`;
}
