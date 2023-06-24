import "./Modal.css";

export default function Modal({ isOpen, setIsOpen, children }) {
  return (
    <>
      {isOpen && (
        <div className="custom__modal">
          <div className="position-relative">{children}</div>
          <button className="close__btn" onClick={() => setIsOpen(false)}>
            x
          </button>
        </div>
      )}
    </>
  );
}
