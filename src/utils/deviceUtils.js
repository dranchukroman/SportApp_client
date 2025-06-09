export function getMobileOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        return 'Android';
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'iOS';
    }

    return 'unknown';
}

export function getBrowserName() {
  const userAgent = navigator.userAgent;

  if (/Chrome/.test(userAgent) && !/Edge|OPR/.test(userAgent)) return 'Chrome';
  if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) return 'Safari';
  if (/Firefox/.test(userAgent)) return 'Firefox';
  if (/OPR/.test(userAgent)) return 'Opera';
  if (/Edg/.test(userAgent)) return 'Edge';
  return 'unknown';
}