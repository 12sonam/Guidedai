import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

const Modal = ({ isOpen, onClose, title, children, actions = [] }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <CSSTransition
      in={isOpen}
      timeout={200}
      classNames="modal"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div
            className="fixed inset-0 bg-black opacity-75 modal-overlay"
            onClick={onClose}
            style={{ zIndex: 50 }}
          ></div>
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full modal-content relative z-60"
            style={{ zIndex: 60 }}
          >
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            </div>
            <div>{children}</div>
            <div className="px-6 py-4 border-t flex justify-end space-x-2">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${action.className} ${
                    action.disabled ? 'opacity-50 cursor-not-allowed' : 'btn-hover-scale'
                  } smooth-transition`}
                  disabled={action.disabled}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;