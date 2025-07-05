import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import theme from './styles/theme';
import { Toaster } from 'sonner';
import ModalPopUp from './components/ModalPopUp/ModalPopUp';
import AppProvider from './providers/AppProvider';
import AppRoutes from './routing/AppRoutes';
import { usePwaRedirect } from './hooks/usePwaRedirects'

function App() {
	usePwaRedirect()
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<AppProvider>
				<AppRoutes />
				<Toaster richColors position="bottom-center" />
				<ModalPopUp />
			</AppProvider>
		</ThemeProvider>
	);
}

export default App;