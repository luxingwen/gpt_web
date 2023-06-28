import GroupQrcode from '@/assets/images/group-qrcode.png';

const Index = () => {
  return (
    <>
      <div>
        <p>使用微信扫一扫，加客服微信</p>
      </div>

      <div className="mt-8 flex justify-start">
        <img className="w-64 h-64" src={GroupQrcode} alt="QR Code" />
      </div>
    </>
  );
};

export default Index;
