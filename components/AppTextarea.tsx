import { forwardRef } from 'react';

interface IAppTextarea {
    placeholder?: string;
    label?: string;
    name?: string;
    error?: boolean;
    value?: string;
    setValue?: (e: string) => void;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readonly?: boolean;
    secondary?: boolean;
}

const AppTextarea = forwardRef<HTMLTextAreaElement, IAppTextarea>(
    ({ label, placeholder, error, value, setValue, readonly, secondary, onChange, name, ...rest }, ref) => {
        return (
            <div className="relative w-full text-sm">
                {label && <div className="mb-3 font-normal text-[16px] text-[var(--title-color)]">{label}</div>}
                <textarea
                    ref={ref}
                    placeholder={placeholder}
                    value={value}
                    readOnly={readonly}
                    name={name}
                    rows={3}
                    className={`w-full text-[16px] text-[var(--black)] rounded-[12px] p-4 focus:outline-0
                                    ${secondary ? 'bg-[var(--white)] border-0' : 'border bg-transparent'} 
                                    ${error ? 'border border-red-300' : 'border border-[var(--light-gray-background)]'} 
                                `}
                    {...rest}
                    onChange={(e) => {
                        if (setValue) {
                            setValue(e.target.value)
                        }
                        if (onChange) {
                            onChange(e);
                        }
                    }}
                ></textarea>
            </div>
        );
    }
);

AppTextarea.displayName = 'AppTextarea';

export default AppTextarea;

