import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRightFromBracket,
  faRightToBracket,
  faMagnifyingGlass,
  faPlus,
  faFilter,
  faPen,
  faTrash,
  faFloppyDisk,
  faChevronLeft,
  faCloudArrowUp,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faRightFromBracket,
  faRightToBracket,
  faMagnifyingGlass,
  faPlus,
  faFilter,
  faPen,
  faTrash,
  faFloppyDisk,
  faChevronLeft,
  faCloudArrowUp,
  faDownload
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
