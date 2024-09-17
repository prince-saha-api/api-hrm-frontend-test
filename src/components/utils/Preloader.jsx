const Preloader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999999999,
        backgroundColor: "#FFFAF4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={{
          width: "80px",
          height: "80px",
          filter: "invert(100%)",
          opacity: "0.4",
        }}
        src="/logo.png"
        alt=""
      />
    </div>
  );
};

export default Preloader;
