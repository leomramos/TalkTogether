import moment from "moment";
import i18n from "../i18n";

export const formatMessageSentDate = (date, now = moment()) => {
  if (!date) return;
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
    : sentDate.format("ll");
};

export const formatMessageSentTime = date => {
  const sentDate = moment(date);
  return sentDate.format("hh:mm a");
};

export const formatCallDate = date => {
  const sentDate = moment(date);

  return moment().isSame(sentDate, "day")
    ? sentDate.format(`[${i18n.t("today")}] LT`)
    : moment().subtract(1, "day").isSame(sentDate, "day")
    ? sentDate.format(`[${i18n.t("yesterday")}] LT`)
    : sentDate.format("lll");
};

export const formatCallDuration = duration => {
  const dur = moment.duration(duration),
    days = dur.days(),
    hours = dur.hours(),
    minutes = dur.minutes(),
    seconds = dur.seconds();
  return `${days > 0 ? i18n.t("daysDur", { duration: days }) + " " : ""}${
    hours > 0 ? i18n.t("hoursDur", { duration: hours }) + " " : ""
  }${
    !(days > 0) && minutes > 0
      ? i18n.t("minutesDur", { duration: minutes }) + " "
      : ""
  }${
    !(hours > 0) && seconds > 0
      ? i18n.t("secondsDur", { duration: seconds }) + " "
      : ""
  }`;
};

export const passwordStrengthCheck = password => {
  if (
    password.match(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{12,})/
    )
  )
    return "strong";

  if (
    password.match(
      /(?=.*[a-z])((?=.*[A-Z])|(?=.*[0-9]))(?=.*[^A-Za-z0-9])(?=.{6,})/
    )
  )
    return "moderate";

  return "weak";
};

export const getTimeDiff = (time, comparision = moment(), unit = "m") =>
  moment(comparision).diff(moment(time), unit);

export const groupBy = (arr, prop) => {
  const map = new Map(Array.from(arr, obj => [obj[prop], []]));
  arr.forEach(obj => map.get(obj[prop]).push(obj));
  return Array.from(map.values());
};
