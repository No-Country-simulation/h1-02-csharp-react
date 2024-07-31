import logo from "../../assets/imgs/imagotype.webp";

export default function Logo() {
  return (
    <div className="logo-div w-52 p-4 flex items-center justify-center rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-custom ">
      <img src={logo} alt="logo-corazon-justina" />
    </div>
  );
}
