/* Standalone JCI learning collector. Loaded by the Heroku server on the homepage
   only. No redirects, content replacement, cookies, or persistent storage writes.
   The relay adds the installation key server-side; no credentials belong here. */
(function () {
  'use strict';
  const endpoint = new URL('jci-fingerprint', document.currentScript.src).href;
  const safe = (fn, fallback = null) => { try { return fn(); } catch { return fallback; } };
  const stable = value => {
    if (value === null || typeof value !== 'object') return JSON.stringify(value);
    if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
  };
  async function hash(value) {
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
    return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
  }
  async function component(value, identity = value) {
    return { value, hash: await hash(stable(identity)) };
  }
  function webgl() {
    const canvas = document.createElement('canvas');
    return canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  }
  const collectors = {
    async canvas() {
      const raw = safe(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 280; canvas.height = 80;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        ctx.textBaseline = 'top'; ctx.font = '16px Arial';
        ctx.fillStyle = '#f60'; ctx.fillRect(10, 10, 120, 30);
        ctx.fillStyle = '#069'; ctx.fillText('Fingerprint', 15, 20);
        ctx.fillStyle = 'rgba(102,204,0,.7)'; ctx.fillText('Tracking', 20, 40);
        return canvas.toDataURL();
      });
      return raw ? { hash: await hash(raw) } : null;
    },
    async webgl() {
      const data = safe(() => {
        const gl = webgl();
        if (!gl) return null;
        const debug = gl.getExtension('WEBGL_debug_renderer_info');
        return {
          vendor: debug ? gl.getParameter(debug.UNMASKED_VENDOR_WEBGL) : null,
          renderer: debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : null,
          version: gl.getParameter(gl.VERSION),
          shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
        };
      });
      return data ? component(data) : null;
    },
    async webgl_extensions() {
      return component(safe(() => (webgl()?.getSupportedExtensions() || []).sort(), []));
    },
    async screen() {
      const data = {
        width: screen.width, height: screen.height,
        availWidth: screen.availWidth, availHeight: screen.availHeight,
        colorDepth: screen.colorDepth, pixelDepth: screen.pixelDepth,
        devicePixelRatio: window.devicePixelRatio || 1,
        viewportWidth: window.innerWidth, viewportHeight: window.innerHeight,
      };
      return component(data, {
        width: data.width, height: data.height,
        colorDepth: data.colorDepth, pixelDepth: data.pixelDepth,
      });
    },
    async hardware() {
      return component({
        hardwareConcurrency: navigator.hardwareConcurrency || null,
        deviceMemory: navigator.deviceMemory || null,
        maxTouchPoints: navigator.maxTouchPoints || 0,
      });
    },
    async timezone() {
      return component({
        timezone: safe(() => Intl.DateTimeFormat().resolvedOptions().timeZone),
        offset: new Date().getTimezoneOffset(),
      });
    },
    async languages() {
      return component({
        language: navigator.language || null,
        languages: Array.isArray(navigator.languages) ? navigator.languages : [],
      });
    },
    async plugins() {
      return component({
        plugins: safe(() => Array.from(navigator.plugins || []).map(p => ({
          name: p.name || null, filename: p.filename || null, description: p.description || null,
        })), []),
        mimeTypes: safe(() => Array.from(navigator.mimeTypes || []).map(m => ({
          type: m.type || null, suffixes: m.suffixes || null,
        })), []),
      });
    },
    async audio() {
      const Offline = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      if (!Offline || !(window.AudioContext || window.webkitAudioContext)) return component({ supported: false });
      const context = new Offline(1, 44100, 44100);
      const oscillator = context.createOscillator();
      const compressor = context.createDynamicsCompressor();
      oscillator.type = 'triangle'; oscillator.frequency.value = 10000;
      compressor.threshold.value = -50; compressor.knee.value = 40;
      compressor.ratio.value = 12; compressor.attack.value = 0;
      compressor.release.value = 0.25;
      oscillator.connect(compressor); compressor.connect(context.destination);
      oscillator.start(0);
      let timer;
      try {
        const rendered = await Promise.race([
          context.startRendering(),
          new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Audio timeout.')), 2000); }),
        ]);
        const samples = rendered.getChannelData(0);
        let sum = 0;
        for (let i = Math.max(0, samples.length - 5000); i < samples.length; i++) sum += Math.abs(samples[i]);
        return component({
          supported: true, sampleRate: rendered.sampleRate,
          length: rendered.length, numberOfChannels: rendered.numberOfChannels,
          value: Number(sum.toFixed(8)),
        });
      } finally {
        clearTimeout(timer);
        oscillator.disconnect(); compressor.disconnect();
      }
    },
  };
  async function collect() {
    const fingerprint = {};
    for (const [name, collector] of Object.entries(collectors)) {
      try { fingerprint[name] = await collector(); } catch { fingerprint[name] = null; }
    }
    const automation = {
      webdriver: { detected: navigator.webdriver === true },
      browser_environment: {
        chrome: typeof window.chrome !== 'undefined',
        cookieEnabled: safe(() => navigator.cookieEnabled),
        localStorage: safe(() => typeof window.localStorage !== 'undefined', false),
        indexedDB: safe(() => typeof window.indexedDB !== 'undefined', false),
      },
      iframe: {
        isIframe: safe(() => window.self !== window.top, true),
        crossOrigin: safe(() => { void window.top.location.href; return false; }, true),
      },
      user_activation: navigator.userActivation ? {
        supported: true, isActive: navigator.userActivation.isActive,
        hasBeenActive: navigator.userActivation.hasBeenActive,
      } : { supported: false, isActive: null, hasBeenActive: null },
      environment_consistency: {
        viewportLargerThanScreen: safe(() => window.innerWidth > screen.width || window.innerHeight > screen.height, false),
        invalidHardwareConcurrency: navigator.hardwareConcurrency !== undefined &&
          (navigator.hardwareConcurrency < 1 || navigator.hardwareConcurrency > 1024),
      },
    };
    const components = {};
    for (const [name, item] of Object.entries(fingerprint)) if (item?.hash) components[name] = item.hash;
    for (const [name, item] of Object.entries(automation)) components[name] = await hash(stable(item));
    return {
      minimum_signals: 5, fingerprint_hash: await hash(stable(components)),
      components, fingerprint, automation, timestamp: Date.now(),
    };
  }
  async function start() {
    try {
      const data = await collect();
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'omit', cache: 'no-store', redirect: 'error',
        signal: AbortSignal.timeout(22000), body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('Collection not accepted.');
    } catch {
      console.debug('JCI learning collection did not complete.');
    }
  }
  // Deferred script: no dependency on collection to display or use the homepage.
  start();
})();
