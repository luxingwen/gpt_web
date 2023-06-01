export async function wxlogin() {
  if (window.WeixinJSBridge) {
    window.location.href = `https://chat.kimways.com/api/chat/wechat/oauth/code?redirect_url=${encodeURIComponent(
      window.location.href,
    )}`;
  } else {
    window.location.href = `https://chat.kimways.com/api/chat/wechat/web/oauth/code?redirect_url=${encodeURIComponent(
      window.location.href,
    )}`;
  }
}
