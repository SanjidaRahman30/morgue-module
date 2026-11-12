#!/usr/bin/env python3
"""
Standalone SPA HTTP Server for KYAMCH Morgue Module.
Serves static assets from the workspace directory and falls back to index.html
for client-side routes (/en/morgue/*, /morgue/*, /en/signin, etc.).
"""
import http.server
import os
import socket
import socketserver
import sys
import urllib.parse

PORT = int(os.environ.get("PORT", "1999"))
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))


class MorgueSPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT_DIR, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        clean_path = urllib.parse.unquote(parsed.path)

        # Redirect root "/" or "/en" directly to "/en/morgue"
        if clean_path in ("/", "/en", "/en/"):
            self.send_response(302)
            self.send_header("Location", "/en/morgue")
            self.end_headers()
            return

        # Check if the requested path corresponds to an existing file on disk
        rel_path = clean_path.lstrip("/").replace("/", os.sep)
        full_path = os.path.join(ROOT_DIR, rel_path)

        if os.path.isfile(full_path):
            return super().do_GET()

        # If requesting a static asset extension that doesn't exist, return 404
        _, ext = os.path.splitext(clean_path)
        if ext.lower() in (
            ".js", ".css", ".png", ".jpg", ".jpeg", ".gif", ".svg",
            ".ico", ".woff", ".woff2", ".ttf", ".map", ".json"
        ):
            self.send_error(404, f"Static asset not found: {clean_path}")
            return

        # Otherwise serve index.html for SPA routes (/en/morgue/*, /en/signin, etc.)
        self.path = "/index.html"
        return super().do_GET()

    def end_headers(self):
        # Disable caching so edits to JS chunks, index.html, and morgue-app.js reflect immediately
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, format, *args):
        sys.stdout.write("%s - - [%s] %s\n" % (
            self.address_string(),
            self.log_date_time_string(),
            format % args
        ))
        sys.stdout.flush()


class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


if __name__ == "__main__":
    os.chdir(ROOT_DIR)
    with ThreadingHTTPServer(("0.0.0.0", PORT), MorgueSPAHandler) as httpd:
        print("=" * 60)
        print("  KYAMCH Morgue Module Server is Running")
        print("=" * 60)
        print(f"  Local:   http://localhost:{PORT}/en/morgue")
        try:
            hostname = socket.gethostname()
            ips = socket.gethostbyname_ex(hostname)[2]
            for ip in ips:
                if not ip.startswith("127."):
                    print(f"  Network: http://{ip}:{PORT}/en/morgue")
        except Exception:
            pass
        print("=" * 60)
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")
