import {
    Square
  } from "lucide-react"

type DynamicIconProps ={
    size:number;
    text:string;
}

const DynamicTextIcon = ({size,text}:DynamicIconProps) => {
    return (
      <div className="relative inline-flex justify-center items-center">
        <Square 
            size={size}
            fill="none"
            color="currentColor"
            stroke="none"
        />
        <span 
          className={`absolute text-center`}
        >
          {text}
        </span>
      </div>
    );
};

export default DynamicTextIcon