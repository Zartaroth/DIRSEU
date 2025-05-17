import { useContext, createContext, useState } from "react";

// Crea el contexto con un valor inicial
const RegisterContext = createContext({
  userData: {},
  setUserData: () => {},
  setRole: () => {}, // Nueva función para manejar role
});

// Proveedor del contexto
export function RegisterProvider({ children }) {
  const [userData, setUserData] = useState({ role: "" }); // Incluye el role dentro del estado inicial

  // Función para actualizar el role directamente
  const setRole = (newRole) => {
    setUserData((prevData) => ({
      ...prevData,
      role: newRole, // Solo modifica el role
    }));
  };

  return (
    <RegisterContext.Provider
      value={{
        userData,
        setUserData,
        setRole, // Expón la función setRole
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

// Hook para usar el contexto
export const useRegister = () => {
  const context = useContext(RegisterContext);

  if (!context) throw new Error("useRegister must be used within a RegisterProvider");

  return context;
};
