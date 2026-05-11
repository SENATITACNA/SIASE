import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'

import LoginPage from '../pages/LoginPage'

import DashboardAlumnoPage from '../pages/DashboardAlumnoPage'
import DashboardVigilantePage from '../pages/DashboardVigilantePage'

import RegistroDispositivoPage from '../pages/RegistroDispositivoPage'
import HistorialPage from '../pages/HistorialPage'
import PerfilPage from '../pages/PerfilPage'
import ReportesPage from '../pages/ReportesPage'

import MainLayout from '../layouts/MainLayout'

const AppRoutes = () => {

    const role = localStorage.getItem('role')

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path='/login'
                    element={<LoginPage />}
                />

                <Route
                    path='/dashboard-alumno'
                    element={
                        role === 'alumno'
                            ? <MainLayout />
                            : <Navigate to='/login' />
                    }
                >

                    <Route
                        index
                        element={<DashboardAlumnoPage />}
                    />

                    <Route
                        path='registro'
                        element={<RegistroDispositivoPage />}
                    />

                    <Route
                        path='historial'
                        element={<HistorialPage />}
                    />

                    <Route
                        path='perfil'
                        element={<PerfilPage />}
                    />

                </Route>

                <Route
                    path='/dashboard-vigilante'
                    element={
                        role === 'vigilante'
                            ? <MainLayout />
                            : <Navigate to='/login' />
                    }
                >

                    <Route
                        index
                        element={<DashboardVigilantePage />}
                    />

                    <Route
                        path='reportes'
                        element={<ReportesPage />}
                    />

                    <Route
                        path='historial'
                        element={<HistorialPage />}
                    />

                    <Route
                        path='perfil'
                        element={<PerfilPage />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    )
}

export default AppRoutes