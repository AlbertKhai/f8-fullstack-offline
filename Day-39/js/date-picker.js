import { alertMess } from "./alert-mess.js";
moment.locale("vi");

export const calcDate = (time) => {
   const now = moment();
   const momentDate = moment(time[0]).set({
      hour: now.get("hour"),
      minute: now.get("minute"),
      second: now.get("second"),
   });

   if (momentDate.isSame(now, "day")) {
      alertMess("Thời gian hiện tại đã được chọn 😏.", "warning");
      return;
   }

   if (momentDate.isBefore(now)) {
      alertMess("AccessToken cuộc sống lúc đó hết hạn rùi. 🤨", "warning");
      return;
   }

   const formattedDate = momentDate.format("D/M/YYYY H [giờ] : mm [phút]");
   const duration = moment.duration(momentDate.diff(now));

   const centuries = Math.floor(duration.asYears() / 100);
   const decades = Math.floor((duration.asYears() % 100) / 10);
   const years = Math.floor(duration.asYears() % 10);
   const days = Math.floor(duration.asDays() % 365);
   const hours = duration.hours();
   const minutes = duration.minutes();
   const seconds = duration.seconds();

   let timeUnits = [
      { value: centuries, name: "thế kỷ" },
      { value: decades, name: "thập kỷ" },
      { value: years, name: "năm" },
      { value: days, name: "ngày" },
      { value: hours, name: "giờ" },
      { value: minutes, name: "phút" },
      { value: seconds, name: "giây" },
   ];

   let timeLeft = timeUnits
      .filter((unit) => unit.value > 0)
      .map((unit) => `${unit.value} ${unit.name}`)
      .join(" ");

   alertMess(`Bài viết của bạn sẽ được đăng vào ${formattedDate}<br />(Còn ${timeLeft})`);
};
