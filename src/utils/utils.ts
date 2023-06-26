import dayjs from 'dayjs';

export const getFormatTime = (time) => {
  let t = time;
  if (!t) return '';
  if (typeof t == 'number' && t < 10000000000) {
    // 10位数的时间戳
    t = t * 1000;
  }
  return dayjs(t).format('YYYY-MM-DD HH:mm:ss');
};

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const formattedDateTime = `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return formattedDateTime;
}

export function getCurrentTimestampInSeconds(): number {
  const currentTimestamp = Math.floor(Date.now() / 1000); // 将当前时间戳转换为秒
  return currentTimestamp;
}

export function readFileAsync(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(new Blob([reader.result as ArrayBuffer]));
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
