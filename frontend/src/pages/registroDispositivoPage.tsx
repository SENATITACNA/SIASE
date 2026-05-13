import RegistroForm from "../components/RegistroForm";

const RegistroDispositivoPage = () => {
    return (
        <div className="page-wrapper">
            {/* Se eliminó el header y el buscador aquí */}
            <div className="content-area">
                <RegistroForm />
            </div>
        </div>
    );
};

export default RegistroDispositivoPage;