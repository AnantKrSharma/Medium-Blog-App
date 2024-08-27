import { ChangeEvent } from "react";

type LabelledInputProps = {
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
  
export function LabelledInput({label, placeholder, type, onChange} : LabelledInputProps){
    return (
      <div>
          <div className="mb-1">
            <label className="text-md font-semibold text-gray-900">{label}</label>
          </div>
        
          <input type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" placeholder={placeholder} required 
                 onChange={onChange} 
          />
      </div>
      )
}
