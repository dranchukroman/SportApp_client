import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const usePwaRedirect = () => {
    const navigate = useNavigate();
	useEffect(() => {
		const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
		const isStandaloneIOS = window.navigator.standalone === true;

        const mobileOS = () => {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            if (/android/i.test(userAgent)) {
                return 'Android';
            }
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                return 'iOS';
            }
            return 'unknown';
        }
        
        const browser = () => {
          const userAgent = navigator.userAgent;
          if (/Chrome/.test(userAgent) && !/Edge|OPR/.test(userAgent)) return 'Chrome';
          if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) return 'Safari';
          if (/Firefox/.test(userAgent)) return 'Firefox';
          if (/OPR/.test(userAgent)) return 'Opera';
          if (/Edg/.test(userAgent)) return 'Edge';
          return 'unknown';
        }

		const isMobile = mobileOS() === 'Android' || mobileOS() === 'iOS';

		if (isMobile && !(isStandalone || isStandaloneIOS)) {

			// Передамо info в query, щоб показати браузер в інструкції
			if (mobileOS()) {
				navigate(`/download?browser=${browser()}&mobileOS=${mobileOS}`, { replace: true });
			} else {
				// Для невідомих ОС, можливо, загальна сторінка
				navigate(`/download`, { replace: true });
			}
		}

	}, [navigate])
}