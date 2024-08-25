import { createPortal } from "react-dom";
import { FaRegWindowClose } from "react-icons/fa";

function Modal({ open, onClose, children }) {
  if (!open) return null;

  return createPortal(
    <div className=" fixed inset-x-0 bottom-0 top-0 z-[100] bg-black/70">
      <div className="fixed left-1/2 top-1/2 z-[1000] h-[39rem] w-[20rem] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 p-7 text-zinc-50 md:h-[40rem] md:w-[30rem]">
        <button
          className="absolute right-4 top-4"
          onClick={() => onClose(false)}
        >
          <FaRegWindowClose size={25} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
