
import TelaCadUsuario from "./componentes/Telas/TelaCadUsuario.jsx";
import TelaCadCategoria from "./componentes/Telas/TelaCadCategoria.jsx";
import TelaCadCliente from "./componentes/Telas/TelaCadCliente.jsx";
import TelaCadFornecedor from "./componentes/Telas/TelaCadFornecedor.jsx";
import TelaCadProduto from "./componentes/Telas/TelaCadProduto.jsx";
import TelaCadEntregador from "./componentes/Telas/TelaCadEntregador.jsx";
import TelaMenu from "./componentes/Telas/TelaMenu.jsx";
import Tela404 from "./componentes/Telas/Tela404.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TelaLogin from "./componentes/Telas/TelaLogin.jsx";
import { useState, createContext } from "react";

//criei contexto
export const ContextoUsuario = createContext();


function App() {
  const [usuario, setUsuario] = useState({
    "usuario": "",
    "logado": false
  });
  if (!usuario.logado) {
    return (
      <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
        <TelaLogin />
      </ContextoUsuario.Provider>
    )
  } else {
    return (
      <div className="App">
        <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
          <BrowserRouter>
            {
              //A ordem das rotas é importante
            }
            <Routes>

              <Route path="/categoria" element={<TelaCadCategoria />} />
              <Route path="/cliente" element={<TelaCadCliente />} />
              <Route path="/Fornecedor" element={<TelaCadFornecedor />} />
              <Route path="/produto" element={<TelaCadProduto />} />
              <Route path="/usuario" element={<TelaCadUsuario />} />
              <Route path="/entregador" element={<TelaCadEntregador />} />

              <Route path="/" element={<TelaMenu />} />

              <Route path="/login" element={<TelaLogin />}></Route>
              <Route path="*" element={<Tela404 />} />
            </Routes>



          </BrowserRouter>
        </ContextoUsuario.Provider>

      </div>
    );
  }
}

export default App;
