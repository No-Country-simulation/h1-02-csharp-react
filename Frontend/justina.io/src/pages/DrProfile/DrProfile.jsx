
import Layout from "../../layouts/Layout";
import Button from "../../components/Button/Button"
import FormInputDisabled from "../../components/FormInputDisabled/FormInputDisabled";

const DrProfile = () => {
    return ( 
        <Layout>

            <div className="mt-4 p-4">
                <p className="text-primary text-titulopag text-start font-semibold py-3">Perfil</p>
                <div className="flex gap-6">
                    <div className="w-1/2 bg-[rgba(253,239,244,0.1)] rounded-3xl py-2 px-4 mb-4 shadow-custom">
                        <p className="text-neutrals800 text-subtitulo text-start font-semibold py-2">Datos Personales</p>
                        <FormInputDisabled name='Nombre Completo' type='text' id='name' value="Ana Maria Reyes" />
                        <FormInputDisabled name='DNI' type='text' value="23.263.234"/>
                        <FormInputDisabled name='Teléfono' type='tel' value="478 232632"/>
                        
                        <FormInputDisabled name='Email' type='text' value="amreyes@gmail.com" />
                    
                    </div>
                    <div className="w-1/2 bg-[rgba(253,239,244,0.1)] rounded-3xl py-2 px-4 mb-4 shadow-custom"> 
                        <p className="text-neutrals800 text-subtitulo text-start font-semibold">Perfil Profesional</p>
                        <FormInputDisabled name='Especialidad' type='text' value="Pediatría" />
                        <FormInputDisabled name='Matrícula Provincial' type='text' value="45545" />
                        <FormInputDisabled name='Matrícula Nacional' type='text'  value="34545"/>
                    </div>
                </div>
                

                <Button text="Guardar"/>
            </div>
        </Layout>
     );
}
 
export default DrProfile;