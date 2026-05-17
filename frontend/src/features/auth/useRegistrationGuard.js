import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * useRegistrationGuard
 *
 * Attaches to pages that are "mid-registration" (e.g. OTP, ClearanceForm).
 * - On page reload: browser shows a native "Leave site?" confirmation.
 * - On browser back-button: shows a custom warning, then redirects to /register
 *   instead of letting the user go back to a stale/broken previous state.
 */
const useRegistrationGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ── 1. Reload guard (native browser dialog) ──────────────────────────────
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      // Modern browsers show their own message; this value is ignored visually
      // but the string is returned for legacy browser support.
      e.returnValue =
        '⚠️ Your registration progress will be lost. Are you sure you want to leave?';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // ── 2. Back-button guard (popstate) ───────────────────────────────────────
    // Push a dummy entry so the first "back" hit lands here and we can intercept it.
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      const confirmed = window.confirm(
        '⚠️ Going back will cancel your current registration.\n\n' +
        'All progress will be lost and you will need to restart.\n\n' +
        'Press OK to go back to the Registration page, or Cancel to stay.'
      );
      if (confirmed) {
        // Replace current history entry so they can't forward back to the mid-flow page
        navigate('/register', { replace: true });
      } else {
        // User chose to stay — re-push so the next back-press is caught again
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
};

export default useRegistrationGuard;
