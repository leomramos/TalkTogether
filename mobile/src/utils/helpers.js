import moment from "moment";
import i18n from "../i18n";

export const formatMessageSentDate = (date, now = moment()) => {
  const sentDate = moment(date);
  return now.diff(sentDate, "seconds") <= 5
    ? i18n.t("justNow")
    : now.diff(sentDate, "seconds") <= 59
    ? i18n.t("secondsAgo", { time: now.diff(sentDate, "seconds") })
    : now.diff(sentDate, "minutes") <= 59
    ? i18n.t("minutesAgo", { time: now.diff(sentDate, "minutes") })
    : now.diff(sentDate, "hours") <= 23
    ? i18n.t("hoursAgo", { time: now.diff(sentDate, "hours") })
    : now.diff(sentDate, "days") <= 6
    ? i18n.t("daysAgo", { time: now.diff(sentDate, "days") })
    : now.diff(sentDate, "weeks") <= 8
    ? i18n.t("weeksAgo", { time: now.diff(sentDate, "weeks") })
    : sentDate.format("L");
};

export const formatMessageSentTime = date => {
  const sentDate = moment(date);
  return sentDate.format("hh:mm a");
};

export const formatCallDate = date => {
  const sentDate = moment(date);
  return sentDate.format("hh:mm a");
};

export const formatCallDuration = duration => {
  return Math.round(moment.duration(duration).asMinutes());
};
