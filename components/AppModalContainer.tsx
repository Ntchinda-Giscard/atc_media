
interface IAppModalContainer {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
}

export const AppModalContainer = ({
    title, isOpen, onClose, children, subtitle
}: IAppModalContainer) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-[var(--modal-fadded-background)] z-50 overflow-auto"
            onClick={onClose}
        >
            <div className="flex items-center justify-center min-h-full p-4 text-center ">
                <div className={`relative transform overflow-hidden rounded-2xl  bg-[var(--modal-background)] 
                    p-4 text-left align-middle shadow-xl transition-all opacity-100 scale-100 w-full md:w-3/4`} onClick={(e) => e.stopPropagation()}>
                    <div className='relative flex col-center'>
                        <h1 className='font-bold text-[24px] text-[var(--title-color)]'>
                            {title}
                            <span className="text-[var(--primary-color)]">{subtitle}</span>
                        </h1>

                        <button
                            className="absolute top-0 right-0 cursor-pointer text-[var(--primary-color)]"
                            onClick={onClose}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                        </button>
                    </div>
                    <div className="p-3 md:p-6 lg:p-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}