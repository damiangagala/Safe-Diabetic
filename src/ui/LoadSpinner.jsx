function LoadSpinner({ color, size, thickness }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        color: color,
        borderWidth: thickness,
      }}
      className="mx-auto animate-spin self-center rounded-full border-current border-t-transparent "
    ></div>
  );
}

export default LoadSpinner;
