export default function ButtonSoft({ text, onClick }) {
  return (
    <>
      <button
        className="h-10 flex items-center border rounded-[32px]
         bg-[rgba(253,239,244,0.4)] shadow-transparent text-parrafo py-1 px-4  text-primary w-fit hover:bg-[#fdeff4] "
        onClick={onClick}
      >
        <p>{text}</p>
      </button>
      {/*"#fdeff4"*/}
    </>
  );
}
