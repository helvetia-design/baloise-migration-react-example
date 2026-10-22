import { readFileSync } from 'node:fs'

import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Mehrere Dateien im Design System laden Chunks mit `import(/* @vite-ignore *\/ './…')`
 * (u. a. bal-logo2, bal-spinner2, swipe.subject, floating-ui — Letzteres wird von
 * bal-popup für die Popover-Positionierung nachgeladen). Durch den Kommentar lässt
 * Vite den Import unangetastet, worauf er zur Laufzeit relativ zum Bundle aufgelöst
 * wird und ins Leere zeigt (404). Statt einzelne Dateinamen aufzuzählen — das hat
 * bereits einmal eine betroffene Datei übersehen — greift die Regel auf jede Datei
 * im Paket, die den Kommentar enthält.
 */
function bundleDesignSystemChunks(): Plugin {
  const affected = /@baloise[/\\]ds-core[/\\]components[/\\][^/\\]+\.js$/

  return {
    name: 'bundle-design-system-chunks',
    enforce: 'pre',
    transform(code, id) {
      if (!affected.test(id) || !code.includes('@vite-ignore')) {
        return null
      }
      return { code: code.replaceAll('/* @vite-ignore */', ''), map: null }
    },
  }
}

/**
 * `@baloise/ds-styles@19.11.0` liefert in `css/utilities/*.css` ein
 * `sourceMappingURL=utilities/<name>.css.map`, obwohl die Datei bereits in
 * `utilities/` liegt. Vite sucht die Map darum unter `utilities/utilities/` und
 * meldet bei jedem Start ENOENT. Der Kommentar wird hier entfernt.
 */
function stripBrokenStyleSourcemaps(): Plugin {
  const affected = /@baloise[/\\]ds-styles[/\\]css[/\\]utilities[/\\][a-z-]+\.css$/

  return {
    name: 'strip-broken-style-sourcemaps',
    enforce: 'pre',
    load(id) {
      const file = id.split('?')[0]
      if (!affected.test(file)) {
        return null
      }
      return readFileSync(file, 'utf8').replace(/\/\*# sourceMappingURL=[^*]*\*\//g, '')
    },
  }
}

export default defineConfig({
  plugins: [bundleDesignSystemChunks(), stripBrokenStyleSourcemaps(), react()],
  optimizeDeps: {
    exclude: ['@baloise/ds-core', '@baloise/ds-react'],
  },
})
