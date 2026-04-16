/**
 * Audio Pronunciation Module
 * Uses Web Speech API for German text-to-speech
 */

const AudioModule = (function() {
  let isSupported = false;
  let germanVoice = null;

  /**
   * Initialize audio module and load German voice
   */
  function init() {
    if ('speechSynthesis' in window) {
      isSupported = true;
      // Try to get a German voice
      const voices = speechSynthesis.getVoices();
      germanVoice = voices.find(voice => voice.lang.startsWith('de')) || null;
      
      // If voices aren't loaded yet, wait for them
      if (voices.length === 0) {
        speechSynthesis.onvoiceschanged = () => {
          const voices = speechSynthesis.getVoices();
          germanVoice = voices.find(voice => voice.lang.startsWith('de')) || null;
        };
      }
    }
    return isSupported;
  }

  /**
   * Speak a German word or phrase
   * @param {string} text - Text to speak
   * @param {number} rate - Speech rate (0.1-10, default 0.8 for German)
   * @param {number} pitch - Speech pitch (0-2, default 1)
   */
  function speak(text, rate = 0.8, pitch = 1) {
    if (!isSupported) {
      console.warn('Speech synthesis not supported');
      return false;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    speechSynthesis.speak(utterance);
    return true;
  }

  /**
   * Create a speak button element
   * @param {string} text - Text to speak when clicked
   * @param {string} label - Accessibility label
   * @returns {HTMLButtonElement}
   */
  function createSpeakButton(text, label = 'Listen to pronunciation') {
    const button = document.createElement('button');
    button.className = 'speak-btn';
    button.innerHTML = '🔊';
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      speak(text);
    });
    return button;
  }

  /**
   * Add speak buttons to all elements with class 'speak-text'
   */
  function autoAttachSpeakButtons() {
    document.querySelectorAll('.speak-text').forEach(el => {
      if (!el.querySelector('.speak-btn')) {
        const text = el.getAttribute('data-speak') || el.textContent.trim();
        const button = createSpeakButton(text);
        el.appendChild(button);
      }
    });
  }

  /**
   * Check if speech synthesis is supported
   * @returns {boolean}
   */
  function checkSupport() {
    return 'speechSynthesis' in window;
  }

  // Initialize on load
  init();

  return {
    init,
    speak,
    createSpeakButton,
    autoAttachSpeakButtons,
    checkSupport,
    isSupported: () => isSupported
  };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AudioModule;
}
