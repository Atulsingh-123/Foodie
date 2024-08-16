import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
    FC,
  } from 'react';
  import { FaRegCheckCircle } from 'react-icons/fa';
  import { FiX } from 'react-icons/fi';
  import { MdErrorOutline } from 'react-icons/md';
  
  interface ToastProps {
    id: number;
    message: string;
    subMessage: string;
    type: 'success' | 'error' | 'info' | 'warning';
    onClose: (id: number) => void;
  }
  
  const Toast: FC<ToastProps> = ({ id, message, subMessage, type, onClose }) => {
    const getBackgroundColor = () => {
      switch (type) {
        case 'success':
          return 'bg-[#f7fef9]';
        case 'error':
          return 'bg-red-50';
        case 'info':
          return 'bg-blue-500';
        case 'warning':
          return 'bg-yellow-500';
        default:
          return 'bg-gray-500';
      }
    };
  
    return (
      <div className={``}>
        {type === 'success' && (
          <>
            <div
              className={`mb-3 px-3 py-4.5 text-green-700 border border-[#6CE9A6] rounded-lg ${getBackgroundColor()}`}
            >
              <div className={`flex gap-3 `}>
                <FaRegCheckCircle className="text-green-600 size-5 " />
                <div className="me-26">
                  <p className="text-green-600 font-semibold">{message}</p>
                  <p className="text-green-600">{subMessage}</p>
                </div>
                <button onClick={() => onClose(id)} className="absolute right-4">
                  <FiX className="text-green-600 size-5" />
                </button>
              </div>
            </div>
          </>
        )}
        {type === 'error' && (
          <>
            <div
              className={`mb-3 px-4 py-6 text-red-700 border border-red-200 rounded-lg ${getBackgroundColor()}`}
            >
              <div className={`flex gap-3 w-125`}>
                <MdErrorOutline className="text-red-600 size-5 " />
                <div>
                  <p className="text-red-600 font-bold">{message}</p>
                  <p className="text-red-600">{subMessage}</p>
                </div>
                <button onClick={() => onClose(id)} className="absolute right-4">
                  <FiX className="text-red-600 size-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  interface ToastContextProps {
    showToast: (
      message: string,
      subMessage: string,
      type: 'success' | 'error' | 'info' | 'warning',
    ) => void;
  }
  
  const ToastContext = createContext<ToastContextProps | undefined>(undefined);
  
  export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) {
      throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
  };
  
  interface ToastProviderProps {
    children: ReactNode;
  }
  
  export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<
      Array<{ id: number; message: string; subMessage: string; type: string }>
    >([]);
    const [nextId, setNextId] = useState<number>(1);
  
    const showToast = useCallback(
      (
        message: string,
        subMessage: string,
        type: 'success' | 'error' | 'info' | 'warning',
      ) => {
        const id = nextId;
        setToasts((prevToasts) => [
          ...prevToasts,
          { id, message, subMessage, type },
        ]);
        setNextId((prevId) => prevId + 1);
        setTimeout(() => {
          setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id),
          );
        }, 5000);
      },
      [nextId],
    );
  
    const removeToast = useCallback((id: number) => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);
  
    return (
      <ToastContext.Provider value={{ showToast }}>
        {/* <div className='flex items-center'> */}
        {/* <FaRegCheckCircle /> */}
        {children}
        {/* </div> */}
  
        <div className="fixed top-10 right-5 z-999">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              subMessage={toast.subMessage}
              type={toast.type as 'success' | 'error' | 'info' | 'warning'}
              onClose={removeToast}
            />
          ))}
        </div>
      </ToastContext.Provider>
    );
  };
  