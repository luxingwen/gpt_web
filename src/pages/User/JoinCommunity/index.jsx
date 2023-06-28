import GroupQrcode from '@/assets/images/group-qrcode.png';

const Index = () => {
  return (
    <div className="join-community-page">
      <p className="text-lg">人工客服+加入社区，</p>
      <p className="text-lg">使用微信扫一扫</p>
      <div className="mt-8 flex justify-start">
        <img className="w-64 h-64" src={GroupQrcode} alt="QR Code" />
      </div>
    </div>
  );
};

export default Index;
