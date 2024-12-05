import icon from "@/assets/icon.png";

export const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-background/80 z-50">
      <div className="flex items-center gap-2 flex-col">
        <img
          src={icon}
          alt="Loading..."
          width={50}
          height={50}
          className=" animate-bounce"
        />
        <span>
          <p>Carregando...</p>
        </span>
      </div>
    </div>
  );
};
