import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ColorModeScript,ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme.js';

import PgDash from './views/PgDash.js';
import PgDesignEditor from './designer/PgDesignEditor.js';
import PgBehaviorEditor from './views/PgBehaviorEditor.js';
import PgCalcs from './views/PgCalcs.js';
const AppProvider = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './AppProvider.js')
);

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
    <ChakraProvider theme={theme} resetCss={false} w="100%">

    <Suspense fallback={<div className="loading"/>}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<AppProvider/>}>
            <Route path={'dash'} element={<PgDash/>}/>
            <Route path={'design-editor'} element={<PgDesignEditor/>}/>
            <Route path={'behavior-editor'} element={<PgBehaviorEditor/>}/>
            <Route path={'calcs'} element={<PgCalcs/>}/>
            <Route path={'*'} element={<PgDash/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
    </ChakraProvider>

  </>

  , document.getElementById("root")
);
