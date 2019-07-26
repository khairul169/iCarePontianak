import moment from "moment";
import "moment/locale/id";

export const getTimeString = time => {
  moment.locale("id");
  return moment(time).format("DD MMMM YYYY HH.mm");
};
