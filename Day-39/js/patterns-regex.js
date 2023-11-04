const patternsRegex = {
   stripHtml: (html) => html.replace(/<(?!br\s*\/?)[^>]+>/gi, ""),
   regexEmail: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
   patternsVideo: [/(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/watch\??v=([a-zA-Z0-9_-]{11})/g],
   patternImg: /(https?:\/\/[^?]+\.(jpg|jpeg|png|gif|bmp))/g,
   patternLink: /((http|https):\/\/[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi,
   patternPhone: /((0|\+?84)(3|5|7|8|9)[0-9]{8})/g,
   patternEmail: /([\w\.-]{3,}@[\w\.-]{1,}\.[a-z]{2,})/gi,
};

export default patternsRegex;
