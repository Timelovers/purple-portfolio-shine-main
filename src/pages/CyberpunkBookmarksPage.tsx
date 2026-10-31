import bookmarksHtml from "@/assets/cyberpunk-bookmarks.html?raw";

/**
 * Renders the standalone bookmarks archive inside the SPA so that
 * `/cyberpunk-bookmarks.html` works even when static hosting only falls back to index.html.
 */
export default function CyberpunkBookmarksPage() {
  return (
    <iframe
      title="Cyberpunk bookmarks archive"
      className="fixed inset-0 z-[100] h-[100dvh] w-full border-0 bg-[#02020a]"
      srcDoc={bookmarksHtml}
      sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
    />
  );
}
