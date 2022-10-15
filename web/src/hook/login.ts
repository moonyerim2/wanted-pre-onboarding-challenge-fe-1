import { getItem } from "../util";

export const useLoginState = () => getItem("token");
