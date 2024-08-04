
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";

const Modal = ({ closeModal }) => {



  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-5 rounded flex flex-col justify-center items-center">
       
        <div className="w-80">
          <FormInput
            type="text"
            placeholder="Ingresar medicación"
            id="campomedicacion"
            
          />
          <Button text="Agregar"/>
        </div>

        
      </div>
    </div>
  );
};

export default Modal;
