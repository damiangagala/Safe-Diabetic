import { createPortal } from "react-dom";
import { FaRegWindowClose } from "react-icons/fa";

function Modal({ open, onClose, children }) {
  if (!open) return null;

  return createPortal(
    <div className=" fixed inset-x-0 bottom-0 top-0 z-[100] bg-black/70">
      <div className=" modal fixed left-1/2 top-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] bg-red-300 p-3">
        <button
          className="absolute right-2 top-2"
          onClick={() => onClose(false)}
        >
          <FaRegWindowClose size={20} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
