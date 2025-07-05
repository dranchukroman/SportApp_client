import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';
import { pageTitles } from '../utils/pageTitles.js'; // Імпортуємо наш словник


export function usePageTitle() {
    const location = useLocation();
    const { user } = useAuth();
    const { pathname } = location;

    // --- РЕДАГУВАННЯ (Найбільш специфічні) ---
    // Перевіряємо, чи шлях містить /days/ і закінчується на /edit
    if (pathname.includes('/days/') && !pathname.includes('/exercises') && pathname.includes('/edit')) {
        return pageTitles.EditDay;
    }
    // Перевіряємо, чи шлях містить /plans/ і закінчується на /edit
    if (pathname.includes('/plans/') && !pathname.includes('/exercises') && pathname.endsWith('/edit')) {
        return pageTitles.EditPlan;
    }
    // І так далі для інших сутностей
    if (pathname.includes('/exercises/') && pathname.endsWith('/edit')) {
        return pageTitles.EditExercise;
    }
    
    // --- СТВОРЕННЯ НОВОГО ---
    if (pathname.endsWith('/days/new')) {
        return pageTitles.CreateDay;
    }
    if (pathname.endsWith('/plans/new')) {
        return pageTitles.CreatePlan;
    }
    if (pathname.endsWith('/exercises/new')) {
        return pageTitles.CreateExercise;
    }

    // --- СПИСКИ ТА ЗАГАЛЬНІ СТОРІНКИ (від більш конкретних до загальних) ---
    if (pathname.includes('/history')) return pageTitles.History;
    if (pathname.includes('/workout')) return pageTitles.Workout;
    // Спочатку перевіряємо на /exercises, бо цей шлях довший і специфічніший
    if (pathname.includes('/exercises')) return pageTitles.Exercises; 
    if (pathname.includes('/days')) return pageTitles.TrainingDays;
    if (pathname.includes('/plans')) return pageTitles.TrainingPlans;
    
    // --- Головні роути ---
    if (pathname === '/dashboard') {
        const userName = user?.first_name || 'Friend';
        return `${pageTitles.Dashboard}, ${userName}`;
    }
    if (pathname === '/diet') return pageTitles.Diet;
    if (pathname === '/calculator') return pageTitles.Calculator;
    
    // Якщо нічого не співпало
    return 'My App';
}