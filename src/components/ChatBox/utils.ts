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

export const toogleFullScreen = (isFullScreen, chartDom) => {
  if (!isFullScreen) {
    // 进入全屏状态
    if (chartDom.RequestFullScreen) {
      chartDom.RequestFullScreen();
      //兼容Firefox
    } else if (chartDom.mozRequestFullScreen) {
      chartDom.mozRequestFullScreen();
      //兼容Chrome, Safari and Opera等
    } else if (chartDom.webkitRequestFullScreen) {
      chartDom.webkitRequestFullScreen();
      //兼容IE/Edge
    } else if (chartDom.msRequestFullscreen) {
      chartDom.msRequestFullscreen();
    }
  } else {
    // 退出全屏状态
    if (document.exitFullScreen) {
      document.exitFullScreen();
      //兼容Firefox
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
      //兼容Chrome, Safari and Opera等
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      //兼容IE/Edge
    } else if (element.msExitFullscreen) {
      element.msExitFullscreen();
    }
  }
};
